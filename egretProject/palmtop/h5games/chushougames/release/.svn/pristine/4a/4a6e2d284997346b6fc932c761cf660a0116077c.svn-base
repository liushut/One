%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 24. 四月 2018 10:14
%%%-------------------------------------------------------------------
-module(db_statistics).
-include("common.hrl").
%% API
-export([
    get_statistics/0,
    get_statistics/1,
    get_dnu/1,
    get_dau/1,
    update_statistics/1,
    add_online_log/2
]).

update_statistics(Statistics) ->
    Data = [
        {date_time, Statistics#ets_log_statistics.date_time},
        {dnu, Statistics#ets_log_statistics.dnu},
        {dau, Statistics#ets_log_statistics.dau},
        {pcu, Statistics#ets_log_statistics.pcu},
        {ccu, Statistics#ets_log_statistics.ccu}
    ],
    ok = db_game:replace(log_statistics, Data).

add_online_log(LogTime, Online) ->
    ok = db_game:insert(log_online,
        [{log_time, LogTime}, {ccu, Online}]).

get_statistics() ->
    get_statistics(util:today_start()).

get_statistics(DateTime) ->
    case db_game:select_one(log_statistics, "*", [{date_time, DateTime}]) of
        [] ->
            #ets_log_statistics{
                date_time = DateTime,
                dnu = get_dnu(DateTime),
                dau = get_dau(DateTime),
                pcu = 0,
                ccu = 0
            };
        Info when is_list(Info) ->
            erlang:list_to_tuple([ets_log_statistics | Info]);
        Error ->
            ?WARNING_MSG("get statistics error ~p", [Error]),
            #ets_log_statistics{
                date_time = DateTime,
                dnu = get_dnu(DateTime),
                dau = get_dau(DateTime),
                pcu = 0,
                ccu = 0
            }
    end.

get_dnu(BeginDate) ->
    EndDate = BeginDate + 86400,
    case db_game:select_one(game_player, "count(*)", [{register_time, '>=', BeginDate},{register_time, '<', EndDate}]) of
        [Count] ->
            Count;
        Error ->
            ?WARNING_MSG("get count Error ~p", [Error]),
            0
    end.

get_dau(BeginDate) ->
    EndDate = BeginDate + 86400,
    case db_game:select_one(game_player, "count(*)", [{last_login_time, '>=', BeginDate},{last_login_time, '<', EndDate}]) of
        [Count] ->
            Count;
        Error ->
            ?WARNING_MSG("get count Error ~p", [Error]),
            0
    end.

