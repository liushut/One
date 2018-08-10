%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 24. 五月 2018 15:05
%%%-------------------------------------------------------------------
-module(lib_shoot).
-include("common.hrl").

%% API
-export([
    player_shoot/4,
    player_add_score/3
]).

player_shoot(Status, Player, Round, ShootData) ->
    CurrentRound = Status#ets_room.round,
    if
        CurrentRound == Round ->
            {ok, Bin} = pt_11:write(11101, [0, Round, Player#ets_player.player_id, ShootData]),
            lib_room_internal:send_to_room(Bin);
        true ->
            {ok, Bin} = pt_11:write(11101, [2, CurrentRound, Player#ets_player.player_id, undefined]),
            lib_send:send_to_player(Player, Bin)
    end.

player_add_score(Status, Player, [Round, AddScore, Data]) ->
    %%AddScore = 1,
    CurrentRound = Status#ets_room.round,
    if
        CurrentRound == Round ->
            RoomPlayer = lib_room_internal:get_room_player(Player#ets_player.player_id),
            NewRoomPlayer = RoomPlayer#room_player{
                score = RoomPlayer#room_player.score + AddScore
            },
            lib_room_internal:update_room_player(NewRoomPlayer),
            RoomPlayers = lib_room_internal:get_room_player(),
            {ok, Bin} = pt_11:write(11102, [0, Round, RoomPlayers, Data]),
            lib_room_internal:send_to_room(Bin),
            NewStatus = Status#ets_room{
                round = Round + 1
            },
            {ok, NewStatus};
        true ->
            RoomPlayers = lib_room_internal:get_room_player(),
            {ok, Bin} = pt_11:write(11102, [2, CurrentRound, RoomPlayers, Data]),
            lib_room_internal:send_to_room(Bin),
            ok
    end.
