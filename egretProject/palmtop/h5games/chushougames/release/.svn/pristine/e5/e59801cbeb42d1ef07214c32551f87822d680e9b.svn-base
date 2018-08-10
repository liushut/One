%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 20. 四月 2018 17:02
%%%-------------------------------------------------------------------
-module(lib_room).

%% API
-include("common.hrl").
-export([
    get_room_pid/1,
    start_room/1,
    send_room_event/3
]).

get_room_pid(RoomId) ->
    case ets:lookup(?ETS_ROOM, RoomId) of
        [RoomInfo] ->
            RoomInfo#ets_room.pid;
        _ ->
            undefined
    end.

start_room(RoomId) ->
    case get_room_pid(RoomId) of
        undefined ->
            case mod_room:start(RoomId) of
                {ok, Pid} ->
                    {ok, Pid};
                Error ->
                    ?WARNING_MSG("start ~p error ~p", [RoomId, Error]),
                    {error, undefined}
            end;
        Pid ->
            {ok, Pid}
    end.

send_room_event(PlayerStatus, Event, Args) ->
    gen_server:cast(PlayerStatus#ets_player.other#player_other.room_pid,
        {player_room_event, Event, PlayerStatus, Args}).
