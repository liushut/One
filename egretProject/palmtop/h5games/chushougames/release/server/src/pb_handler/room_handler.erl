%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 24. 三月 2018 10:34
%%%-------------------------------------------------------------------
-module(room_handler).

-include("common.hrl").
%% API
-export([
    handle/4
]).

handle(11004, Status, Player, _) ->
    lib_room_internal:check_other_action(Player),
    {ok, Status};

%% 再来一局
handle(11007, Status, Player, _) ->
    lib_room_internal:reopen_game(Status, Player),
    {ok, Status#ets_room{round = 1}};

handle(11010, Status, Player, ProcessData) ->
    {ok, Bin} = pt_11:write(11010, [Player#ets_player.player_id, ProcessData]),
    lib_room_internal:send_to_room(Bin),
    lib_room_internal:check_other_action(Player),
    {ok, Status};

handle(11011, Status, Player, [Score, ResultData]) ->
    {ok, Bin} = pt_11:write(11011, [Player#ets_player.player_id, Score, ResultData]),
    lib_room_internal:send_to_room(Bin),
    lib_room_internal:check_other_action(Player),
    {ok, Status};

handle(11012, Status, Player, WinPlayerId) ->
    ?PRINT_MSG("Player ~p ~p", [Player, WinPlayerId]),
    NewStatus = lib_room_internal:room_finish(Status, Player, WinPlayerId),
    {ok, NewStatus};


%% 天天投篮玩法
handle(11101, Status, Player, [Round, ShootData]) ->
    ?PRINT_MSG("Player ~p~n~p", [{Player#ets_player.player_id, Round, ShootData}, Status]),
    lib_shoot:player_shoot(Status, Player, Round, ShootData),
    {ok, Status};

handle(11102, Status, Player, [Round, AddScore, Data]) ->
    ?PRINT_MSG("Player ~p~n~p", [{Player#ets_player.player_id, Round, AddScore}, Status]),
    case lib_shoot:player_add_score(Status, Player, [Round, AddScore, Data]) of
        {ok, NewStatus} ->
            {ok, NewStatus};
        _ ->
            ok
    end;

handle(player_quit, Status, Player, Data) ->
    NewStatus = lib_room_internal:player_quit(Status, Player, Data),
    {ok, NewStatus};

handle(Event, RoomState, Player, Data) ->
    ?WARNING_MSG("Unknow Room Event ~p~n ~p~n ~p~n~p", [Event, RoomState, Data, Player]),
    ok.
