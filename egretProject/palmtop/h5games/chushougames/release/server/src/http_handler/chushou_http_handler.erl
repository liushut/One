%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 19. 四月 2018 10:19
%%%-------------------------------------------------------------------
-module(chushou_http_handler).

%% API
-export([
    handle/2
]).

-include("common.hrl").
-define(MESSAGE_SIGN_ERROR, <<"校验失败"/utf8>>).
-define(MESSAGE_ORDER_ERROR, <<"无效订单"/utf8>>).

check_sign(Requests) ->
    case lists:keytake(<<"_sign">>, 1, Requests) of
        {value, {_, SignValue}, List} ->
            Sign = chushou_pt_handler:make_sign_str(List),
            tool:to_list(SignValue) == tool:to_list(Sign);
        _ ->
            false
    end.

%% 支付结果通知
handle(<<"/xapi/h5game/pay/notifyResult.htm">>, Requests) ->
    CpOrderId = tool:get_value(<<"cpOrderId">>, Requests, string),
    PayResult = tool:get_value(<<"payResult">>, Requests, int),
    [RetCode, RetMsg] =
        case check_sign(Requests) of
            false ->
                ?WARNING_MSG("Check Sign Error ~p", [Requests]),
                [1, tool:to_list(?MESSAGE_SIGN_ERROR)];
            true ->
                case db_payment:get_order(CpOrderId) of
                    OrderInfo when is_record(OrderInfo, ets_game_orders) ->
                        NewStatus =
                            if
                                PayResult == 0 -> 1;
                                true -> 2
                            end,
                        db_payment:set_order_status(CpOrderId, NewStatus),
                        [0, ""];
                    _ ->
                        ?WARNING_MSG("Error OrderId ~p", [Requests]),
                        [1, tool:to_list(?MESSAGE_ORDER_ERROR)]
                end
        end,
    Ret = #{
        code => RetCode,
        message => RetMsg
    },
    util:maps_to_json(Ret);

%% 查询订单是否有效
handle(<<"/xapi/h5game/pay/validateOrder.htm">>, Requests) ->
    CpOrderId = tool:get_value(<<"cpOrderId">>, Requests, string),
    CpPropId = tool:get_value(<<"cpPropId">>, Requests, string),
    case check_sign(Requests) of
        false ->
            ?WARNING_MSG("Check Sign Error ~p", [Requests]),
            Ret = #{
                code => 1,
                message => tool:to_list(?MESSAGE_SIGN_ERROR)
            },
            util:maps_to_json(Ret);
        true ->
            [RetCode, RetMsg] =
                case db_payment:get_order(CpOrderId) of
                    OrderInfo when is_record(OrderInfo, ets_game_orders) ->
                        if
                            CpPropId == OrderInfo#ets_game_orders.product_id ->
                                [0, ""];
                            true ->
                                [1, tool:to_list(?MESSAGE_ORDER_ERROR)]
                        end;
                    _ ->
                        ?WARNING_MSG("Error OrderId ~p", [Requests]),
                        [0, ""]
                    %%[1, tool:to_list(<<"无效订单"/utf8>>)]
                end,
            Ret = #{
                code => RetCode,
                message => RetMsg
            },
            util:maps_to_json(Ret)
    end;

%% 游戏当⽇日实时统计数据
handle(<<"/xapi/h5game/statistic/real_time.htm">>, _Requests) ->
    Statistics = global_statistics:get_statistics(),
    Date = util:today_start(),
    Dau = db_statistics:get_dau(Date),
    Dnu = db_statistics:get_dnu(Date),
    Online = ets:info(?ETS_PLAYER, size),
    Ret = #{
        code => 0,
        message => "",
        data => #{
            dnu => Dnu,
            dau => Dau,
            pcu => max(Online, Statistics#ets_log_statistics.pcu),
            ccu => Online
        }
    },
    util:maps_to_json(Ret);

%% 指定时段内的⽤用户⾏行行为数据
handle(<<"/xapi/h5game/statistic/behavior.htm">>, _Requests) ->
    <<>>;

%% 查询房间游戏活跃状态
handle(<<"/xapi/h5game/status/queryRoom.htm">>, Requests) ->
    _GameRoomId = proplists:get_value(<<"gameRoomId">>, Requests, null),
    Ret = #{
        code => 0,
        data => #{
            isAlive => false,
            accessAllowed => false
        }
    },
    util:maps_to_json(Ret);


%% 个人赛用户列表排行
handle(<<"/xapi/h5game/ranking/userlist.htm">>, Requests) ->
    OpenIds = string:tokens(tool:to_list(proplists:get_value(<<"users">>, Requests, "")), ","),
    Ranks = lib_rank:get_ranks_by_open_ids(OpenIds),
    Ret = #{
        code => 0,
        message => "",
        data => #{
            rankings => {array, ranks_to_maps(Ranks)},
            scoreUnit => ?SCORE_UNIT
        }
    },
    ?PRINT_MSG("get user ranks ~p", [Requests]),
    util:maps_to_json(Ret);

%% 个人赛全站排行
handle(<<"/xapi/h5game/ranking/total.htm">>, Requests) ->
    OpenId = tool:to_list(proplists:get_value(<<"openUid">>, Requests, "")),
    {IsPlayerRank, Rank, Score} =
        if
            OpenId == "" ->
                {false, 0, 0};
            true ->
                case lib_rank:get_player_rank(OpenId) of
                    [] ->
                        {false, 0, 0};
                    RankInfo ->
                        GetRank = lib_rank:get_top_rank(OpenId, RankInfo#ets_game_rank.top_score),
                        {true, GetRank, RankInfo#ets_game_rank.top_score}
                end
        end,
    Count = tool:to_integer(proplists:get_value(<<"count">>, Requests, "100")),
    Ranks = lib_rank:get_total_rank(Count),
    ?PRINT_MSG("get total ranks ~p", [Requests]),
    if
        IsPlayerRank ->
            Ret = #{
                code => 0,
                message => "",
                data => #{
                    userRanking => Rank,
                    userScore => Score,
                    rankings => {array, ranks_to_maps(Ranks)},
                    scoreUnit => ?SCORE_UNIT
                }
            },
            util:maps_to_json(Ret);
        true ->
            Ret = #{
                code => 0,
                message => "",
                data => #{
                    rankings => {array, ranks_to_maps(Ranks)},
                    scoreUnit => ?SCORE_UNIT
                }
            },
            util:maps_to_json(Ret)
    end;

handle(<<"/favicon.ico">>, _) ->
    <<>>;

handle(<<"/">>, _) ->
    <<>>;

handle(Path, Requests) ->
    ?WARNING_MSG("Unknow Path ~p~n~p", [Path, Requests]),
    <<>>.

ranks_to_maps(RankPlayers) ->
    [rank_to_map(One) || One <- RankPlayers].

rank_to_map(RankPlayer) when is_record(RankPlayer, ets_top_rank) ->
    #ets_top_rank{
        open_id = OpenId,
        rank = Rank,
        score = Score
    } = RankPlayer,
    #{
        openUid => OpenId,
        ranking => Rank,
        score => Score
    };
rank_to_map(RankPlayer) ->
    #ets_game_rank{
        open_id = OpenId,
        rank = Rank,
        top_score = Score
    } = RankPlayer,
    #{
        openUid => OpenId,
        ranking => Rank,
        score => Score
    }.

