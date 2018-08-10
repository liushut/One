%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 25. 四月 2018 20:06
%%%-------------------------------------------------------------------
-module(global_rank).

-behaviour(gen_server).

-include("common.hrl").

%% API
-export([start_link/0]).

%% gen_server callbacks
-export([init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3]).

-define(SERVER, ?MODULE).

-record(state, {}).

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @end
%%--------------------------------------------------------------------
-spec(start_link() ->
    {ok, Pid :: pid()} | ignore | {error, Reason :: term()}).
start_link() ->
    gen_server:start_link({local, ?SERVER}, ?MODULE, [], []).

%%%===================================================================
%%% gen_server callbacks
%%%===================================================================

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Initializes the server
%%
%% @spec init(Args) -> {ok, State} |
%%                     {ok, State, Timeout} |
%%                     ignore |
%%                     {stop, Reason}
%% @end
%%--------------------------------------------------------------------
-spec(init(Args :: term()) ->
    {ok, State :: #state{}} | {ok, State :: #state{}, timeout() | hibernate} |
    {stop, Reason :: term()} | ignore).
init([]) ->
    ets:new(?ETS_GAME_RANK, [{keypos, #ets_game_rank.open_id}, named_table, public, set]),
    ets:new(?ETS_PLAYER_TOP_RANK, [{keypos, #ets_game_rank.open_id}, named_table, public, set]),
    ets:new(?ETS_RANK_SEGMENT, [{keypos, #ets_rank_segment.score}, named_table, public, ordered_set]),
    ets:new(?ETS_TOP_RANK_SCORE, [{keypos, #ets_top_rank_score.score}, named_table, public, ordered_set]),
    ets:new(?ETS_TOP_RANK, [{keypos, #ets_top_rank.rank}, named_table, public, ordered_set]),

    lib_rank:init_game_rank(),
    lib_rank:init_rank(),
    DayRestTime = ?ONE_DAY_SECONDS - util:today_seconds(),
    erlang:send_after(DayRestTime * 1000, self(), {daily_timer}),
    {ok, #state{}}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling call messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_call(Request :: term(), From :: {pid(), Tag :: term()},
    State :: #state{}) ->
    {reply, Reply :: term(), NewState :: #state{}} |
    {reply, Reply :: term(), NewState :: #state{}, timeout() | hibernate} |
    {noreply, NewState :: #state{}} |
    {noreply, NewState :: #state{}, timeout() | hibernate} |
    {stop, Reason :: term(), Reply :: term(), NewState :: #state{}} |
    {stop, Reason :: term(), NewState :: #state{}}).
handle_call(Request, From, State) ->
    try
        do_call(Request, From, State)
    catch
        Error : Reason ->
            ?WARNING_MSG("Error ~p Reason ~p ~p~n ~p",
                [Error, Reason, Request , erlang:get_stacktrace()]),
            {reply, ok, State}
    end.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling cast messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_cast(Request :: term(), State :: #state{}) ->
    {noreply, NewState :: #state{}} |
    {noreply, NewState :: #state{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #state{}}).
handle_cast(Request, State) ->
    try
        do_cast(Request, State)
    catch
        Error : Reason ->
            ?WARNING_MSG("Error ~p Reason ~p ~n ~p", [Error, Reason, erlang:get_stacktrace()]),
            {noreply, State}
    end.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling all non call/cast messages
%%
%% @spec handle_info(Info, State) -> {noreply, State} |
%%                                   {noreply, State, Timeout} |
%%                                   {stop, Reason, State}
%% @end
%%--------------------------------------------------------------------
-spec(handle_info(Info :: timeout() | term(), State :: #state{}) ->
    {noreply, NewState :: #state{}} |
    {noreply, NewState :: #state{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #state{}}).
handle_info(Info, State) ->
    try
        do_info(Info, State)
    catch
        Error : Reason ->
            ?WARNING_MSG("Error ~p ~p~p~n~p", [Error, Reason, Info, erlang:get_stacktrace()]),
            {noreply, State}
    end.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is called by a gen_server when it is about to
%% terminate. It should be the opposite of Module:init/1 and do any
%% necessary cleaning up. When it returns, the gen_server terminates
%% with Reason. The return value is ignored.
%%
%% @spec terminate(Reason, State) -> void()
%% @end
%%--------------------------------------------------------------------
-spec(terminate(Reason :: (normal | shutdown | {shutdown, term()} | term()),
    State :: #state{}) -> term()).
terminate(_Reason, _State) ->
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Convert process state when code is changed
%%
%% @spec code_change(OldVsn, State, Extra) -> {ok, NewState}
%% @end
%%--------------------------------------------------------------------
-spec(code_change(OldVsn :: term() | {down, term()}, State :: #state{},
    Extra :: term()) ->
    {ok, NewState :: #state{}} | {error, Reason :: term()}).
code_change(_OldVsn, State, _Extra) ->
    {ok, State}.

%%%===================================================================
%%% Internal functions
%%%===================================================================
do_call({update_player_score, Player}, _From, State) ->
    lib_rank:update_rank_player(Player),
    {reply, ok, State};

do_call(_Request, _From, State)  ->
    {reply, ok, State}.

do_cast({update_rank}, State) ->
    lib_rank:update_rank(),
    {noreply, State};

do_cast({update_player_score, Player}, State) ->
    lib_rank:update_rank_player(Player),
    {noreply, State};

do_cast(_Request, State) ->
    {noreply, State}.

do_info({save_rank}, State) ->
    lib_rank:save_rank(),
    {noreply, State};

do_info({daily_timer}, State) ->
    erlang:send_after(?ONE_DAY_SECONDS * 1000, self(), {daily_timer}),
    {Date, _} = util:localtime(),
    case calendar:day_of_the_week(Date) of
        1 ->
            Timer = erlang:send_after(10000, self(), {refresh_rank}),
            ?PRINT_MSG("Monday Daily Timer ~p", [Timer]);
        _ ->
            ok
    end,
    {noreply, State};

do_info({refresh_rank}, State) ->
    lib_rank:init_game_rank(),
    lib_rank:init_rank(),
    {noreply, State};

do_info({clear_week_rank}, State) ->
    {noreply, State};

do_info(_Info, State) ->
    {noreply, State}.