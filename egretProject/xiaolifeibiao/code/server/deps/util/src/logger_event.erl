%%%-------------------------------------------------------------------
%%% @author HeeJan
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 09. 四月 2018 15:20
%%%-------------------------------------------------------------------
-module(logger_event).

-behaviour(gen_event).

%% API
-export([
    start_link/0,
    add_handler/1,
    tty_log/0,
    file_log/0,
    reopen_file/0
]).

%% gen_event callbacks
-export([init/1,
    handle_event/2,
    handle_call/2,
    handle_info/2,
    terminate/2,
    code_change/3]).

-define(SERVER, ?MODULE).

-record(logger_state, {
    file_head,
    is_tty = false,
    print_fd,
    debug_fd,
    warning_fd,
    error_fd
}).

%%%===================================================================
%%% gen_event callbacks
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Creates an event manager
%%
%% @end
%%--------------------------------------------------------------------
-spec(start_link() -> {ok, pid()} | {error, {already_started, pid()}}).
start_link() ->
    gen_event:start_link({local, ?SERVER}).

%%--------------------------------------------------------------------
%% @doc
%% Adds an event handler
%%
%% @end
%%--------------------------------------------------------------------
-spec(add_handler(FileHead :: any()) -> ok | {'EXIT', Reason :: term()} | term()).
add_handler(FileHead) ->
    gen_event:add_handler(?SERVER, ?MODULE, [FileHead]).

tty_log() ->
    gen_event:notify(?SERVER, {change_log_type, tty}).

file_log() ->
    gen_event:notify(?SERVER, {change_log_type, file}).

reopen_file() ->
    gen_event:notify(?SERVER, {reopen_file}).

