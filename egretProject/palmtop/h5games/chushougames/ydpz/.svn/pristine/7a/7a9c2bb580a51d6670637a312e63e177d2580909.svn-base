%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 26. 三月 2018 11:13
%%%-------------------------------------------------------------------
-module(lib_player).
-include("common.hrl").

%% API
-export([
    get_player_pid/1,
    enter_match_game/2
]).

get_player_pid(PlayerId) ->
    PlayerProcessName = misc:user_process_name(PlayerId),
    case misc:whereis_name({local, PlayerProcessName}) of
        Pid when is_pid(Pid) ->
            case misc:is_process_alive(Pid) of
                true ->
                    Pid;
                _ ->
                    []
            end;
        _ -> []
    end.

enter_match_game(Status, MatchId) ->
    _RoomId = mod_id:get_room_id(MatchId),

    Status.
%%
%%enter_room(Player, MatchId) ->
%%    RoomId = mod_id:get_room_id(MatchId),
%%    if
%%        Player#ets_player.room_id =/= RoomId ->
%%            NewPlayer = Player#ets_player
%%    end,
%%
%%    if
%%        Player#ets_player.room_id =/= 0 and ->
%%            {ok, Bin} = pt_10:write(10002, 0),
%%            lib_send:send_to_player(Player, Bin),
%%            {ok, Player};
%%        true ->
%%            {}
%%    end
