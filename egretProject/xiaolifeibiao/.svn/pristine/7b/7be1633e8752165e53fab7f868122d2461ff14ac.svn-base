%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 14. 三月 2018 16:37
%%%-------------------------------------------------------------------
-module(mod_room).

-behaviour(gen_server).

%% API
-export([start/1]).

%% gen_server callbacks
-export([init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3]).

-define(SERVER, ?MODULE).
-define(DIC_ROOM_PLAYER, dic_room_player).

-export([
    get_room_pid/1
]).

-include("common.hrl").

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @end
%%--------------------------------------------------------------------
-spec(start(RoomId :: any()) ->
    {ok, Pid :: pid()} | ignore | {error, Reason :: term()}).
start(RoomId) ->
    gen_server:start(RoomId, ?MODULE, [], []).

get_room_pid(RoomId) ->
    Pid =
        case ets:lookup(?ETS_ROOM, RoomId) of
            [Room | _] ->
                Room#ets_room.room_pid;
            _ ->
                []
        end,
    if
        is_pid(Pid) -> Pid;
        true ->
            case start(RoomId) of
                {ok, NewPid} -> NewPid;
                _ -> undefined
            end
    end.

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
    {ok, State :: #ets_room{}} | {ok, State :: #ets_room{}, timeout() | hibernate} |
    {stop, Reason :: term()} | ignore).
init(RoomId) ->
    MatchId = mod_id:get_room_matchid(RoomId),
    Room = #ets_room{
        id = RoomId,
        room_pid = self(),
        game_state = ?GAME_STATE_NOT_START,
        match_id = MatchId
    },
    ets:insert(?ETS_ROOM, Room),
    {ok, Room}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling call messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_call(Request :: term(), From :: {pid(), Tag :: term()},
    State :: #ets_room{}) ->
    {reply, Reply :: term(), NewState :: #ets_room{}} |
    {reply, Reply :: term(), NewState :: #ets_room{}, timeout() | hibernate} |
    {noreply, NewState :: #ets_room{}} |
    {noreply, NewState :: #ets_room{}, timeout() | hibernate} |
    {stop, Reason :: term(), Reply :: term(), NewState :: #ets_room{}} |
    {stop, Reason :: term(), NewState :: #ets_room{}}).
handle_call(_Request, _From, State) ->
    {reply, ok, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling cast messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_cast(Request :: term(), State :: #ets_room{}) ->
    {noreply, NewState :: #ets_room{}} |
    {noreply, NewState :: #ets_room{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #ets_room{}}).
handle_cast(Request, State) ->
    try
        do_cast(Request, State)
    catch
        Error : Reason ->
            ?ERROR_MSG("Do Cast Error ~pn~p", [Error, Reason]),
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
-spec(handle_info(Info :: timeout() | term(), State :: #ets_room{}) ->
    {noreply, NewState :: #ets_room{}} |
    {noreply, NewState :: #ets_room{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #ets_room{}}).
handle_info(_Info, State) ->
    {noreply, State}.

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
    State :: #ets_room{}) -> term()).
terminate(_Reason, State) ->
    ets:delete(?ETS_ROOM, State#ets_room.id),
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Convert process state when code is changed
%%
%% @spec code_change(OldVsn, State, Extra) -> {ok, NewState}
%% @end
%%--------------------------------------------------------------------
-spec(code_change(OldVsn :: term() | {down, term()}, State :: #ets_room{},
    Extra :: term()) ->
    {ok, NewState :: #ets_room{}} | {error, Reason :: term()}).
code_change(_OldVsn, State, _Extra) ->
    {ok, State}.

%%%===================================================================
%%% handle functions
%%%===================================================================


do_cast({player_enter_room, Player}, State) ->
    RoomPlayer = player_to_room_player(Player),
    update_room_player(RoomPlayer),
    {ok, Bin} = pt_10:write(10001, [0, State#ets_room.id, State#ets_room.match_id]),
    lib_send:send_to_player(Player, Bin),
    {noreply, State};

do_cast({player_ready, Player}, State) ->
    case get_room_player(Player#ets_player.id) of
        [] ->
            Result = 1;
        RoomPlayer ->
            if
                RoomPlayer#room_player.game_state < ?PLAYER_STATE_INGAME ->
                    NewRoomPlayer = RoomPlayer#room_player{
                        game_state = ?PLAYER_STATE_READY
                    },
                    Result = 0,
                    update_room_player(NewRoomPlayer);
                true ->
                    Result = 3
            end
    end,
    {ok, Bin} = pt_10:write(10002, Result),
    lib_send:send_to_player(Player, Bin),
    case check_room_player_ready() of
        true ->
            {ok, Bin} = pt_10:write(10003, 3),
            ok;
        _ ->
            ok
    end,
    {noreply, State};

do_cast({send_to_room, Bin}, State) ->
    send_to_room(Bin),
    {noreply, State};

do_cast(Info, State) ->
    ?WARNING_MSG("cast unknow message ~p~n~p", [Info, State]),
    {noreply, State}.

%%%===================================================================
%%% Internal functions
%%%===================================================================
send_to_room(Bin) ->
    List = get_room_player(),
    [lib_send:send_to_sid(RoomPlayer#room_player.socket_pid, Bin) || RoomPlayer <- List].

check_room_player_ready() ->
    List = get_room_player(),
    check_room_player_ready(List, 0).
    
check_room_player_ready([], Num) when Num > 1 ->
    true;
check_room_player_ready([], _Num) ->
    false;
check_room_player_ready([RoomPlayer | Tail], Num) ->
    if
        RoomPlayer#room_player.game_state >= ?PLAYER_STATE_READY ->
            check_room_player_ready(Tail, Num + 1);
        true ->
            false
    end.

player_to_room_player(Player) ->
    case get_room_player(Player#ets_player.id) of
        OldRoomPlayer when is_record(OldRoomPlayer, room_player) ->
            RoomPlayerState = OldRoomPlayer#room_player.game_state;
        _ ->
            RoomPlayerState = ?PLAYER_STATE_NOTREADY
    end,
    player_to_room_player(Player, RoomPlayerState).
player_to_room_player(Player, GameState) ->
    #ets_player{
        id = PlayerId,
        open_id = OpenId,
        nickname = Nickname,
        avatar_url = AvatarUrl,
        socket_pid = SocketPid,
        pid = PlayerPid
    } = Player,
    RoomPlayer = #room_player{
        player_id = PlayerId,
        open_id = OpenId,
        nickname = Nickname,
        avatar_url = AvatarUrl,
        player_pid = PlayerPid,
        socket_pid = SocketPid,
        game_state = GameState
    },
    RoomPlayer.


get_room_player() ->
    case get(?DIC_ROOM_PLAYER) of
        List when is_list(List) ->
            List;
        _ ->
            []
    end.

get_room_player(PlayerId) ->
    List = get_room_player(),
    case lists:keyfind(PlayerId, #room_player.player_id, List) of
        false ->
            [];
        Player ->
            Player
    end.

update_room_player(Player) ->
    List = get_room_player(),
    case lists:keytake(Player#room_player.player_id, #room_player.player_id, List) of
        {value, _OldPlayer, List2} ->
            NewList = [Player | List2],
            put(?DIC_ROOM_PLAYER, NewList);
        _ ->
            NewList = [Player | List],
            put(?DIC_ROOM_PLAYER, NewList)
    end.