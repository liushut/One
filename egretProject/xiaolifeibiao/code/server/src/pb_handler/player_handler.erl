%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 24. 三月 2018 10:44
%%%-------------------------------------------------------------------
-module(player_handler).

%% API
-export([handle/3]).
-include("common.hrl").

handle(10001, Status, MatchId) ->
    ?PRINT_MSG("enter match room ~p", [MatchId]),
    %%NewStatus = lib_player:enter_match_game(Status, MatchId),
    RoomId = mod_id:get_room_id(MatchId),
    NewStatus = Status#ets_player{
        room_id = RoomId
    },
    ets:insert(?ETS_PLAYER, NewStatus),
    {ok, Bin} = pt_10:write(10001, [0, RoomId, MatchId]),
    lib_send:send_to_player(NewStatus, Bin),
    {ok, NewStatus};

handle(10002, Status, _) ->
    ?PRINT_MSG("playerReady", []),
    {ok, Bin} = pt_10:write(10002, 0),
    lib_send:send_to_player(Status, Bin),
    {ok, Bin2} = pt_10:write(10003, 3),
    lib_send:send_to_player(Status, Bin2),
    {ok, Status};

handle(10004, Status, _) ->
    {ok, Status};

handle(10010, Status, ProcessData) ->
    {ok, Bin} = pt_10:write(10010, [Status#ets_player.id, ProcessData]),
    lib_send:send_to_room(Status#ets_player.room_id, Bin),
    ?PRINT_MSG("ProcessData ~p", [{ProcessData, 10010, Status#ets_player.room_id}]),
    {ok, Status};

handle(10011, Status, ResultData) ->
    Seeds = [1,2,3,4],
    {ok, Bin} = pt_10:write(10011, [Status#ets_player.id, ResultData, Seeds]),
    lib_send:send_to_room(Status#ets_player.room_id, Bin),
    ?PRINT_MSG("ProcessData ~p", [{ResultData, 10011, Status#ets_player.room_id}]),
    {ok, Status};

handle(Cmd, ClientState, Data) ->
    ?WARNING_MSG("Unknow handle ~p~p~n~p~n", [Cmd, Data, ClientState]),
    {ok, ClientState}.