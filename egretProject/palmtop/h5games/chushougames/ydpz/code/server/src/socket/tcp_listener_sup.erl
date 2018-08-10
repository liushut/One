%%%-----------------------------------
%%% @Module  : tcp_listener_sup
%%% @Author  : HJ
%%% @Created : 2018.03.09
%%% @Description: tcp listerner 监控树
%%%-----------------------------------

-module(tcp_listener_sup).
-behaviour(supervisor).
-export([start_link/1]).
-export([init/1]).

start_link(Port) ->
    supervisor:start_link(?MODULE, {30, Port}).

init({AcceptorCount, Port}) ->
    register(?MODULE, self()),
    {ok,
        {{one_for_all, 10, 10},
            [
                {
                    tcp_acceptor_sup,
                    {tcp_acceptor_sup, start_link, []},
                    transient,
                    infinity,
                    supervisor,
                    [tcp_acceptor_sup]
                },
                {
                    tcp_listener,
                    {tcp_listener, start_link, [AcceptorCount, Port]},
                    transient,
                    1000,
                    worker,
                    [tcp_listener]
                }
            ]
        }
    }.
