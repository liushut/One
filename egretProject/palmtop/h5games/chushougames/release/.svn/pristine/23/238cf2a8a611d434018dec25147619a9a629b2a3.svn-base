%%%--------------------------------------
%%% @Module  : db_mysqlutil
%%% @Created : 2018.03.25
%%% @Description: MYSQL数据库操作
%%%--------------------------------------
-module(db_mysqlutil).
-include("mysql_ets.hrl").
-compile([export_all]).


-define(LONG_TIME, 30 * 1000).    %%超长超时时间，暂定为30s
-define(SQL_MODULE, hymysql).

%% 执行一个SQL查询,返回影响的行数
get_conn(Server) ->
    case ets:match_object(?ETS_MYSQL_STATE, #ets_mysql_state{_ = '_', server = Server}) of
        [Conn | _] ->
            Conn#ets_mysql_state.pid;
        _ ->
            undefined
    end.

execute(Sql) ->
    execute(Sql, ?LONG_TIME).

execute(Sql, Timeout) ->
    {NewSql, Server} =
        case Sql of
            {TSql, TServer} ->
                {iolist_to_binary(TSql), TServer};
            _ ->
                {iolist_to_binary(Sql), '_'}
        end,
    ConnPid = get_conn(Server),
    case mysql:query(ConnPid, NewSql, Timeout) of
        ok ->
            ok;
        {ok, _ColumnNames, Rows} ->
            Rows;
        {ok, Results} ->
            Results;
        Error ->
            Error
    end.

%% 执行分页查询返回结果中的所有行
select_limit(Sql, Server, Offset, Num) ->
    S = list_to_binary([Sql, <<" limit ">>, integer_to_list(Offset), <<", ">>, integer_to_list(Num)]),
    execute(S, Server).

%% 取出查询结果中的第一行第一列
%% 未找到时返回null
get_one(Sql) ->
    case execute(Sql) of
        [Rows | _] ->
            Rows;
        [] ->
            [];
        Error ->
            Error
    end.

%% 取出查询结果中的第一行
get_row(Sql) ->
    execute(Sql).

get_row_timeout(Sql, Server) ->
    get_row_timeout(Sql, Server, ?LONG_TIME).
get_row_timeout(Sql, Server, Timeout) ->
    execute({Sql, Server}, Timeout).

%% @doc 取出查询结果中的所有行
get_all(Sql) ->
    execute(Sql).

get_all_timeout(Sql) ->
    get_all_timeout(Sql, ?LONG_TIME).
get_all_timeout(Sql, Timeout) ->
    execute(Sql, Timeout).


%%get_all(Sql, Args) ->
%%get_all(?DEFAULT_DB, Sql, Args).
%%
%%get_all(_Server, Sql, Args) when is_atom(Sql) ->
%%case mysql:execute(?DB_POOL, Sql, Args) of
%%{data, {_, _, R, _, _}} -> R;
%%{error, {_, _, _, _, Reason}} -> mysql_halt([Sql, Reason])
%%end;
%%get_all(Server, Sql, Args) ->
%%mysql:prepare(Server, s, Sql),
%%case mysql:execute(?DB_POOL, s, Args) of
%%{data, {_, _, R, _, _}} -> R;
%%{error, {_, _, _, _, Reason}} -> mysql_halt([Sql, Reason])
%%end.

%% @doc 显示人可以看得懂的错误信息
mysql_halt([Sql, Reason]) ->
    catch erlang:error({db_error, [Sql, Reason]}).

%%组合mysql insert语句
%% 使用方式db_mysqlutil:make_insert_sql(test,["row","r"],["测试",123]) 相当 insert into `test` (row,r) values('测试','123')
%%Table:表名
%%Field：字段
%%Data:数据
make_insert_sql(TableName, FieldList, ValueList) ->
    L = make_conn_sql(FieldList, ValueList, []),
    lists:concat(["insert into `", TableName, "` set ", L]).
%% 类似insert  into `t_users_8_immortals`(`user_id`,`career`,`next_stage`,`heaven_boss_info`,`max_stage`,`reach_max_stamp`,`heaven_award_fetched`,`other_data`) values (1449629257472,2,10,'[[{7,5}],[{2,5}],[{8,5}],[{1,5}],[{3,5}],[{6,5}],[{4,5}],[{5,5}]]',0,0,'[]',''),(1449629694464,2,10,'[[{7,5}],[{2,5}],[{8,5}],[{1,5}],[{3,5}],[{6,5}],[{4,5}],[{5,5}]]',0,0,'[]','')...
make_batch_insert_sql(TableName, FieldList, ValueList) ->
    FL = make_batch_sql_fields(FieldList),
    VL = make_batch_sql_values(ValueList),
    lists:concat(["insert into `", TableName, "`(", FL, ") values ", VL]).

make_batch_sql_fields(FieldList) ->
    F = fun(Field, ResultIn) ->
        case ResultIn of
            "" ->
                lists:concat(["`", tool:to_list(Field), "`"]);
            _ ->
                lists:concat([ResultIn, ",`", tool:to_list(Field), "`"])
        end
        end,
    lists:foldl(F, "", FieldList).

make_batch_sql_values(ValueList) ->
    F1 = fun(ValueIn, Result1In) ->
        case Result1In of
            "" ->
                if is_binary(ValueIn) orelse is_list(ValueIn) ->
                    lists:concat(["'", get_sql_val(ValueIn), "'"]);
                    ValueIn =:= undefined ->
                        lists:concat(["''"]);
                    true ->
                        lists:concat([get_sql_val(ValueIn)])
                end;
            _ ->
                if is_binary(ValueIn) orelse is_list(ValueIn) ->
                    lists:concat([Result1In, ",'", get_sql_val(ValueIn), "'"]);
                    ValueIn =:= undefined ->
                        lists:concat([Result1In, ",''"]);
                    true ->
                        lists:concat([Result1In, ",", get_sql_val(ValueIn)])
                end
        end
         end,
    F2 = fun(ValueListItemIn, Result2In) ->
        ValueListItemStr = lists:foldl(F1, "", ValueListItemIn),
        case Result2In of
            "" ->
                lists:concat(["(", ValueListItemStr, ")"]);
            _ ->
                lists:concat([Result2In, ",(", ValueListItemStr, ")"])
        end
         end,
    lists:foldl(F2, "", ValueList).

make_sql_value_list(ValueList) ->
    F1 = fun(ValueIn) ->
        if is_binary(ValueIn) orelse is_list(ValueIn) ->
            lists:concat(["'", get_sql_val(ValueIn), "'"]);
            ValueIn =:= undefined ->
                lists:concat(["''"]);
            true ->
                lists:concat([get_sql_val(ValueIn)])
        end
         end,
    F = fun(ValueItem, ResultIn) ->
        ValueItemStr = F1(ValueItem),
        case ResultIn of
            "" ->
                lists:concat([ValueItemStr]);
            _ ->
                lists:concat([ResultIn, ",", ValueItemStr])
        end
        end,
    lists:foldl(F, "", ValueList).

%%组合mysql update语句
%% 使用方式db_mysqlutil:make_update_sql(test,["row","r"],["测试",123],"id",1) 相当 update `test` set row='测试', r = '123' where id = '1'
%%Table:表名
%%Field：字段
%%Data:数据
%%Key:键
%%Data:值
make_update_sql(TableName, Field, Data, Key, Value) ->
    L = make_conn_sql(Field, Data, []),
    lists:concat(["update `", TableName, "` set ", L, " where ", Key, "= '", tool:to_list(Value), "'"]).

make_conn_sql([], _, L) ->
    L;
make_conn_sql(_, [], L) ->
    L;
make_conn_sql([F | T1], [D | T2], []) ->
%%  F1 = tool:to_list(F),
%%  if
%%      F1 == "other" ->
%%          make_conn_sql(T1, T2, []);
%%      true ->
%%          L  = ["`", F1, "`='",get_sql_val(D),"'"],
%%          make_conn_sql(T1, T2, L)
%%  end;
    L = ["`", tool:to_list(F), "`='", get_sql_val(D), "'"],
    make_conn_sql(T1, T2, L);
make_conn_sql([F | T1], [D | T2], L) ->
%%  F1 = tool:to_list(F),
%%  if
%%      F1 == "other" ->
%%          make_conn_sql(T1, T2, L);
%%      true ->
%%               L1  = L ++ [",`", tool:to_list(F),"`='",get_sql_val(D),"'"],
%%             make_conn_sql(T1, T2, L1)
%%  end.
    L1 = L ++ [",`", tool:to_list(F), "`='", get_sql_val(D), "'"],
    make_conn_sql(T1, T2, L1).

get_sql_val(Val) ->
    case is_binary(Val) orelse is_list(Val) of
        true -> re:replace(tool:to_list(Val), "'", "''", [global, {return, list}]);
        _ -> tool:to_list(Val)
    end.

make_insert_sql(TableName, FieldValueList) ->
%%  db_mysqlutil:make_insert_sql(user,
%%                         [{status, 0}, {online_flag,1}, {hp,50}, {mp,30}]).
    {Vsql, _Count1} =
        lists:mapfoldl(
            fun(FieldValue, Sum) ->
                Expr = case FieldValue of
                           {Field, Val} ->
                               case is_binary(Val) orelse is_list(Val) of
                                   true ->
                                       io_lib:format("`~s`='~s'", [Field, re:replace(Val, "'", "''", [global, {return, binary}])]);
                                   _ -> io_lib:format("`~s`='~p'", [Field, Val])
                               end
                       end,
                S1 = if Sum == length(FieldValueList) -> io_lib:format("~s ", [Expr]);
                         true -> io_lib:format("~s,", [Expr])
                     end,
                {S1, Sum + 1}
            end,
            1, FieldValueList),
    lists:concat(["insert into `", TableName, "` set ",
        lists:flatten(Vsql)
    ]).

make_replace_sql(TableName, FieldValueList) ->
%%  db_mysqlutil:make_replace_sql(user,
%%                         [{status, 0}, {online_flag,1}, {hp,50}, {mp,30}]).
    {Vsql, _Count1} =
        lists:mapfoldl(
            fun(FieldValue, Sum) ->
                Expr = case FieldValue of
                           {Field, Val} ->
                               case is_binary(Val) orelse is_list(Val) of
                                   true ->
                                       io_lib:format("`~s`='~s'", [Field, re:replace(Val, "'", "''", [global, {return, binary}])]);
                                   _ ->
                                       io_lib:format("`~s`=~p", [Field, Val])
                               end
                       end,
                S1 = if Sum == length(FieldValueList) -> io_lib:format("~s ", [Expr]);
                         true -> io_lib:format("~s,", [Expr])
                     end,
                {S1, Sum + 1}
            end,
            1, FieldValueList),
    lists:concat(["replace into `", TableName, "` set ",
        lists:flatten(Vsql)
    ]).

make_batch_replace_sql(TableName, FieldList, ValueList) ->
    FL = make_batch_sql_fields(FieldList),
    VL = make_batch_sql_values(ValueList),
    lists:concat(["replace into `", TableName, "`(", FL, ") values ", VL]).

make_update_sql(TableName, FieldValueList, WhereList) ->
%%  db_mysqlutil:make_update_sql(user,
%%                         [{status, 0}, {online_flag,1}, {hp,50, add}, {mp,30,sub}],
%%                         [{id, 11}]).
    {Vsql, _Count1} =
        lists:mapfoldl(
            fun(FieldValue, Sum) ->
                Expr = case FieldValue of
                           {Field, Val, add} -> io_lib:format("`~s`=`~s`+~p", [Field, Field, Val]);
                           {Field, Val, sub} -> io_lib:format("`~s`=`~s`-~p", [Field, Field, Val]);
                           {Field, Val} ->
                               case is_binary(Val) orelse is_list(Val) of
                                   true ->
                                       io_lib:format("`~s`='~s'", [Field, re:replace(Val, "'", "''", [global, {return, binary}])]);
                                   _ -> io_lib:format("`~s`='~p'", [Field, Val])
                               end
                       end,
                S1 = if Sum == length(FieldValueList) -> io_lib:format("~s ", [Expr]);
                         true -> io_lib:format("~s,", [Expr])
                     end,
                {S1, Sum + 1}
            end,
            1, FieldValueList),
    {Wsql, Count2} = get_where_sql(WhereList),
    WhereSql =
        if Count2 > 1 -> lists:concat(["where ", lists:flatten(Wsql)]);
            true -> ""
        end,
    lists:concat(["update `", TableName, "` set ",
        lists:flatten(Vsql), WhereSql, ""
    ]).

make_delete_sql(TableName, WhereList) ->
%% db_mysqlutil:make_delete_sql(user, [{id, "=", 11, "and"},{status, 0}]).
    {Wsql, Count2} = get_where_sql(WhereList),
    WhereSql =
        if Count2 > 1 -> lists:concat(["where ", lists:flatten(Wsql)]);
            true -> ""
        end,
    lists:concat(["delete from `", TableName, "` ", WhereSql, ""]).

make_select_sql(TableName, FieldsSql, WhereList) ->
    make_select_sql(TableName, FieldsSql, WhereList, [], []).

make_select_sql(TableName, FieldsSql, WhereList, OrderList, LimitNum) ->
%% db_mysqlutil:make_select_sql(user, "*", [{status, 1}], [{id,desc},{status}],[]).
%% db_mysqlutil:make_select_sql(user, "id, status", [{id, 11}], [{id,desc},{status}],[]).
    {Wsql, Count1} = get_where_sql(WhereList),
    WhereSql =
        if Count1 > 1 -> lists:concat(["where ", lists:flatten(Wsql)]);
            true -> ""
        end,
    {Osql, Count2} = get_order_sql(OrderList),
    OrderSql =
        if Count2 > 1 -> lists:concat(["order by ", lists:flatten(Osql)]);
            true -> ""
        end,
    LimitSql =
        case LimitNum of
            Num when is_integer(LimitNum) ->
                lists:concat(["limit ", Num]);
            [] -> "";
            [Num] -> lists:concat(["limit ", Num]);
            [Start, Limit] -> lists:concat(["limit ", Start, ",", Limit])
        end,
    lists:concat(["select ", FieldsSql, " from `", TableName, "` ", WhereSql, OrderSql, LimitSql]).

get_order_sql(OrderList) ->
%%  排序用列表方式：[{id, desc},{status}]
    lists:mapfoldl(
        fun(FieldOrder, Sum) ->
            Expr =
                case FieldOrder of
                    {Field, Order} ->
                        io_lib:format("~p ~p", [Field, Order]);
                    {Field} ->
                        io_lib:format("~p", [Field]);
                    _ -> ""
                end,
            S1 = if Sum == length(OrderList) -> io_lib:format("~s ", [Expr]);
                     true -> io_lib:format("~s,", [Expr])
                 end,
            {S1, Sum + 1}
        end,
        1, OrderList).

get_where_sql(WhereList) ->
%%  条件用列表方式：[{},{},{}]
%%  每一个条件形式(一共三种)：
%%      1、{idA, "<>", 10, "or"}    <===> {字段名, 操作符, 值，下一个条件的连接符}
%%      2、{idB, ">", 20}           <===> {idB, ">", 20，"and"}
%%      3、{idB, 20}                <===> {idB, "=", 20，"and"}
%%      4、{idB, in, List}          <===> {idB, "in", 20，"and"}
    lists:mapfoldl(
        fun(Field_Operator_Val, Sum) ->
            [Expr, Or_And_1] =
                case Field_Operator_Val of
                    {Field, in, ValList} when ValList =/= [] ->
                        %% 批量查找
                        F_trans = fun(S) ->
                            case is_binary(S) orelse is_list(S) of
                                true ->
                                    io_lib:format("'~s'", [re:replace(S, "'", "''", [global, {return, binary}])]);
                                _ ->
                                    io_lib:format("'~p'", [S])
                            end
                                  end,
                        ValueString = case ValList of
                                          [Val] ->
                                              lists:concat(["(", F_trans(Val), ")"]);
                                          [HVal | TVal] ->
                                              lists:concat(["(", F_trans(HVal),
                                                  lists:concat(["," ++ F_trans(X) || X <- TVal]),
                                                  ")"])
                                      end,
                        [lists:concat([
                            io_lib:format("`~s` in ", [Field]),
                            ValueString]), "and"];

                    {Field, Operator, Val, Or_And} ->
                        case is_binary(Val) orelse is_list(Val) of
                            true ->
                                [io_lib:format("`~s`~s'~s'", [Field, Operator, re:replace(Val, "'", "''", [global, {return, binary}])]), Or_And];
                            _ -> [io_lib:format("`~s`~s'~p'", [Field, Operator, Val]), Or_And]
                        end;
                    {Field, Operator, Val} ->
                        case is_binary(Val) orelse is_list(Val) of
                            true ->
                                [io_lib:format("`~s`~s'~s'", [Field, Operator, re:replace(Val, "'", "''", [global, {return, binary}])]), "and"];
                            _ -> [io_lib:format("`~s`~s'~p'", [Field, Operator, Val]), "and"]
                        end;
                    {Field, Val} ->
                        case is_binary(Val) orelse is_list(Val) of
                            true ->
                                [io_lib:format("`~s`='~s'", [Field, re:replace(Val, "'", "''", [global, {return, binary}])]), "and"];
                            _ -> [io_lib:format("`~s`='~p'", [Field, Val]), "and"]
                        end;
                    _ -> ""
                end,
            S1 = if Sum == length(WhereList) -> io_lib:format("~s ", [Expr]);
                     true -> io_lib:format("~s ~s ", [Expr, Or_And_1])
                 end,
            {S1, Sum + 1}
        end,
        1, WhereList).

