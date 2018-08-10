%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 22. 五月 2018 15:08
%%%-------------------------------------------------------------------
-module(game_pt_handler).

%% API
-export([
    get_user_info/1,
    game_start_event/2,
    game_end_event/3
]).

-include("common.hrl").

get_user_info(Data) ->
    HandleModule = config:get_pt_handler(),
    case catch HandleModule:get_user_info(Data) of
        {'EXIT', Error} ->
            ?WARNING_MSG("~p ~p Error ~p~n ~p",
                [Data, HandleModule, Error, erlang:get_stacktrace()]),
            {false, "", "", ""};
        Ret ->
            Ret
    end.

game_start_event(RoomStatus, RoomPlayerList) ->
    HandleModule = config:get_pt_handler(),
    case catch HandleModule:game_start_event(RoomStatus, RoomPlayerList) of
        {'EXIT', Error} ->
            ?WARNING_MSG("Error ~p~n ~p", [Error, erlang:get_stacktrace()]),
            false;
        _ ->
            ok
    end.

game_end_event(RoomStatus, RoomPlayerList, WinPlayerId) ->
    HandleModule = config:get_pt_handler(),
    case catch HandleModule:game_end_event(RoomStatus, RoomPlayerList, WinPlayerId) of
        {'EXIT', Error} ->
            ?WARNING_MSG("Error ~p~n ~p", [Error, erlang:get_stacktrace()]),
            false;
        _ ->
            ok
    end.
