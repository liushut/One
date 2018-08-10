%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 16. 四月 2018 16:28
%%%-------------------------------------------------------------------
-module(lib_statistics).

%% API
-export([
    init_ets_table/0,
    add_battle/2,
    add_player/3
]).

-define(STATISTICS_ROOM, statistics_room).
-define(STATISTICS_PLAYER, statistics_player).

-record(statistics_room, {
    room_id,
    battle_id,
    create_time
}).

-record(statistics_player, {
    player_id,
    open_id,
    is_robot,
    create_time,
    last_login_time,
    player_count
}).

init_ets_table() ->
    mod_kernel:add_ets_table(statistics_room, #statistics_room.room_id),
    mod_kernel:add_ets_table(statistics_player, #statistics_player.player_id),
    ok.

get_player(PlayerId) ->
    case ets:lookup(?STATISTICS_PLAYER, PlayerId) of
        [] ->
            [];
        [Info | _] ->
            Info
    end.

add_player(PlayerId, OpenId, IsRobot) ->
    case get_player(PlayerId) of
        [] ->
            ok;
        Info ->
            ok
    end.

add_battle(BattleId, RoomId) ->
    ok.
