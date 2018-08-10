-module(tool).
-include("common.hrl").

-export([
    ip/1,
    sort/1,
    for/3,
    f2s/1,
    to_atom/1,
    to_list/1,
    to_string/1,
    to_binary/1,
    to_integer/1,
    to_bool/1,
    to_tuple/1,
    get_type/2,
    is_string/1,
    io_format/2,
    ceil/1, floor/1,
    subatom/2,
    sleep/1,
    md5/1,
    list_to_hex/1,
    int_to_hex/1,
    hex/1,
    list_to_atom2/1,
    combine_lists/2,
    list_to_term/1,
    substr_utf8/2,
    substr_utf8/3,
    ip_str/1,
    remove_string_black/1,
    split_string_to_intlist/1,
    intlist_to_string/1,
    change_list_to_string/1,
    intlist_to_string_1/1,
    split_string_to_intlist/3,
    date_to_unix/1,
    unix_to_date/1,
    bool_to_int/1,
    record_fields_to_string/1,     %%将record的fields集合转化为string

    %%字符串与term相互转化
    term_to_string/1,
    string_to_term/1,

    %% 内存回收
    gc/0,
    is_ets_alive/1
]).

%% 转为unix时间戳
-define(UNIX_BASE_TICK, 62167132800 - 32 * 60 * 60).
-define(BOSS_MAP_LIST, [186101, 717001, 717002]).


%% 通过进程字典里特殊的东西来区分不同进程,阿叽叽叽叽叽
%% server_reader -> user_pid_list
%% user_clone -> user_pid_info
%% send_msg -> "user_id"

%% 语言包接口
%% Msg中的参数格式符后面加上#+参数位置，
%% 如：tool:io_format("~p#1, ~p#2~n", [Arg1, Arg2]),
%% 参数后面接数字时用#隔开
%% 如：io_lib:format("~p12345, ~p~n",[Arg1, Arg2]),
%% 写成：
%% tool:io_format("~p#1#12345, ~p#2~n", [Arg1, Arg2]),
io_format(LangRes,Para) when erlang:is_binary(Para)->
    io_format(LangRes,binary_to_list(Para));
io_format(LangRes,Para)->
    {NewLangRes, NewPara} = get_translate_format(LangRes,Para),
    io_lib:format(NewLangRes,NewPara).

get_translate_format(LangRes, Para) ->
    trans_format(LangRes, [], [], Para).

