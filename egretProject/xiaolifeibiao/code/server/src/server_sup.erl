%%%-----------------------------------
%%% @Module  : server_sup
%%% @Created : 2018.03.09
%%% @Description: 游戏服务器监控树
%%%-----------------------------------
-module(server_sup).
-behaviour(supervisor).
-export([start_link/0, start_child/1, start_child/2, init/1]).

start_link() ->
    supervisor:start_link({local,?MODULE}, ?MODULE, []).

start_child(Mod) ->
    start_child(Mod, []).

start_child(Mod, Args) ->
    {ok, _} = supervisor:start_child(?MODULE, {Mod, {Mod, start_link, Args},
                                               transient, 100, worker, [Mod]}),
    ok.

init([]) ->
    {ok, {
       {one_for_one, 5, 10},[]}
    }.
