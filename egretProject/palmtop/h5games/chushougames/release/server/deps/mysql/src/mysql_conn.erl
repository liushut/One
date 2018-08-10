%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 21. 四月 2018 11:26
%%%-------------------------------------------------------------------
-module(mysql_conn).

%% API
-export([
    start_mysql/1
]).

-include("mysql_ets.hrl").

start_mysql(DbType) ->
    case application:get_env(mysql, DbType) of
        {ok, DbConfig} ->
            do_start_mysql(DbType, DbConfig);
        undefined ->
            undefined
    end.

do_start_mysql(DbType, Options) ->
    Host = proplists:get_value(host, Options),
    Port = proplists:get_value(port, Options),
    User = proplists:get_value(user, Options),
    Password = proplists:get_value(password, Options),
    Db = proplists:get_value(db, Options),
    ChartSet = proplists:get_value(chartset, Options, "utf8"),
    Connections = proplists:get_value(connections, Options),
    NewOpts = [
        {host, Host},
        {port, Port},
        {user, User},
        {password, Password},
        {database, Db},
        {type, DbType},
        {chartset, ChartSet}
    ],
    F = fun(Index) ->
            ModName = erlang:list_to_atom(lists:concat([mysql_, DbType, '_', Index])),
            {ok, Pid} = mysql_sup:start_mysql(ModName, [{process_name, ModName} | NewOpts]),
            Pid
        end,
    lists:map(F, lists:seq(1, Connections)).
