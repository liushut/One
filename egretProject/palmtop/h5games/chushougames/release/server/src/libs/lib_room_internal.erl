%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 26. 三月 2018 15:49
%%%-------------------------------------------------------------------
-module(lib_room_internal).

-include("common.hrl").
%% API
-export([
    get_room_player/0,
    get_room_player/1,
    update_room_player/1,
    send_to_room/1,
    room_finish/3,
    player_quit/3,
    player_to_room_player/1,
    reopen_game/2,
    check_room_player_ready/0,
    begin_set_player_state/0,
    check_other_action/1
]).

-define(DIC_ROOM_PLAYER, dic_room_player).

reopen_game(_Status, Player) ->
    case get_other_players(Player#ets_player.player_id) of
        [OtherPlayer | _] ->
            {ok, Bin} = pt_11:write(11007, 0),
            lib_send:send_to_player(Player, Bin),
            if
                OtherPlayer#room_player.game_state == ?PLAYER_STATE_QUIT ->
                    {ok, Bin2} = pt_11:write(11007, 2),
                    lib_send:send_to_player(Player, Bin2);
                OtherPlayer#room_player.game_state == ?PLAYER_STATE_READY ->
                    RoomPlayer = player_to_room_player(Player),
                    update_room_player(RoomPlayer#room_player{
                        game_state = ?PLAYER_STATE_READY
                    }),
                    case check_room_player_ready() of
                        true ->
                            begin_set_player_state();
                        _ ->
                            ok
                    end;
                true ->
                    RoomPlayer = player_to_room_player(Player),
                    update_room_player(RoomPlayer#room_player{
                        game_state = ?PLAYER_STATE_READY
                    }),
                    erase(room_win_player_id),
                    reset_game_start(),
                    {ok, Bin2} = pt_11:write(11009, Player#ets_player.player_id),
                    lib_send:send_to_sid(OtherPlayer#room_player.socket_pid, Bin2)
            end;
        _ ->
            {ok, Bin} = pt_11:write(11007, 2),
            lib_send:send_to_player(Player, Bin)
    end.

begin_set_player_state() ->
    List = get_room_player(),
    NewList = [One#room_player{game_state = ?PLAYER_STATE_INGAME} || One <- List],
    update_all_room_player(NewList),
    Seeds = [util:rand(1000)],
    {ok, Bin} = pt_11:write(11003, [3, lib_room_internal:get_room_player(), Seeds]),
    erase(is_set_room_finish),
    set_game_start(),
    lib_room_internal:send_to_room(Bin).

check_is_game_start() ->
    get(is_game_start) == true.

set_game_start() ->
    StartTime = util:unixtime(),
    PlayerList = get_room_player(),
    [update_last_action_time(One#room_player.player_id, StartTime) || One <- PlayerList],
    put(game_start_time, StartTime),
    put(is_game_start, true).

reset_game_start() ->
    erase(game_start_time),
    put(is_game_start, false).

get_game_start_time(NowTime) ->
    case get(game_start_time) of
        StartTime when is_integer(StartTime) ->
            NowTime - StartTime;
        _ ->
            0
    end.

player_to_room_player(Player) ->
    case lib_room_internal:get_room_player(Player#ets_player.player_id) of
        OldRoomPlayer when is_record(OldRoomPlayer, room_player) ->
            RoomPlayerState = OldRoomPlayer#room_player.game_state;
        _ ->
            RoomPlayerState = ?PLAYER_STATE_NOTREADY
    end,
    #ets_player{
        player_id = PlayerId,
        open_id = OpenId,
        nickname = Nickname,
        gender = Gender,
        play_count = PlayCount,
        avatar_url = AvatarUrl,
        other = #player_other{
            socket_pid = SocketPid,
            pid = PlayerPid
        }
    } = Player,
    #room_player{
        player_id = PlayerId,
        open_id = OpenId,
        nickname = Nickname,
        gender = Gender,
        play_count = PlayCount,
        avatar_url = AvatarUrl,
        player_pid = PlayerPid,
        socket_pid = SocketPid,
        game_state = RoomPlayerState
    }.


get_room_player() ->
    case get(?DIC_ROOM_PLAYER) of
        List when is_list(List) ->
            List;
        _ ->
            []
    end.

get_other_players(PlayerId) ->
    List = get_room_player(),
    [Player || Player <- List, Player#room_player.player_id =/= PlayerId].

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
            update_all_room_player(NewList);
        _ ->
            NewList = [Player | List],
            update_all_room_player(NewList)
    end.

update_all_room_player(List) ->
    put(?DIC_ROOM_PLAYER, List).

update_room_player_state(PlayerId, GameState) ->
    RoomPlayer = get_room_player(PlayerId),
    update_room_player(RoomPlayer#room_player{game_state = GameState}).

send_to_room(Bin) ->
    List = get_room_player(),
    [lib_send:send_to_sid(RoomPlayer#room_player.socket_pid, Bin) || RoomPlayer <- List].

player_quit(Status, Player, _Data) ->
    #ets_player{
        player_id = PlayerId
    } = Player,
    update_room_player_state(PlayerId, ?PLAYER_STATE_QUIT),
    {ok, Bin} = pt_11:write(11007, 2),
    %%send_to_room(Bin),
    case get_win_player() of
        [] ->
            check_room_and_end(),
            case get_other_players(PlayerId) of
                [WinPlayer | _] ->
                    WinPlayerId = WinPlayer#room_player.player_id,
                    NewStatus = room_finish(Status, Player, WinPlayerId, true),
                    send_to_room(Bin),
                    NewStatus;
                _ ->
                    NewStatus = room_finish(Status, Player, 0, true),
                    send_to_room(Bin),
                    NewStatus
            end;
        _Win ->
            check_room_and_end(),
            send_to_room(Bin),
            Status
    end.

get_win_player() ->
    case get(room_win_player_id) of
        undefined ->
            [];
        WinPlayerId ->
            WinPlayerId
    end.

set_win_player(WinPlayerId) ->
    OldWinPlayer = get(room_win_player_id),
    WinPlayer = get_room_player(WinPlayerId),
    if
        WinPlayerId =/= 0 andalso WinPlayer == [] ->
            false;
        OldWinPlayer =/= undefined ->
            {true, WinPlayerId};
        true ->
            put(room_win_player_id, OldWinPlayer),
            {true, OldWinPlayer}
    end.
%%    case get_room_player(WinPlayerId) of
%%        [] ->
%%            false;
%%        _ ->
%%            OldWinPlayer = get(room_win_player_id),
%%            if
%%                OldWinPlayer == WinPlayerId orelse OldWinPlayer == undefined ->
%%                    put(room_win_player_id, WinPlayerId),
%%                    {true, OldWinPlayer};
%%                true ->
%%                    false
%%            end
%%    end.

room_finish(Status, Player, WinPlayerId) ->
    room_finish(Status, Player, WinPlayerId, false).

room_finish(Status, Player, WinPlayerId, IsForce) ->
    ?PRINT_MSG("IsForce ~p  WinPlayerId ~p", [IsForce, WinPlayerId]),
    case set_win_player(WinPlayerId) of
        false ->
            ?WARNING_MSG("Error WinPlayerId ~p~n~p~n~p~p",
                [Status, Player, WinPlayerId, get_room_player()]),
            if
                IsForce ->
                    {ok, Bin} = pt_11:write(11012, [1, WinPlayerId, 1]);
                true ->
                    {ok, Bin} = pt_11:write(11012, [1, WinPlayerId])
            end,
            lib_send:send_to_player(Player, Bin),
            Status;
        {true, OldWinPlayerId} ->
            update_room_player_state(Player#ets_player.player_id, ?PLAYER_STATE_ENDGAME),
            if
                IsForce ->
                    {ok, Bin} = pt_11:write(11012, [0, WinPlayerId, 1]);
                true ->
                    {ok, Bin} = pt_11:write(11012, [0, WinPlayerId])
            end,
            if
                OldWinPlayerId == undefined ->
                    lib_room_internal:send_to_room(Bin);
                true ->
                    lib_send:send_to_player(Player, Bin)
            end,
            check_room_and_end(),
            set_room_finish_status(Status, WinPlayerId)
    end.

set_room_finish_status(Status, WinPlayerId) ->
    case get(is_set_room_finish) of
        true ->
            Status;
        _ ->
            RoomPlayers = lib_room_internal:get_room_player(),
            EndTime = util:unixtime(),
            NewStatus = Status#ets_room{
                room_game_state = ?ROOM_GAME_STATE_OVER,
                end_time = EndTime
            },
            case check_is_game_start() of
                true ->
                    game_pt_handler:game_end_event(NewStatus, RoomPlayers, WinPlayerId);
                _ ->
                    ok
            end,
            ?PRINT_MSG("room finish 11 ~p", [NewStatus]),
            put(is_set_room_finish, true),
            Status#ets_room{
                room_game_state = ?ROOM_GAME_STATE_OVER,
                end_time = EndTime
            }
    end.

check_room_and_end() ->
    RoomPlayers = get_room_player(),
    case check_player_end(RoomPlayers) of
        true ->
            erlang:send(self(), {room_close});
        false ->
            skip
    end.

check_player_end([]) ->
    true;
check_player_end([RoomPlayer | Tail]) when RoomPlayer#room_player.game_state == ?PLAYER_STATE_QUIT ->
    check_player_end(Tail);
check_player_end(_) ->
    false.


check_room_player_ready() ->
    List = lib_room_internal:get_room_player(),
    ReadyNum = length([
        1 || RoomPlayer <- List,
        RoomPlayer#room_player.game_state == ?PLAYER_STATE_READY
    ]),
    ReadyNum >= config:get_config(room_player_num).

update_last_action_time(PlayerId, Time) ->
    put({last_action_time, PlayerId}, {Time}).

get_last_action_time(PlayerId) ->
    case get({last_action_time, PlayerId}) of
        {Time} -> Time;
        _ -> 0
    end.

check_other_action(Player) ->
    NowTime = util:unixtime(),
    case get_no_action_end_time(NowTime) of
        EndTime when EndTime > 0 ->
            #ets_player{
                player_id = PlayerId
            } = Player,
            NowTime = util:unixtime(),
            update_last_action_time(PlayerId, NowTime),
            case get_other_players(PlayerId) of
                [OtherPlayer | _] ->
                    OtherId = OtherPlayer#room_player.player_id,
                    OtherLastTime = get_last_action_time(OtherId),
                    if
                        NowTime - OtherLastTime > EndTime ->
                            gen_server:cast(OtherPlayer#room_player.player_pid, {socket_close});
                        true ->
                            false
                    end;
                _ ->
                    ?WARNING_MSG("can not get player ~p~n ~p", [Player, get_room_player()]),
                    false
            end;
        _ ->
            false
    end.

get_no_action_end_time(NowTime) ->
    StartTime = get_game_start_time(NowTime),
    get_no_action_end_time(config:get_config(game_name), StartTime).

get_no_action_end_time(_, 0) ->
    -1;
get_no_action_end_time("elsfk", StartTime) ->
    if
        StartTime < 60 -> 15;
        StartTime < 90 -> 8;
        StartTime < 120 -> 4;
        StartTime < 150 -> 3;
        true -> 2
    end;
get_no_action_end_time("tttl", _) ->
    15;
get_no_action_end_time(_, _) ->
    -1.
