%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 24. 三月 2018 17:29
%%%-------------------------------------------------------------------
-ifndef(__PB_ROUTER_HRL__).
-define(__PB_ROUTER_HRL__, true).

-define(PB_ROUTER_MAP, #{
    %% 协议前三位，协议解析模块，协议处理模块
    100 => {pt_10, battle_ali_handler},
    101 => {pt_10, battle_ali_handler},
    110 => {pt_11, battle_ali_handler}
}).

-define(PB_HANDLER_MAP, #{

}).

-endif.