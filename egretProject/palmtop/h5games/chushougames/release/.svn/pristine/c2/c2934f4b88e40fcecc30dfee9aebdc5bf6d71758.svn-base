%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 04. 五月 2018 11:29
%%%-------------------------------------------------------------------
-module(db_payment).
-include("common.hrl").

%% API
-export([
    create_order/1,
    get_order/1,
    update_order/2,
    set_order_status/2
]).

create_order(GameOrder) ->
    [_Auto | Fields] = record_info(fields, ets_game_orders),
    [_, _Id | Values] = erlang:tuple_to_list(GameOrder),
    ok = db_game:insert(game_orders, Fields, Values).

get_order(OrderId) ->
    case db_game:select_one(game_orders, "*", [{game_order_id, OrderId}]) of
        [] ->
            [];
        List when is_list(List) ->
            Info = erlang:list_to_tuple([ets_game_orders | List]),
            Info#ets_game_orders{
                game_order_id = tool:to_list(Info#ets_game_orders.game_order_id),
                product_id = tool:to_list(Info#ets_game_orders.product_id),
                open_id = tool:to_list(Info#ets_game_orders.open_id),
                product_name = tool:to_list(Info#ets_game_orders.product_name)
            };
        Error ->
            ?WARNING_MSG("order error ~p ~p", [OrderId, Error]),
            []
    end.

set_order_status(OrderId, Status) ->
    ok = db_game:update(game_orders, [{status, Status}, {finish_time, util:unixtime()}], [{game_order_id, OrderId}]).

update_order(OrderId, WhereList) ->
    ok = db_game:update(game_orders, WhereList, [{game_order_id, OrderId}]).
