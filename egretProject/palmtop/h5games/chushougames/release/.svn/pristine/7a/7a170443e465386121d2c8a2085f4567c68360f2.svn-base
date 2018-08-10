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

handle(10001, Status, [MatchId, MatchType, GameMode]) ->
    ?PRINT_MSG("enter match room ~p ~p ~p", [MatchId, MatchType, GameMode]),
    NewStatus = lib_player:enter_match_game(Status, [MatchId, MatchType, GameMode]),
    {ok, NewStatus};

handle(10010, Status, PropId) ->
    case lib_payment:create_order(Status, PropId) of
        {false, Reason} ->
            {ok, Bin} = pt_10:write(10010, Reason),
            lib_send:send_to_player(Status, Bin);
        {ok, OrderInfo} ->
            #ets_game_orders{
                game_order_id = OrderId,
                product_name = ProName,
                pay_amount = PayAmount
            } = OrderInfo,
            ?PRINT_MSG("OrderInfo ~p", [OrderInfo]),
            {ok, Bin} = pt_10:write(10010, [0, OrderId, ProName, PropId, PayAmount]),
            lib_send:send_to_player(Status, Bin)
    end,
    {ok, Status};

handle(10011, Status, OrderId) ->
    case lib_payment:check_order(Status, OrderId) of
        {false, Reason} ->
            {ok, Bin} = pt_10:write(10011, [Reason, OrderId]);
        {ok, RetOrderId} ->
            {ok, Bin} = pt_10:write(10011, [0, RetOrderId])
    end,
    lib_send:send_to_player(Status, Bin),
    ok;

handle(11002, Status, _) ->
    ?PRINT_MSG("playerReady ~p ~p",
        [Status#ets_player.open_id, Status#ets_player.player_id]),
    case config:get_is_room() of
        true ->
            if
                is_pid(Status#ets_player.other#player_other.room_pid) ->
                    gen_server:cast(Status#ets_player.other#player_other.room_pid, {player_ready, Status}),
                    ok;
                true ->
                    ?WARNING_MSG("Player Not Enter Room ~p", [Status]),
                    skip
            end;
        _ ->
            set_game_start(),
            {ok, Bin} = pt_11:write(11002, 0),
            lib_send:send_to_player(Status, Bin),
            Seeds = [util:rand(1000)],
            {ok, Bin2} = pt_11:write(11003, [3, [Status], Seeds]),
            lib_send:send_to_player(Status, Bin2),
            NewStatus = Status#ets_player{
                play_count = Status#ets_player.play_count + 1,
                score = 0
            },
            {update, NewStatus}
    end;

handle(11004, Status, _) ->
    case config:get_is_room() of
        true ->
            lib_room:send_room_event(Status, 11004, []);
        _ ->
            skip
    end,
    {ok, Status};

handle(11005, Status, _) ->
    {ok, Status};

handle(11006, Status, _) ->
    {ok, Status};

handle(11007, Status, _) ->
    case config:get_is_room() of
        true ->
            ?PRINT_MSG("Reopen ~p", [Status]),
            RoomPid = Status#ets_player.other#player_other.room_pid,
            if
                is_pid(RoomPid) ->
                    case is_process_alive(RoomPid) of
                        true ->
                            lib_room:send_room_event(Status, 11007, []);
                        _ ->
                            {ok, Bin} = pt_11:write(11007, 2),
                            lib_send:send_to_player(Status, Bin)
                    end;
                true ->
                    {ok, Bin} = pt_11:write(11007, 2),
                    lib_send:send_to_player(Status, Bin)
            end;
        _ ->
            set_game_start(),
            {ok, Status#ets_player{
                play_count = Status#ets_player.play_count + 1,
                score = 0
            }}
    end;

handle(11008, Status, _) ->
    {ok, Bin} = pt_11:write(11008, [Status#ets_player.top_score, Status#ets_player.week_top_score]),
    lib_send:send_to_player(Status, Bin),
    ok;

handle(11010, Status, ProcessData) ->
    lib_room:send_room_event(Status, 11010, ProcessData),
    {ok, Status};

handle(11011, Status, [Score, ResultData]) ->
    TopScore = max(Status#ets_player.top_score, Score),
    case config:get_is_room() of
        true ->
            lib_room:send_room_event(Status, 11011, [Score, ResultData]),
            NewStatus = Status#ets_player{
                top_score = TopScore,
                score = Score
            },
            {update, NewStatus};
        _ when TopScore == Score ->
            NewStatus = Status#ets_player{
                top_score = TopScore,
                score = Score
            },
            {update, NewStatus};
        _ ->
            {ok, Status#ets_player{score = Score}}
    end;


handle(11012, Status, WinPlayerId) ->
    case config:get_is_room() of
        true ->
            lib_room:send_room_event(Status, 11012, WinPlayerId),
            {ok, Status};
        _ ->
            if
                Status#ets_player.score > Status#ets_player.week_top_score ->
                    NewStatus = Status#ets_player{
                        week_top_score = Status#ets_player.score
                    },
                    gen_server:call(global_rank, {update_player_score, NewStatus});
                true ->
                    NewStatus = Status
            end,
            #ets_player{
                open_id = OpenId,
                player_id = PlayerId,
                week_top_score = WeekScore,
                score = Score
            } = NewStatus,
            OpenIds = [ tool:to_list(OpenId) | lib_player:get_friends()],
            FriendRanks = lib_rank:get_ranks_by_open_ids(OpenIds),
            FriendRank =
                case lists:keyfind(PlayerId, #ets_game_rank.player_id, FriendRanks) of
                    false ->
                        1;
                    RankInfo ->
                        RankInfo#ets_game_rank.rank
                end,
            PlayerRank = lib_rank:get_top_rank(OpenId, WeekScore),
            {ok, Bin} = pt_11:write(11012, [0, WinPlayerId, FriendRank, PlayerRank]),
            lib_send:send_to_player(NewStatus, Bin),
            HandleModule = config:get_pt_handler(),
            ResultPlayer = #result_player{
                player_id = PlayerId,
                open_id = OpenId,
                score = Score
            },
            case is_game_start() of
                true ->
                    case catch HandleModule:game_end_event(0, [ResultPlayer], 0, 0) of
                        {'EXIT', Error} ->
                            ?WARNING_MSG("Error ~p~n~p", [Error, erlang:get_stacktrace()]);
                        _ ->
                            ok
                    end,
                    reset_game_start();
                _ ->
                    ok
            end,
            {ok, NewStatus}
    end;

handle(11014, Status, OpenIds) ->
    ?PRINT_MSG("OpenIds ~p" ,[OpenIds]),
    lib_player:update_friends(OpenIds),
    {ok, Status};

handle(11015, Status, _) ->
    Time = util:unixtime(),
    MilliTime = util:time_millisecond(),
    {ok, Bin} = pt_11:write(11015, [Time, MilliTime]),
    lib_send:send_to_player(Status, Bin),
    ok;


handle(Cmd, Status, Data) ->
    case config:get_is_room() of
        true ->
            lib_room:send_room_event(Status, Cmd, Data);
        _ ->
            ?WARNING_MSG("Unknow handle ~p~p~n~p~n", [Cmd, Data, Status]),
            skip
    end.

reset_game_start() ->
    put(is_game_start, false).

set_game_start() ->
    put(is_game_start, true).

is_game_start() ->
    get(is_game_start) == true.



