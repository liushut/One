%%%--------------------------------------
%%% Module  : main
%%% Created : 2018.03.09
%%% Description:  服务器开启
%%%--------------------------------------
-module(main).

%%--------------------------------------------------------------------
%% Include files
%%--------------------------------------------------------------------
-include("common.hrl").

%%--------------------------------------------------------------------
%%-define(Macro, value).
%%-record(state, {}).
%%--------------------------------------------------------------------
-define(SERVER_APPS, [sasl, os_mon, kernel,stdlib,asn1,crypto,public_key,ssl,ranch, server]).

%%--------------------------------------------------------------------
%% External exports
%%--------------------------------------------------------------------
-export([
    server_start/0,
    server_stop/0,
    shutdown/0,
    start_profile/1
]).

%%启动游戏服务器
server_start()->
    try
        ok = start_applications(?SERVER_APPS)
    after
        timer:sleep(100)
    end.

shutdown() ->
    server_stop(),
    erlang:halt(0, [{flush, false}]).

%%停止游戏服务器
server_stop() ->
    %%首先关闭外部接入，然后停止目前的连接，等全部连接正常退出后，再关闭应用
    try
        stop_applications(?SERVER_APPS),
        erlang:halt(0),
        ok
    catch
        Error : Reason ->
            io:format("server stop error:~p~nReason:~p~n", [Error, Reason])
    end.

%%############辅助调用函数##############
manage_applications(Iterate, Do, Undo, SkipError, ErrorTag, Apps) ->
    Iterate(fun (App, Acc) ->
                    case Do(App) of
                        ok -> [App | Acc];%合拢
                        {error, {SkipError, _}} -> Acc;
                        {error, Reason} ->
                            lists:foreach(Undo, Acc),
                            throw({error, {ErrorTag, App, Reason}})
                    end
            end, [], Apps),
    ok.

start_applications(Apps) ->
    manage_applications(fun lists:foldl/3,
                        fun application:start/1,
                        fun application:stop/1,
                        already_started,
                        cannot_start_application,
                        Apps).

stop_applications(Apps) ->
    manage_applications(fun lists:foldr/3,
                        fun application:stop/1,
                        fun application:start/1,
                        not_started,
                        cannot_stop_application,
                        Apps).

start_profile(PidList) ->
    eprof:start(),
    eprof:start_profiling(PidList).