trans_format([$#, H1, H2, $#|T], NewT, NewP, Para) when H2 >= $0 andalso H2 =< $9->
    Pos = list_to_integer([H1, H2]),
    trans_format(T, NewT, [lists:nth(Pos, Para)|NewP], Para);
trans_format([$#, H1, $#|T], NewT, NewP, Para) ->
    Pos = list_to_integer([H1]),
    trans_format(T, NewT, [lists:nth(Pos, Para)|NewP], Para);
trans_format([$#, H1, H2|T], NewT, NewP, Para) when H2 >= $0 andalso H2 =< $9 ->
    Pos = list_to_integer([H1, H2]),
    trans_format(T, NewT, [lists:nth(Pos, Para)|NewP], Para);
trans_format([$#, H|T], NewT, NewP, Para) when H >= $0 andalso H =< $9 ->
    Pos = list_to_integer([H]),
    trans_format(T, NewT, [lists:nth(Pos, Para)|NewP], Para);
trans_format([H|T], NewT, NewP, Para) ->
    trans_format(T, [H|NewT], NewP, Para);
trans_format([], NewT, [], Para) ->
    {lists:reverse(NewT), Para};
trans_format([], NewT, NewP, _Para) ->
    {lists:reverse(NewT), lists:reverse(NewP)}.

%%find_record_field(Index, Record, Fields, ViewField) ->
%%    if length(Fields) < Index ->
%%        notfind;
%%    true ->
%%        Field = lists:nth(Index, Fields),
%%        if ViewField == Field ->
%%            element(Index + 1, Record);
%%        true ->
%%            find_record_field(Index + 1, Record, Fields, ViewField)
%%        end
%%    end.

%% @doc get IP address string from Socket
ip(Socket) ->
    {ok, {IP, _Port}} = inet:peername(Socket),
    {Ip0,Ip1,Ip2,Ip3} = IP,
    list_to_binary(integer_to_list(Ip0)++"."++integer_to_list(Ip1)++"."++integer_to_list(Ip2)++"."++integer_to_list(Ip3)).


%% @doc quick sort
sort([]) ->
    [];
sort([H|T]) ->
    sort([X||X<-T,X<H]) ++ [H] ++ sort([X||X<-T,X>=H]).

%% for
for(Max,Max,F)->[F(Max)];
for(I,Max,F)->[F(I)|for(I+1,Max,F)].


%% @doc convert float to string,  f2s(1.5678) -> 1.57
f2s(N) when is_integer(N) ->
    integer_to_list(N) ++ ".00";
f2s(F) when is_float(F) ->
    [A] = io_lib:format("~.2f", [F]),
    A.


%% @doc convert other type to atom
to_atom(Msg) when is_atom(Msg) ->
    Msg;
to_atom(Msg) when is_binary(Msg) ->
    tool:list_to_atom2(binary_to_list(Msg));
to_atom(Msg) when is_list(Msg) ->
    tool:list_to_atom2(Msg);
to_atom(_) ->
    throw(other_value).  %%list_to_atom("").

%% @doc convert other type to list
to_list(Msg) when is_list(Msg) ->
    Msg;
to_list(Msg) when is_atom(Msg) ->
    atom_to_list(Msg);
to_list(Msg) when is_binary(Msg) ->
    binary_to_list(Msg);
to_list(Msg) when is_integer(Msg) ->
    integer_to_list(Msg);
to_list(Msg) when is_float(Msg) ->
    f2s(Msg);
to_list(Msg) when is_tuple(Msg) ->
    tuple_to_list(Msg);
to_list(_) ->
    throw(other_value).

to_string(Msg) ->
    NewList = to_list(Msg),
    case NewList of
        [] ->
            "";
        String ->
            String
    end.

%% @doc convert other type to binary
to_binary(Msg) when is_binary(Msg) ->
    Msg;
to_binary(Msg) when is_atom(Msg) ->
    list_to_binary(atom_to_list(Msg));
    %%atom_to_binary(Msg, utf8);
to_binary(Msg) when is_list(Msg) ->
    list_to_binary(Msg);
to_binary(Msg) when is_integer(Msg) ->
    list_to_binary(integer_to_list(Msg));
to_binary(Msg) when is_float(Msg) ->
    list_to_binary(f2s(Msg));
to_binary(Msg) when is_tuple(Msg) ->
    list_to_binary(tuple_to_list(Msg));
to_binary(_Msg) ->
    throw(other_value).

%% @doc convert other type to float
%% to_float(Msg)->
%%  Msg2 = to_list(Msg),
%%  list_to_float(Msg2).

%% @doc convert other type to integer
-spec to_integer(Msg :: any()) -> integer().
to_integer(Msg) when is_integer(Msg) ->
    Msg;
to_integer(Msg) when is_binary(Msg) ->
    Msg2 = binary_to_list(Msg),
    list_to_integer(Msg2);
to_integer(Msg) when is_list(Msg) ->
    list_to_integer(Msg);
to_integer(Msg) when is_float(Msg) ->
    round(Msg);
to_integer(_Msg) ->
    throw(other_value).

to_bool(D) when is_integer(D) ->
    D =/= 0;
to_bool(D) when is_list(D) ->
    length(D) =/= 0;
to_bool(D) when is_binary(D) ->
    to_bool(binary_to_list(D));
to_bool(D) when is_boolean(D) ->
    D;
to_bool(_D) ->
    throw(other_value).

%% @doc convert other type to tuple
to_tuple(T) when is_tuple(T) -> T;
to_tuple(T) when is_list(T) ->
    list_to_tuple(T);
to_tuple(T) -> {T}.

%% @doc get data type {0=integer,1=list,2=atom,3=binary}
get_type(DataValue,DataType)->
    case DataType of
        0 ->
            DataValue2 = binary_to_list(DataValue),
            list_to_integer(DataValue2);
        1 ->
            binary_to_list(DataValue);
        2 ->
            DataValue2 = binary_to_list(DataValue),
            list_to_atom(DataValue2);
        3 ->
            DataValue
    end.

%% @spec is_string(List)-> yes|no|unicode
is_string([]) -> yes;
is_string(List) -> is_string(List, non_unicode).

is_string([C|Rest], non_unicode) when C >= 0, C =< 255 -> is_string(Rest, non_unicode);
is_string([C|Rest], _) when C =< 65000 -> is_string(Rest, unicode);
is_string([], non_unicode) -> yes;
is_string([], unicode) -> unicode;
is_string(_, _) -> no.

%% @doc 取整 大于X的最小整数
ceil(X) ->
    T = trunc(X),
    if
        X - T == 0 ->
            T;
        true ->
            if
                X > 0 ->
                    T + 1;
                true ->
                    T
            end
    end.


%% @doc 取整 小于X的最大整数
floor(X) ->
    T = trunc(X),
    if
        X - T == 0 ->
            T;
        true ->
            if
                X > 0 ->
                    T;
                true ->
                    T-1
            end
    end.
%% 4舍5入
%% round(X)

%% subatom
subatom(Atom,Len)->
    list_to_atom(lists:sublist(atom_to_list(Atom),Len)).

%% @doc 暂停多少毫秒
sleep(Msec) ->
    receive
        after Msec ->
            true
    end.

md5(S) ->
    Md5_bin =  erlang:md5(S),
    Md5_list = binary_to_list(Md5_bin),
    lists:flatten(list_to_hex(Md5_list)).

list_to_hex(L) ->
    lists:map(fun(X) -> int_to_hex(X) end, L).

int_to_hex(N) when N < 256 ->
    [hex(N div 16), hex(N rem 16)].
hex(N) when N < 10 ->
       $0+N;
hex(N) when N >= 10, N < 16 ->
    $a + (N-10).

list_to_atom2(List) when is_list(List) ->
    case catch(list_to_existing_atom(List)) of
        {'EXIT', _} -> erlang:list_to_atom(List);
        Atom when is_atom(Atom) -> Atom
    end.

combine_lists(L1, L2) ->
    Rtn =
    lists:foldl(
        fun(T, Acc) ->
            case lists:member(T, Acc) of
                true ->
                    Acc;
                false ->
                    [T|Acc]
            end
        end, lists:reverse(L1), L2),
    lists:reverse(Rtn).

list_to_term(String) ->
    {ok, T, _} = erl_scan:string(String++"."),
    case erl_parse:parse_term(T) of
        {ok, Term} ->
            Term;
        {error, Error} ->
            Error
    end.


substr_utf8(Utf8EncodedString, Length) ->
    substr_utf8(Utf8EncodedString, 1, Length).
substr_utf8(Utf8EncodedString, Start, Length) ->
    ByteLength = 2*Length,
    Ucs = xmerl_ucs:from_utf8(Utf8EncodedString),
    Utf16Bytes = xmerl_ucs:to_utf16be(Ucs),
    SubStringUtf16 = lists:sublist(Utf16Bytes, Start, ByteLength),
    Ucs1 = xmerl_ucs:from_utf16be(SubStringUtf16),
    xmerl_ucs:to_utf8(Ucs1).

ip_str(IP) ->
    case IP of
        {A, B, C, D} ->
            lists:concat([A, ".", B, ".", C, ".", D]);
        {A, B, C, D, E, F, G, H} ->
            lists:concat([A, ":", B, ":", C, ":", D, ":", E, ":", F, ":", G, ":", H]);
        Str when is_list(Str) ->
            Str;
        _ ->
            []
    end.

%%去掉字符串空格
remove_string_black(L) ->
    F = fun(S) ->
                if S == 32 -> [];
                   true -> S
                end
        end,
    Result = [F(lists:nth(I,L)) || I <- lists:seq(1,length(L))],
    lists:filter(fun(T) -> T =/= [] end,Result).

%% 根据"|"及","拆分字符串并返回整形列表
%% 例 "1,2,3|4,5|1" -> [{1,2,3},{4,5},{1}], "1" -> [{1}]
split_string_to_intlist(SL) ->
    if SL =:= undefined ->
            [];
        true ->
            split_string_to_intlist(SL, "|", ",")
    end.

split_string_to_intlist(SL, Split1, Split2) ->
    NewSplit1 = to_list(Split1),
    NewSplit2 = to_list(Split2),
    SList = string:tokens(to_list(SL), NewSplit1),
    F1 = fun(Y) ->
        {Y1, _} = string:to_integer(Y),
        Y1
    end,
    F = fun(X,L) ->
        case string:tokens(X, NewSplit2) of
            LL when is_list(LL) ->
                [list_to_tuple([F1(Y) || Y <- LL]) | L];
            _ ->
                L
        end
    end,
    lists:foldr(F,[],SList).

%% 列表转化为字符串类型 [{1,2},{3,4}]
intlist_to_string(List) ->
    F = fun({Type,Value}, [[_|Acce], String]) ->
           if
              erlang:length(Acce) =:= 0 ->
                 String1 = lists:concat([Type, ',', Value]),
                 String2 = string:concat(String, String1),
                 [Acce, String2];

              true ->
                 String1 = lists:concat([Type, ',', Value, '|']),
                 String2 = string:concat(String, String1),
                 [Acce, String2]
            end
        end,
    [_, FinalString] = lists:foldl(F, [List, ""], List),
    FinalString.

%% 列表转化为字符串类型 [{1,2,2},{3,4,5}]
intlist_to_string_1(List) ->
    F = fun({Type,Value,Setion}, [[_|Acce], String]) ->
           if
              erlang:length(Acce) =:= 0 ->
                 String1 = lists:concat([Type, ',', Value, ',', Setion]),
                 String2 = string:concat(String, String1),
                 [Acce, String2];

              true ->
                 String1 = lists:concat([Type, ',', Value, ',', Setion, '|']),
                 String2 = string:concat(String, String1),
                 [Acce, String2]
            end
        end,
    [_, FinalString] = lists:foldl(F, [List, ""], List),
    FinalString.

%% 列表转化为字符串类型 [1|2,3|4]
change_list_to_string(List) ->
    F = fun({Type,Value}, [[_|Acce], String]) ->
           if
              erlang:length(Acce) =:= 0 ->
                 String1 = lists:concat([Type, '|', Value]),
                 String2 = string:concat(String, String1),
                 [Acce, String2];

              true ->
                 String1 = lists:concat([Type, '|', Value, ',']),
                 String2 = string:concat(String, String1),
                 [Acce, String2]
            end
        end,
    [_, FinalString] = lists:foldl(F, [List, ""], List),
    FinalString.


%% 把时间转为unix时间
date_to_unix(Date) ->
    Dates = string:tokens(Date, "-"),
    {Year, Month, Day} = tool:to_tuple(Dates),
    IYear = to_integer(Year),
    IMonth = to_integer(Month),
    IDay = to_integer(Day),
    Tick = calendar:datetime_to_gregorian_seconds({{IYear, IMonth, IDay}, {0, 0, 0}}),
    UnixTick = Tick - ?UNIX_BASE_TICK,
    UnixTick.


%% unix时间转为日期
unix_to_date(Tick) ->
    %% 加上1970
    calendar:gregorian_seconds_to_datetime(Tick + 62167132800 + 32 * 60 * 60).

bool_to_int(BoolVal)    ->
    case BoolVal of
        true    ->
            1;
        false   ->
            0
    end.

record_fields_to_string(FieldList) ->
    F = fun(Field, FieldsString) ->
            FieldStr = atom_to_list(Field),
            FieldsString1 = string:concat(FieldsString, FieldStr),
            FieldsString2 = string:concat(FieldsString1, ","),
            FieldsString2
        end,
    NewFieldString = lists:foldl(F, "", FieldList),
    string:substr(NewFieldString, 1, string:len(NewFieldString) -1).


%%term转成字符串，用于保存到数据库
term_to_string(Term) ->
    binary_to_list(list_to_binary(io_lib:format("~w", [Term]))).

%%字符串转成term，用于从数据库读取
string_to_term(String) ->
    NewString =
    case is_binary(String) of
        true ->
            binary_to_list(String);
        false ->
            String
    end,
    case length(NewString) > 0 of
        true ->
            case erl_scan:string(NewString ++ ".") of
                {ok, Tokens, _} ->
                    case erl_parse:parse_term(Tokens) of
                        {ok, Term} ->
                            Term;
                        {error, _ErrorInfo} ->
                            undefined
                    end;
                _Error ->
                    undefined
            end;
        _ ->
            undefined
    end.

gc() ->
    F = fun(S) ->
        timer:sleep(500),
        erlang:garbage_collect(S)
    end,
    [F(X) || X <- erlang:processes()].

is_ets_alive(Ets) ->
    case ets:info(Ets) of
        undefined ->
            false;
        _ ->
            true
    end.