%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 04. 五月 2018 10:43
%%%-------------------------------------------------------------------
-module(lib_payment).

-include("common.hrl").

%% API
-export([
    create_order_id/1,
    create_order/2,
    check_order/2
]).

-record(product_info, {
    product_id = "",
    product_name = "",
    pay_amount = 1,
    unit = <<"">>

}).

get_product_info("11") ->
    #product_info{
        product_id = "11",
        product_name = <<"游戏入场费"/utf8>>,
        pay_amount = 20,
        unit = <<"触手豆"/utf8>>
    };
get_product_info(_ProductId) ->
    [].

num_to_str(Num) ->
    num_to_str(Num, 2).
num_to_str(Num, Len) ->
    Str = integer_to_list(Num),
    AddNum = Len - length(Str),
    if
        AddNum > 0 ->
            lists:concat(lists:duplicate(AddNum,0) ++ [Num]);
        true ->
            Str
    end.

create_order_id(PlayerId) ->
    {{Year, Mon, Day}, {Hours, Min, Second}} = util:localtime(),
    MillSecond = util:time_millisecond() rem 10000,
    Rand = util:rand(999),
    PlayerEnd = PlayerId rem 1000,
    lists:concat([Year, num_to_str(Mon), num_to_str(Day),
        num_to_str(Hours), num_to_str(Min), num_to_str(Second),num_to_str(MillSecond, 4), num_to_str(Rand, 3), num_to_str(PlayerEnd, 3)
    ]).

create_order(Status, ProductId) ->
    case get_product_info(ProductId) of
        [] ->
            {false, 1};
        ProductInfo ->
            #ets_player{
                player_id = PlayerId,
                platform_id = PtId,
                open_id = OpenId
                } = Status,
            OrderInfo = #ets_game_orders{
                player_id = PlayerId,
                open_id = OpenId,
                platform_id = PtId,
                game_order_id = create_order_id(PlayerId),
                product_id = ProductId,
                product_name = ProductInfo#product_info.product_name,
                pay_amount = ProductInfo#product_info.pay_amount,
                unit = ProductInfo#product_info.unit,
                create_time = util:unixtime()
            },
            db_payment:create_order(OrderInfo),
            {ok, OrderInfo}
    end.

check_order(Status, OrderId) ->
    case db_payment:get_order(OrderId) of
        OrderInfo when is_record(OrderInfo, ets_game_orders) ->
            if
                OrderInfo#ets_game_orders.player_id == Status#ets_player.player_id ->
                    {ok, OrderId};
                true ->
                    {false, 3}
            end;
        _ ->
            {false, 2}
    end.

