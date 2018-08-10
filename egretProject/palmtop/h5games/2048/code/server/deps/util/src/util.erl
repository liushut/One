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
    time_millisecond/0,
    local_start/0,
    today_start/0,
    today_seconds/0,
    week_day_start/1,
    week_start/0,
    week_end/0,
    localtime/0,
    localdate/0,
    date_to_string/1,
    seconds_to_localtime/1,
    localtime_to_seconds/1,
    md5/1,
    maps_to_json/1,
    list_to_json/1,
    merge_field_value/2
]).

-define(DIFF_SECONDS_1900_1970,     2208988800).                    %%
-define(DIFF_SECONDS_0000_1970,     62167219200).                   %%
-define(ONE_DAY_SECONDS,            86400).                         %% 一天的时间（秒）
-define(ONE_DAY_MINUTES,            1440).                          %% 一天的分钟
-define(ONE_DAY_HOURS,              24).                            %% 一天的小时
-define(ONE_DAY_MILLISECONDS,       86400000).                      %% 一天时间（毫秒）
-define(ONE_HOUR_SECONDS,           3600).                          %% 一小时的时间（秒）
-define(FIVE_HOUR,                  18000).                         %% 五小时（多个系统的刷新时间）

md5(S) ->
    <<N:128>> = erlang:md5(S),
    Str = string:to_lower(integer_to_list(N, 16)),
    Num = 32 - length(Str),
    if
        Num > 0 ->
            lists:concat(lists:duplicate(Num, 0) ++ [Str]);
        true ->
            Str
    end.

rand(Num) ->
    rand:uniform(Num).

rand(Begin, End) when End - Begin > 0 ->
    Begin + rand:uniform(End - Begin + 1) - 1;
rand(End, Begin) when End - Begin > 0 ->
    Begin + rand:uniform(End - Begin + 1) - 1;
rand(Begin, _) ->
    Begin.

time_millisecond() ->
    erlang:system_time(millisecond).

unixtime() ->
    case catch ets:lookup(ets_timer, now_seconds) of
        [{now_seconds, NowSeconds}] ->
            NowSeconds;
        _ ->
            {MegaSecs, Secs, _MicroSecs} = erlang:timestamp(),
            MegaSecs * 1000000 + Secs
    end.

today_seconds() ->
    {{_,_,_},{H,M,S}} = util:localtime(),
    H * 3600 + M * 60 + S.

local_start() ->
    {{Y,M,D},{_,_,_}} = util:localtime(),
    {{Y,M,D},{0,0,0}}.

localtime() ->
    case catch ets:lookup(ets_timer, local_time) of
        [{local_time, LocalTime}] ->
            LocalTime;
        _ ->
            seconds_to_localtime(unixtime())
    end.

week_day_start(DayOfWeek) ->
    {Date, _} = local_start(),
    ToDayOfWeek = calendar:day_of_the_week(Date),
    today_start() - (ToDayOfWeek - DayOfWeek) * 86400.

week_start() ->
    case catch ets:lookup(ets_timer, week_start) of
        [{week_start, WeekStart}] ->
            WeekStart;
        _ ->
            {Date, _} = local_start(),
            DayOfWeek = calendar:day_of_the_week(Date),
            today_start() - (DayOfWeek - 1) * 86400
    end.

week_end() ->
    week_start() + 604800.

today_start() ->
    case catch ets:lookup(ets_timer, today_start) of
        [{today_start, TodayStart}] ->
            TodayStart;
        _ ->
            localtime_to_seconds(local_start())
    end.

localdate() ->
    case catch ets:lookup(ets_timer, local_date) of
        [{local_date, LocalDate}] ->
            LocalDate;
        _ ->
            {{Y,M,D},{H,Min,S}} = seconds_to_localtime(unixtime()),
            lists:concat([Y,"-",M,"-",D," ",H,":",Min,":",S])
    end.

date_to_string(UnixTime) when is_integer(UnixTime) ->
    date_to_string(seconds_to_localtime(UnixTime));
date_to_string({{Y,M,D},{H,Min,S}}) ->
    lists:concat([Y,"-",M,"-",D," ",H,":",Min,":",S]).

seconds_to_localtime(Seconds) ->
    DateTime = calendar:gregorian_seconds_to_datetime(Seconds+?DIFF_SECONDS_0000_1970),
    calendar:universal_time_to_local_time(DateTime).

localtime_to_seconds(DateTime) ->
    [DateTime2] = calendar:local_time_to_universal_time_dst(DateTime),
    Seconds = calendar:datetime_to_gregorian_seconds(DateTime2),
    Seconds - ?DIFF_SECONDS_0000_1970.


maps_to_json(Maps) ->
    KvList = maps:to_list(Maps),
    JsonContent = pack_kv_list(KvList),
    iolist_to_binary(mochijson2:encode(JsonContent)).

list_to_json(List) ->
    iolist_to_binary(mochijson2:encode([to_binary(Val) || Val <- List])).

pack_kv_list(Content) ->
    {struct, [{atom_to_binary(Key, utf8), to_binary(Val)} || {Key, Val} <- Content]}.

to_binary({array, List}) ->
    [to_binary(Data) || Data <- List];
to_binary(Val) when is_map(Val) ->
    pack_kv_list(maps:to_list(Val));
to_binary(Val) when is_list(Val) ->
    tool:to_binary(Val);
to_binary(Val) when is_boolean(Val) ->
    Val;
to_binary(Val) when is_atom(Val) ->
    atom_to_binary(Val, utf8);
to_binary(Val) ->
    Val.

merge_field_value(Fields, Values) ->
    merge_field_value(Fields, Values, []).
merge_field_value([], [], Ret) ->
    lists:reverse(Ret);
merge_field_value([K], [V], Ret) ->
    lists:reverse([{K, V} | Ret]);
merge_field_value([K1,K2 | T1], [V1, V2|T2], Ret) ->
    merge_field_value(T1, T2, [{K2, V2},{K1, V1} |Ret]).
