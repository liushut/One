%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 24. 四月 2018 10:02
%%%-------------------------------------------------------------------
-module(global_statistics).

-behaviour(gen_server).

%% API
-export([start_link/0]).
-include("common.hrl").
%% gen_server callbacks
-export([init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3]).

-export([
    get_statistics/0
]).

-define(SERVER, ?MODULE).
-define(STATISTICS_TIMER, 120000).

-record(state, {

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
    ets:new(?ETS_STATISTICS, [{keypos, #ets_log_statistics.date_time}, named_table, protected, set]),
    Statistics = db_statistics:get_statistics(),
    ets:insert(?ETS_STATISTICS, Statistics),
    erlang:send_after(?STATISTICS_TIMER, self(), {statistics_online}),
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
handle_call(_Request, _From, State) ->
    {reply, ok, State}.

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
handle_cast(_Request, State) ->
    {noreply, State}.

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
            ?WARNING_MSG("Error ~p Reason ~p ~n~p", [Error, Reason, erlang:get_stacktrace()]),
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
do_info({statistics_online}, State) ->
    erlang:send_after(?STATISTICS_TIMER, self(), {statistics_online}),
    do_statistics_online(),
    {noreply, State};

do_info({reset_statistics}, State) ->
    Date = util:today_start(),
    Statistics = get_statistics(Date),
    Online = get_online(),
    NewStatistics = Statistics#ets_log_statistics{
        dau = db_statistics:get_dau(Date),
        dnu = db_statistics:get_dnu(Date),
        ccu = Online,
        pcu = max(Online, Statistics#ets_log_statistics.pcu)
    },
    ets:insert(?ETS_STATISTICS, NewStatistics),
    db_statistics:update_statistics(NewStatistics),
    {noreply, State};

do_info(_Info, State) ->
    {noreply, State}.

do_statistics_online() ->
    Online = get_online(),
    DateStart = util:today_start(),
    NewStatistics =
        case ets:lookup(?ETS_STATISTICS, DateStart) of
            [Statistics] ->
                Statistics#ets_log_statistics{
                    pcu = max(Statistics#ets_log_statistics.pcu, Online),
                    ccu = Online
                };
            _ ->
                Statistics = db_statistics:get_statistics(DateStart),
                Statistics#ets_log_statistics{
                    pcu = max(Statistics#ets_log_statistics.pcu, Online),
                    ccu = Online
                }
        end,
    ets:insert(?ETS_STATISTICS, NewStatistics),
    db_statistics:update_statistics(NewStatistics),
    db_statistics:add_online_log(util:unixtime(), Online).

get_statistics() ->
    DateStart = util:today_start(),
    get_statistics(DateStart).

get_online() ->
    ets:info(?ETS_PLAYER, size).

get_statistics(DateStart) ->
    case catch ets:lookup(?ETS_STATISTICS, DateStart) of
        [Statistics] ->
            Statistics;
        _ ->
            db_statistics:get_statistics(DateStart)
    end.
