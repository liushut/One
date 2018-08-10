%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 02. 四月 2018 15:08
%%%-------------------------------------------------------------------
-module(mod_ali_battle).

-behaviour(gen_server).

%% gen_server callbacks
-export([init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3]).

-export([
    start_battle/3,
    get_battle_pid/1
]).

-include("common.hrl").

-define(SERVER, ?MODULE).

%%%===================================================================
%%% API
%%%===================================================================
get_battle_pid(BattleId) ->
    case ets:lookup(?ETS_BATTLE_STATE, BattleId) of
        [Info | _] ->
            Info#ets_battle_state.battle_pid;
        _ ->
            undefined
    end.

start_battle(SocketPid, BattleId, PlayerList) ->
    OldPid = get_battle_pid(BattleId),
    if
        is_pid(OldPid) ->
            gen_server:cast(OldPid, {update_battle_player, SocketPid, PlayerList}),
            Pid = OldPid;
        true ->
            {ok, Pid} = start([SocketPid, BattleId, PlayerList])
    end,
    {ok, Pid}.

%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @end
%%--------------------------------------------------------------------
-spec(start(Any :: any()) ->
    {ok, Pid :: pid()} | ignore | {error, Reason :: term()}).
start([SocketPid, BattleId, PlayerList]) ->
    gen_server:start(?MODULE, [SocketPid, BattleId, PlayerList], []).

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
    {ok, State :: #ets_battle_state{}} | {ok, State :: #ets_battle_state{}, timeout() | hibernate} |
    {stop, Reason :: term()} | ignore).
init([SocketPid, BattleId, PlayerList]) ->
    process_flag(trap_exit, true),
    RoomId = mod_id:get_room_id(BattleId),
    State = #ets_battle_state{
        battle_id = BattleId,
        room_id = RoomId,
        socket_pid = SocketPid,
        battle_pid = self(),
        start_time = util:localtime()
    },
    ets:insert(?ETS_BATTLE_STATE, State),
    gen_server:cast(self(), {update_battle_player, SocketPid, PlayerList}),
    erlang:send_after(1800000, self(), {battle_timeout}),
    {ok, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling call messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_call(Request :: term(), From :: {pid(), Tag :: term()},
    State :: #ets_battle_state{}) ->
    {reply, Reply :: term(), NewState :: #ets_battle_state{}} |
    {reply, Reply :: term(), NewState :: #ets_battle_state{}, timeout() | hibernate} |
    {noreply, NewState :: #ets_battle_state{}} |
    {noreply, NewState :: #ets_battle_state{}, timeout() | hibernate} |
    {stop, Reason :: term(), Reply :: term(), NewState :: #ets_battle_state{}} |
    {stop, Reason :: term(), NewState :: #ets_battle_state{}}).
handle_call(_Request, _From, State) ->
    {reply, ok, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling cast messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_cast(Request :: term(), State :: #ets_battle_state{}) ->
    {noreply, NewState :: #ets_battle_state{}} |
    {noreply, NewState :: #ets_battle_state{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #ets_battle_state{}}).
handle_cast(Req, State) ->
    try
        do_cast(Req, State)
    catch
        Error : Reason ->
            ?WARNING_MSG("Error ~p~nReason ~p", [Error, Reason]),
            ?WARNING_MSG("~p", [erlang:get_stacktrace()]),
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
-spec(handle_info(Info :: timeout() | term(), State :: #ets_battle_state{}) ->
    {noreply, NewState :: #ets_battle_state{}} |
    {noreply, NewState :: #ets_battle_state{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #ets_battle_state{}}).
handle_info(Info, State) ->
    try
        do_info(Info, State)
    catch
        Error : Reason ->
            ?WARNING_MSG("Error ~p ~p", [Error, Reason]),
            ?WARNING_MSG("stack ~p", [erlang:get_stacktrace()]),
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
    State :: #ets_battle_state{}) -> term()).
terminate(_Reason, State) ->
    ets:delete(?ETS_BATTLE_STATE, State#ets_battle_state.battle_id),
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Convert process state when code is changed
%%
%% @spec code_change(OldVsn, State, Extra) -> {ok, NewState}
%% @end
%%--------------------------------------------------------------------
-spec(code_change(OldVsn :: term() | {down, term()}, State :: #ets_battle_state{},
    Extra :: term()) ->
    {ok, NewState :: #ets_battle_state{}} | {error, Reason :: term()}).
code_change(_OldVsn, State, _Extra) ->
    {ok, State}.

%%%===================================================================
%%% Internal functions
%%%===================================================================
do_cast({stop_battle}, State) ->

    {noreply, State};

do_cast({update_battle_player, SocketPid, PlayerList}, State) ->
    NewState = State#ets_battle_state{socket_pid = SocketPid},
    update_battle_player(PlayerList, NewState),
    ?PRINT_MSG("New Battle State ~p", [NewState]),
    ets:insert(?ETS_BATTLE_STATE, NewState),
    {noreply, NewState};

do_cast({battle_socket_event, Cmd, Data}, State) ->
    case battle_ali_handler:battle_handle(Cmd, State, Data) of
        {ok, NewState} when is_record(NewState, ets_battle_state) ->
            {noreply, NewState};
        _ ->
            {noreply, State}
    end;

do_cast({player_socket_event, OpenId, Cmd, HandleModule, Data}, State) ->
    case HandleModule:handle(Cmd, State, OpenId, Data) of
        {ok, NewState} when is_record(NewState, ets_battle_state) ->
            {noreply, NewState};
        _ ->
            {noreply, State}
    end.

do_info({check_player_afk}, State) ->
    lib_ali_battle:check_player_afk(State),
    {noreply, State};

do_info({battle_timeout}, State) ->
    lib_ali_battle:battle_timeout(State),
    {noreply, State};

do_info({close_battle}, State) ->
    ?PRINT_MSG("Close Battle ~p", [State]),
    {stop, normal, State};

do_info(_Info, State) ->
    {noreply, State}.

update_battle_player(PlayerList, State) ->
    BattlePlayerList = list_to_battle_player(PlayerList, State#ets_battle_state.battle_id, State#ets_battle_state.battle_pid),
    lib_ali_battle:update_battle_players(BattlePlayerList),
    State.


list_to_battle_player(List, BattleId, BattlePid) ->
    list_to_battle_player(List, [], BattleId, BattlePid).

list_to_battle_player([], List, _BattleId, _BattlePid) ->
    List;
list_to_battle_player([Info | Tail], List, BattleId, BattlePid) ->
    #{
        openId := OpenId,
        isRobot := IsRobot,
        groupId := GroupId,
        nickname := Nickname,
        avatarUrl := AvatarUrl,
        gender := Gender,
        battleTimes := BattleTimes
    } = Info,
    PlayerId = mod_id:get_player_id(OpenId),
    P = #ali_battle_player{
        player_id = PlayerId,
        battle_id = BattleId,
        battle_pid = BattlePid,
        open_id = OpenId,
        group_id = GroupId,
        nickname = Nickname,
        gender = Gender,
        avatar_url = AvatarUrl,
        is_robot = IsRobot,
        game_state = 0,
        score = 0,
        last_result_data = <<>>,
        battle_times = BattleTimes
    },
    list_to_battle_player(Tail, [P | List], BattleId, BattlePid).

