%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 13. 三月 2018 10:49
%%%-------------------------------------------------------------------
-module(mod_timer).

-behaviour(gen_server).

%% API
-export([
    start_link/0
]).

%% gen_server callbacks
-export([init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3]).

-define(SERVER, ?MODULE).
-define(CLOCK, 100).
-define(CLOCK_FOR_DAILY, 1000).

-record(state, {
    diff = 0
}).

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
    ets:new(ets_timer, [set, protected, named_table]),
    State = #state{},
    NowSecs = erlang:timestamp(),
    NowUniversalTime = calendar:now_to_universal_time(NowSecs),
    NowLocalTime = calendar:universal_time_to_local_time(NowUniversalTime),
    ets:insert(ets_timer, {timer, {NowSecs, 0, NowUniversalTime, NowLocalTime}}),
    erlang:send_after(?CLOCK, self(), {event, clock}),

    event_clock(State),

    erlang:send_after(?CLOCK_FOR_DAILY, self(), {event, clock_for_daily}),

    misc:write_monitor_pid(self(),?MODULE, {}),
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
        _ : _ ->
            {reply, error, State}
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
        _ : _ ->
            {reply, error, State}
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
        _ : _ ->
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
    misc:delete_monitor_pid(self()),
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
-spec(do_call(Request :: term(), From :: {pid(), Tag :: term()},
    State :: #state{}) ->
    {reply, Reply :: term(), NewState :: #state{}} |
    {reply, Reply :: term(), NewState :: #state{}, timeout() | hibernate} |
    {noreply, NewState :: #state{}} |
    {noreply, NewState :: #state{}, timeout() | hibernate} |
    {stop, Reason :: term(), Reply :: term(), NewState :: #state{}} |
    {stop, Reason :: term(), NewState :: #state{}}).
do_call(_Request, _From, State) ->
    {reply, ok, State}.


-spec(do_cast(Request :: term(), State :: #state{}) ->
    {noreply, NewState :: #state{}} |
    {noreply, NewState :: #state{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #state{}}).
do_cast(_Request, State) ->
    {noreply, State}.


-spec(do_info(Info :: timeout() | term(), State :: #state{}) ->
    {noreply, NewState :: #state{}} |
    {noreply, NewState :: #state{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #state{}}).
do_info({event, clock}, State) ->
    {noreply, event_clock(State)};
do_info({event, clock_for_daily}, State) ->
    erlang:send_after(?CLOCK_FOR_DAILY, self(), {event, clock_for_daily}),
    set_today_start(),
    {noreply, State};

do_info({event, set_diff, Diff}, State) ->
    {_Total_Run_Time, Time_Since_Last_Call} = statistics(runtime),
    NowSecs = calc_diff(erlang:timestamp(), Diff),
    NowUniversalTime = calendar:now_to_universal_time(NowSecs),
    NowLocalTime = calendar:universal_time_to_local_time(NowUniversalTime),

    {MegaSecs, Secs, _MicroSecs} = NowSecs,
    NowSeconds = MegaSecs * 1000000 + Secs,

    ets:insert(ets_timer, {now_seconds, NowSeconds}),
    ets:insert(ets_timer, {timer, {NowSecs, Time_Since_Last_Call, NowUniversalTime, NowLocalTime}}),
    set_today_start(),
    {noreply, State#state{diff = Diff}};

do_info({event, clear_diff}, State) ->
    {_Total_Run_Time, Time_Since_Last_Call} = statistics(runtime),
    NowSecs = calc_diff(erlang:timestamp(), 0),
    NowUniversalTime = calendar:now_to_universal_time(NowSecs),
    NowLocalTime = calendar:universal_time_to_local_time(NowUniversalTime),

    {MegaSecs, Secs, _MicroSecs} = NowSecs,
    NowSeconds = MegaSecs * 1000000 + Secs,

    ets:insert(ets_timer, {now_seconds, NowSeconds}),
    ets:insert(ets_timer, {timer, {NowSecs, Time_Since_Last_Call, NowUniversalTime, NowLocalTime}}),
    set_today_start(),
    {noreply, State#state{diff = 0}};

do_info(_Info, State) ->
    {noreply, State}.

set_today_start() ->
    Now = util:unixtime(),
    {_, Time} = util:seconds_to_localtime(Now),
    Seconds = calendar:time_to_seconds(Time),
    TodayStart = Now - Seconds,
    ets:insert(ets_timer, {today_start, TodayStart}).

calc_diff(Now, 0) -> Now;
calc_diff(Now, Diff) ->
    {MacroSecs, Secs, MicroSecs} = Now,
    NewSecs = MacroSecs * 1000000 + Secs + Diff,
    {NewSecs div 1000000, NewSecs rem 1000000, MicroSecs}.

event_clock(State) ->
    #state{diff = Diff} = State,
    {_Total_Run_Time, Time_Since_Last_Call} = statistics(runtime),
    NowSecs = calc_diff(erlang:timestamp(), Diff),
    NowUniversalTime = calendar:now_to_universal_time(NowSecs),
    NowLocalTime = calendar:universal_time_to_local_time(NowUniversalTime),

    {MegaSecs, Secs, _MicroSecs} = NowSecs,
    NowSeconds = MegaSecs * 1000000 + Secs,

    ets:insert(ets_timer, {now_seconds, NowSeconds}),
    ets:insert(ets_timer, {timer, {NowSecs, Time_Since_Last_Call, NowUniversalTime, NowLocalTime}}),
    ets:insert(ets_timer, {local_time, util:seconds_to_localtime(NowSeconds)}),
    erlang:send_after(?CLOCK, self(), {event, clock}),
    State.