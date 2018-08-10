%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 26. 三月 2018 15:49
%%%-------------------------------------------------------------------
-module(lib_room).

-include("common.hrl").
%% API
-export([
    get_room_player/1,
    update_room_player/1
]).

-define(DIC_ROOM_PLAYER, dic_room_player).

get_room_player() ->
    case get(?DIC_ROOM_PLAYER) of
        List when is_list(List) ->
            List;
        _ ->
            []
    end.

get_room_player(PlayerId) ->
    List = get_room_player(),
    case lists:keyfind(PlayerId, #ets_player.id, List) of
        false ->
            [];
        Player ->
            Player
    end.

update_room_player(Player) ->
    List = get_room_player(),
    case lists:keytake(Player#ets_player.id, #ets_player.id, List) of
        {value, _OldPlayer, List2} ->
            NewList = [Player | List2],
            put(?DIC_ROOM_PLAYER, NewList);
        _ ->
            NewList = [Player | List],
            put(?DIC_ROOM_PLAYER, NewList)
    end.
