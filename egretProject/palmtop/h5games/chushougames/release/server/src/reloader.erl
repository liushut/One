%% @copyright 2007 Mochi Media, Inc.
%% @author Matthew Dempsky <matthew@mochimedia.com>
%%
%% @doc Erlang module for automatically reloading modified modules
%% during development.

-module(reloader).
-author("Matthew Dempsky <matthew@mochimedia.com>").

-include_lib("kernel/include/file.hrl").

-include("common.hrl").
-behaviour(gen_server).
-export([start/0, start_link/0]).
-export([stop/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2, code_change/3]).
-export([all_changed/0, hot_update/0]).
-export([is_changed/1]).
-export([reload_modules/1]).
-record(state, {last, tref}).

%% External API

hot_update() ->
    Pid = get_pid(),
    case gen_server:call(Pid, doit) of
    success ->
        success;
    Error ->
        Error
    end.
        
get_pid() ->
    case misc:whereis_name({local, ?MODULE}) of
    undefined ->
        case start(no_loop) of
        {ok, Pid} ->
            Pid;
        Error ->
            ?WARNING_MSG("Start Reloader Error=~p", [Error]),
            undefined
        end;
    Pid ->
        Pid
    end.


%% @spec start() -> ServerRet
%% @doc Start the reloader.
start() ->
    gen_server:start({local, ?MODULE}, ?MODULE, [], []).

start(no_loop) ->
    gen_server:start({local, ?MODULE}, ?MODULE, [no_loop], []).

%% @spec start_link() -> ServerRet
%% @doc Start the reloader.
start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

%% @spec stop() -> ok
%% @doc Stop the reloader.
stop() ->
    gen_server:call(?MODULE, stop).

%% gen_server callbacks

%% @spec init([]) -> {ok, State}
%% @doc gen_server init, opens the server in an initial state.
init(Args) ->
    case Args of
    [] ->
        {ok, TRef} = timer:send_interval(1000, doit),
        State = #state{last = stamp(), tref = TRef};
    _ ->
        State = #state{last = stamp(), tref = undefined}
    end,
    {ok, State}.

%% @spec handle_call(Args, From, State) -> tuple()
%% @doc gen_server callback.
handle_call(stop, _From, State) ->
    {stop, shutdown, stopped, State};
handle_call(state, _From, State) ->
    {reply, State, State};
handle_call(doit, _From, State) ->
    Now = stamp(),
    case doit(State#state.last, Now) of
    success ->
        {reply, success, State#state{last = Now}};
    ErrorList ->
        {reply, ErrorList, State}
    end;
handle_call(_Req, _From, State) ->
    {reply, {error, badrequest}, State}.

%% @spec handle_cast(Cast, State) -> tuple()
%% @doc gen_server callback.
handle_cast(_Req, State) ->
    {noreply, State}.

%% @spec handle_info(Info, State) -> tuple()
%% @doc gen_server callback.
handle_info(doit, State) ->
    Now = stamp(),
    case doit(State#state.last, Now) of
    success ->
        ok;
    ErrorList ->
        ?WARNING_MSG("Reload Module Error=~p", [ErrorList])
    end,
    {noreply, State#state{last = Now}};
handle_info(_Info, State) ->
    {noreply, State}.

%% @spec terminate(Reason, State) -> ok
%% @doc gen_server termination callback.
terminate(_Reason, State) ->
    case State#state.tref of
    undefined ->
        ok;
    _ ->
        {ok, cancel} = timer:cancel(State#state.tref)
    end,
    ok.


%% @spec code_change(_OldVsn, State, _Extra) -> State
%% @doc gen_server code_change callback (trivial).
code_change(_Vsn, State, _Extra) ->
    {ok, State}.

%% @spec reload_modules([atom()]) -> [{module, atom()} | {error, term()}]
%% @doc code:purge/1 and code:load_file/1 the given list of modules in order,
%%      return the results of code:load_file/1.
reload_modules(Modules) ->
    [begin code:purge(M), code:load_file(M) end || M <- Modules].

%% @spec all_changed() -> [atom()]
%% @doc Return a list of beam modules that have changed.
all_changed() ->
    [M || {M, Fn} <- code:all_loaded(), is_list(Fn), is_changed(M)].

%% @spec is_changed(atom()) -> boolean()
%% @doc true if the loaded module is a beam with a vsn attribute
%%      and does not match the on-disk beam file, returns false otherwise.
is_changed(M) ->
    try
        module_vsn(M:module_info()) =/= module_vsn(code:get_object_code(M))
        catch _:_ ->
            false
    end.

%% Internal API

module_vsn({M, Beam, _Fn}) ->
    {ok, {M, Vsn}} = beam_lib:version(Beam),
    Vsn;
module_vsn(L) when is_list(L) ->
    {_, Attrs} = lists:keyfind(attributes, 1, L),
    {_, Vsn} = lists:keyfind(vsn, 1, Attrs),
    Vsn.

doit(From, To) ->
    FileList = [{Module, Filename} || {Module, Filename} <- code:all_loaded(), is_list(Filename)],
    doit(FileList, From, To, []).

doit([], _From, _To, ErrorList) ->
    case ErrorList of
    [] ->
        success;
    _ ->
        ErrorList
    end;
doit([{Module, Filename} | Tail], From, To, ErrorList) ->
    case do_one({Module, Filename}, From, To) of
    error ->
        doit(Tail, From, To, [Module | ErrorList]);
    _ ->
        doit(Tail, From, To, ErrorList)
    end.

do_one({Module, Filename}, From, To) ->
    case file:read_file_info(Filename) of
        {ok, #file_info{mtime = Mtime}} when Mtime >= From, Mtime < To ->
            reload(Module);
        {ok, _} ->
            unmodified;
        {error, enoent} ->
            %% The Erlang compiler deletes existing .beam files if
            %% recompiling fails.  Maybe it's worth spitting out a
            %% warning here, but I'd want to limit it to just once.
            gone;
        {error, Reason} ->
            ?PRINT_MSG("Error reading ~s's file info: ~p~n",
                [Filename, Reason]),
            error
    end.

reload(Module) ->
    case code:soft_purge(Module) of
    true ->
        case code:load_file(Module) of
            {module, Module} ->
                ?PRINT_MSG("Reload ~p ok.~n", [Module]),
                reload;
            {error, Reason} ->
                ?ERROR_MSG("Reload ~p fail: ~p.~n", [Module, Reason]),
                error
        end;
    false ->
        ?ERROR_MSG("Reload ~p fail: Old Code~n", [Module]),
        error
    end.


stamp() ->
    erlang:localtime().

%%
%% Tests
%%
-ifdef(TEST).
-include_lib("eunit/include/eunit.hrl").
-endif.
