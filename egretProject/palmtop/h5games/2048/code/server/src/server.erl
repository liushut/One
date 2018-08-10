%%%-------------------------------------------------------------------
%%% Module  : server
%%% Author  :
%%% Description : 游戏服务器
%%%-------------------------------------------------------------------
-module(server).

%%--------------------------------------------------------------------
%% Include files
%%--------------------------------------------------------------------
-include("common.hrl").

%%--------------------------------------------------------------------
%% External exports
-export([
    start/0,
    stop/0
]).

%%====================================================================
%% External functions
%%====================================================================
start() ->
    StartMods = [mod_id, mod_kernel, mod_timer],
    logger_event:start_link(),
    logger_event:add_handler(config:get_config(logger_head)),
    [{ok, _} = start_child(Mod) || Mod <- StartMods],
    {ok, L1} = start_tcp_listener(),
    {ok, L2} = start_websocket_listener(),
    {ok, L3} = start_wss_listener(),
    true = check_listener([L1, L2, L3]),
    LogLv = config:get_config(print_level),
    print_level:set(LogLv),
    {ok, self()}.

stop() ->
    ok.

%%====================================================================
%% Private functions
%%====================================================================
check_listener([]) ->
    false;
check_listener([Pid|_Tail]) when is_pid(Pid) ->
    true;
check_listener([_Pid|Tail]) ->
    check_listener(Tail).


%%开启核心服务
start_child(Mod) ->
    {ok,Pid} = supervisor:start_child(
        server_sup,
        {Mod,
            {Mod, start_link,[]},
            permanent, 10000, supervisor, [Mod]}),
    io:format("~p start complete! ~p\n", [Mod, Pid]),
    {ok, Pid}.

%%开启tcp listener监控树
start_tcp_listener() ->
    case config:get_config(tcpsocket_port) of
        Port when is_integer(Port) ->
            {ok,Pid} = supervisor:start_child(
                server_sup,
                {tcp_listener_sup,
                    {tcp_listener_sup, start_link, [Port]},
                    transient, infinity, supervisor, [tcp_listener_sup]}),
            io:format("tcpsocket start complete! ~p port:~p\n", [Pid, Port]),
            {ok, Pid};
        _ ->
            io:format("no tcp listerner!!!!~n"),
            {ok, skip}
    end.

start_websocket_listener() ->
    case config:get_config(websocket_port) of
        Port when is_integer(Port) ->
            Dispatch = cowboy_router:compile([
                {'_', [
                    {'_', websocket_recv, []}
                ]}
            ]),
            {ok, Pid} = cowboy:start_clear(http, [{port, Port}], #{
                env => #{dispatch => Dispatch}
            }),
            io:format("websocket start complete! ~p port:~p\n", [Pid, Port]),
            {ok, Pid};
        _ ->
            io:format("no websocket listerner!!!!~n"),
            {ok, skip}
    end.


start_wss_listener() ->
    CACrt = config:get_config(server_ca_crt),
    ServerCrt = config:get_config(server_crt),
    ServerKey = config:get_config(server_key),
    IsFileExist = is_files_exist([CACrt, ServerCrt, ServerKey]),
    case config:get_config(wss_port) of
        Port when is_integer(Port) and IsFileExist ->
            Dispatch = cowboy_router:compile([
                {'_', [
                    {'_', websocket_recv, []}
                ]}
            ]),
            {ok, Pid} = cowboy:start_tls(https, [
                {port, Port},
                {cacertfile, CACrt},
                {certfile, ServerCrt},
                {keyfile, ServerKey}
            ], #{env => #{dispatch => Dispatch}}),
            io:format("wss socket start complete! ~p port:~p\n", [Pid, Port]),
            {ok, Pid};
        _ ->
            io:format("no wss listerner!!!!~n"),
            {ok, skip}
    end.

is_files_exist([]) ->
    true;
is_files_exist([File|Tail]) ->
    case file:read_file(File) of
        {ok, _} ->
            is_files_exist(Tail);
        _ ->
            false
    end.