%%%===================================================================
%%% gen_event callbacks
%%%===================================================================

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever a new event handler is added to an event manager,
%% this function is called to initialize the event handler.
%%
%% @end
%%--------------------------------------------------------------------
-spec(init(InitArgs :: term()) ->
    {ok, State :: #logger_state{}} |
    {ok, State :: #logger_state{}, hibernate} |
    {error, Reason :: term()}).
init([FileHead]) ->
    process_flag(trap_exit, true),
    case os:type() of
        {win32, _} ->
            IsTty = true;
        _ ->
            IsTty = false
    end,
    State = open_log_files(#logger_state{file_head = FileHead, is_tty = IsTty}),
    {ok, State}.

to_str(Num) when Num >= 10 ->
    integer_to_list(Num);
to_str(Num) ->
    lists:concat(["0",Num]).

open_log_files(OldState) ->
    #logger_state{
        file_head = FileHead,
        print_fd = PrintFd,
        debug_fd = DebugFd,
        warning_fd = WarningFd,
        is_tty = IsTty,
        error_fd = ErrorFd
    } = OldState,
    {{Year,Month,Day},{Hour,Min,Second}} = util:localtime(),
    LogHead = lists:concat([FileHead , "_", Year, to_str(Month), to_str(Day), "_",to_str(Hour), to_str(Min), to_str(Second)]),
    close_files([PrintFd, DebugFd, WarningFd, ErrorFd]),
    #logger_state{
        file_head = FileHead,
        print_fd = get_log_file_device(print, LogHead),
        debug_fd = get_log_file_device(debug, LogHead),
        warning_fd = get_log_file_device(warning, LogHead),
        error_fd = get_log_file_device(error, LogHead),
        is_tty = IsTty
    }.

close_files([]) ->
    ok;
close_files([undefined | Tail]) ->
    close_files(Tail);
close_files([Fd | Tail]) ->
    file:close(Fd),
    close_files(Tail).

get_log_file_device(Type, Head) ->
    FileName = lists:concat([Head, "_", Type,".log"]),
    case file:open(FileName, [write]) of
        {ok, Fd} ->
            Fd;
        _ ->
            undefined
    end.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever an event manager receives an event sent using
%% gen_event:notify/2 or gen_event:sync_notify/2, this function is
%% called for each installed event handler to handle the event.
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_event(Event :: term(), State :: #logger_state{}) ->
    {ok, NewState :: #logger_state{}} |
    {ok, NewState :: #logger_state{}, hibernate} |
    {swap_handler, Args1 :: term(), NewState :: #logger_state{},
        Handler2 :: (atom() | {atom(), Id :: term()}), Args2 :: term()} |
    remove_handler).
handle_event({log, Type, Pid, Format, Args}, State) ->
    write_event(Type, Pid, Format, Args, State),
    {ok, State};
handle_event({change_log_type, LogType}, State) ->
    case LogType of
        tty ->
            NewState = State#logger_state{
                is_tty = true
            };
        _ ->
            NewState = State#logger_state{
                is_tty = false
            }
    end,
    {ok, NewState};
handle_event({reopen_file}, State) ->
    NewState = open_log_files(State),
    {ok, NewState};
handle_event(_Event, State) ->
    {ok, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever an event manager receives a request sent using
%% gen_event:call/3,4, this function is called for the specified
%% event handler to handle the request.
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_call(Request :: term(), State :: #logger_state{}) ->
    {ok, Reply :: term(), NewState :: #logger_state{}} |
    {ok, Reply :: term(), NewState :: #logger_state{}, hibernate} |
    {swap_handler, Reply :: term(), Args1 :: term(), NewState :: #logger_state{},
        Handler2 :: (atom() | {atom(), Id :: term()}), Args2 :: term()} |
    {remove_handler, Reply :: term()}).
handle_call(_Request, State) ->
    Reply = ok,
    {ok, Reply, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is called for each installed event handler when
%% an event manager receives any other message than an event or a
%% synchronous request (or a system message).
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_info(Info :: term(), State :: #logger_state{}) ->
    {ok, NewState :: #logger_state{}} |
    {ok, NewState :: #logger_state{}, hibernate} |
    {swap_handler, Args1 :: term(), NewState :: #logger_state{},
        Handler2 :: (atom() | {atom(), Id :: term()}), Args2 :: term()} |
    remove_handler).
handle_info(_Info, State) ->
    {ok, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever an event handler is deleted from an event manager, this
%% function is called. It should be the opposite of Module:init/1 and
%% do any necessary cleaning up.
%%
%% @spec terminate(Reason, State) -> void()
%% @end
%%--------------------------------------------------------------------
-spec(terminate(Args :: (term() | {stop, Reason :: term()} | stop |
remove_handler | {error, {'EXIT', Reason :: term()}} |
{error, term()}), State :: term()) -> term()).
terminate(_Arg, _State) ->
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Convert process state when code is changed
%%
%% @end
%%--------------------------------------------------------------------
-spec(code_change(OldVsn :: term() | {down, term()}, State :: #logger_state{},
    Extra :: term()) ->
    {ok, NewState :: #logger_state{}}).
code_change(_OldVsn, State, _Extra) ->
    {ok, State}.

%%%===================================================================
%%% Internal functions
%%%===================================================================
write_event(Type, Pid, Format, Args, State) ->
    case parse_log_event({Type, Pid, Format, Args}) of
        {Head,Pid,FormatList} ->
            Time = util:localtime(),
            Header = write_time(Time, Head),
            Body = format_body(State, FormatList),
            if
                State#logger_state.is_tty ->
                    io:format("~s", [Header ++ Body]);
                true ->
                    Fd = get_fd(Type, State),
                    io:put_chars(Fd, [Header,Body])
            end;
        _ ->
            ok
    end.

write_time({{Y,Mo,D},{H,Mi,S}}, Type) ->
    io_lib:format("~n=~s==== ~p-~p-~p::~p:~p:~p ===~n",
        [Type,Y,Mo,D,H,Mi,S]).

format_body(State, [{Format,Args}|T]) ->
    S = try format(State, Format, Args) of
            S0 ->
                S0
        catch
            _:_ ->
                format(State, "ERROR: ~p - ~p\n", [Format,Args])
        end,
    [S|format_body(State, T)];
format_body(_State, []) ->
    [].

format(_, Format, Args) ->
    io_lib:format(Format, Args).

get_fd(error, State) ->
    State#logger_state.error_fd;
get_fd(warning, State) ->
    State#logger_state.warning_fd;
get_fd(debug, State) ->
    State#logger_state.debug_fd;
get_fd(_, State) ->
    State#logger_state.print_fd.

parse_log_event({error, Pid, Format, Args}) ->
    {"**ERROR REPORT",Pid,[{Format,Args}]};
parse_log_event({warning, Pid, Format, Args}) ->
    {"*WARNING REPORT",Pid,[{Format,Args}]};
parse_log_event({debug, Pid, Format, Args}) ->
    {"DEBUG REPORT",Pid,[{Format,Args}]};
parse_log_event({print, Pid, Format, Args}) ->
    {"PRINT REPORT",Pid,[{Format,Args}]};
parse_log_event(_) ->
    skip.