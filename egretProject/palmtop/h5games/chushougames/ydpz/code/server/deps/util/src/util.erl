%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 08. 四月 2018 17:13
%%%-------------------------------------------------------------------
-module(util).

%% API
-export([
    rand/1,
    rand/2,
    unixtime/0,
    localtime/0,
    seconds_to_localtime/1,
    localtime_to_seconds/1,
    md5/1
]).

-define(DIFF_SECONDS_1900_1970,     2208988800).
-define(DIFF_SECONDS_0000_1970,     62167219200).
-define(ONE_DAY_SECONDS,            86400).                         %% 一天的时间（秒）
-define(ONE_DAY_MINUTES,            1440).                          %% 一天的分钟
-define(ONE_DAY_HOURS,              24).                            %% 一天的小时
-define(ONE_DAY_MILLISECONDS,       86400000).                      %%一天时间（毫秒）
-define(ONE_HOUR_SECONDS,           3600).                          %%一小时的时间（秒）
-define(FIVE_HOUR,                  18000).                         %%五小时（多个系统的刷新时间）

md5(S) ->
    <<N:128>> = erlang:md5(S),
    string:to_lower(integer_to_list(N, 16)).

rand(Num) ->
    rand:uniform(Num).

rand(Begin, End) when End - Begin > 0 ->
    Begin + rand:uniform(End - Begin + 1) - 1;
rand(End, Begin) when End - Begin > 0 ->
    Begin + rand:uniform(End - Begin + 1) - 1;
rand(Begin, _) ->
    Begin.

unixtime() ->
    case catch ets:lookup(ets_timer, now_seconds) of
        [{now_seconds, NowSeconds}] ->
            NowSeconds;
        _ ->
            {MegaSecs, Secs, _MicroSecs} = erlang:timestamp(),
            MegaSecs * 1000000 + Secs
    end.

localtime() ->
    case catch ets:lookup(ets_timer, local_time) of
        [{local_time, LocalTime}] ->
            LocalTime;
        _ ->
            seconds_to_localtime(unixtime())
    end.

seconds_to_localtime(Seconds) ->
    DateTime = calendar:gregorian_seconds_to_datetime(Seconds+?DIFF_SECONDS_0000_1970),
    calendar:universal_time_to_local_time(DateTime).

localtime_to_seconds(DateTime) ->
    [DateTime2] = calendar:local_time_to_universal_time_dst(DateTime),
    Seconds = calendar:datetime_to_gregorian_seconds(DateTime2),
    Seconds - ?DIFF_SECONDS_0000_1970.

