%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 12. 三月 2018 18:39
%%%-------------------------------------------------------------------
-module(lib_send).

%% API
-export([
    send_to_player/2,
    send_to_sid/2,
    send_to_sid/3,
    send_to_room/2,
    send_to_battle_id/2,
    send_to_open_id/3
]).

-include("common.hrl").

send_to_player(Player, Bin) ->
    ?PRINT_MSG("PlayerPid ~p",[Player#ets_player.socket_pid]),
    send_to_sid(Player#ets_player.socket_pid, Bin).

send_to_sid(Sid, Bin) ->
    Sid ! {send, Bin}.

send_to_sid(Sid, Bin, After) ->
    erlang:send_after(After, Sid, {send, Bin}).

send_to_room(RoomId, Bin) ->
    Ms = ets:fun2ms(fun(Player) when Player#ets_player.room_id == RoomId -> Player#ets_player.socket_pid end),
    List = ets:select(?ETS_PLAYER, Ms),
    [send_to_sid(SocketPid, Bin) || SocketPid <- List].

send_to_battle_id(BattleState, Data) ->
    #ets_battle_state{
        socket_pid = SocketPid,
        battle_id = BattleId
    } = BattleState,
    {ok, Bin} = pt_ali_head:write(10001, [BattleId, Data]),
    send_to_sid(SocketPid, Bin).

send_to_open_id(OpenId, BattleState, Data) ->
    #ets_battle_state{
        socket_pid = SocketPid,
        battle_id = BattleId
    } = BattleState,
    {ok, Bin} = pt_ali_head:write(10000, [BattleId, [OpenId], Data]),
    send_to_sid(SocketPid, Bin).
