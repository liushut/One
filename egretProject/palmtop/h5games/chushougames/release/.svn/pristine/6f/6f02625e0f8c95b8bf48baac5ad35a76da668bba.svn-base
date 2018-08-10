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
    send_to_room/2
]).

-include("common.hrl").

send_to_player(Player, Bin) ->
    send_to_sid(Player#ets_player.other#player_other.socket_pid, Bin).

send_to_sid(Sid, Bin) ->
    Sid ! {send, Bin}.

send_to_sid(Sid, Bin, After) ->
    erlang:send_after(After, Sid, {send, Bin}).

send_to_room(RoomPid, Bin) when is_pid(RoomPid) ->
    gen_server:cast(RoomPid, {send_to_room, Bin});
send_to_room(RoomId, Bin) ->
    RoomPid = lib_room:get_room_pid(RoomId),
    gen_server:cast(RoomPid, {send_to_room, Bin}).
