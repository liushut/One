%%%-----------------------------------
%%% Module  : server_app
%%% Created : 2018.03.09
%%% Description: 游戏服务器
%%%-----------------------------------
-module(server_app).
-behaviour(application).

-include("common.hrl").

-export([start/2, stop/1]).

start(normal, []) ->
	%% 创建ETS表
	create_ets_tables(),
    {ok, SupPid} = server_sup:start_link(),
    server:start(),
    {ok, SupPid}.


stop(State) ->
    server:stop(State).


create_ets_tables() ->
    ets:new(?ETS_SYSTEM_INFO, [set, public, named_table]),
    ets:new(?ETS_MONITOR_PID, [set, public, named_table, {keypos, 1}]),
    ok.


