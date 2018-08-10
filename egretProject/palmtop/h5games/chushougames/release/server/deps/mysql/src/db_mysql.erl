%%%--------------------------------------
%%% @Module  : db_mysql
%%% @Created : 2018.03.25
%%% @Description: mysql 数据库操作
%%%--------------------------------------
-module(db_mysql).

-define(BATCH_SELECT_COUNT, 1000).               %% 分批每次select的个数

-export([
    insert/4,
    insert/3,
    replace/3,
    update/4,
    update/6,
    select_one/4,
    select_row/4,
    select_row/6,
    select_all/4,
    select_all/6,
    batch_insert/4,
    batch_replace/4,
    batch_select_all/1,
    batch_select_all_2/8,
    batch_update/2,
    delete_all/2,
    delete/3
    ]).


%% 插入数据表
insert(Server, TableName, FieldList, ValueList) ->
    Sql = db_mysqlutil:make_insert_sql(TableName, FieldList, ValueList),
    db_mysqlutil:execute({Sql, Server}).

insert(Server, TableName, FieldValueList) ->
    Sql = db_mysqlutil:make_insert_sql(TableName, FieldValueList),
    db_mysqlutil:execute({Sql, Server}).

replace(Server, TableName, FieldValueList) ->
    Sql = db_mysqlutil:make_replace_sql(TableName, FieldValueList),
    db_mysqlutil:execute({Sql, Server}).

update(Server, TableName, Field, Data, Key, Value) ->
    Sql = db_mysqlutil:make_update_sql(TableName, Field, Data, Key, Value),
    db_mysqlutil:execute({Sql, Server}).

update(Server, TableName, FieldValueList, WhereList) ->
    Sql = db_mysqlutil:make_update_sql(TableName, FieldValueList, WhereList),
    db_mysqlutil:execute({Sql, Server}).

%% 获取一个数据字段
select_one(Server, TableName, FieldsSql, WhereList) ->
    Sql = db_mysqlutil:make_select_sql(TableName, FieldsSql, WhereList, [], 1),
    db_mysqlutil:get_one({Sql, Server}).

%% 获取一条数据记录
select_row(Server, TableName, FieldsSql, WhereList, OrderListg, LimitNum) ->
    Sql = db_mysqlutil:make_select_sql(TableName, FieldsSql, WhereList, OrderListg, LimitNum),
    db_mysqlutil:get_row({Sql, Server}).

select_row(Server, TableName, FieldsSql, WhereList) ->
    Sql = db_mysqlutil:make_select_sql(TableName, FieldsSql, WhereList),
    db_mysqlutil:get_row({Sql, Server}).

%% 获取所有数据
select_all(Server, TableName, FieldsSql, WhereList, OrderListg, LimitNum) ->
    Sql = db_mysqlutil:make_select_sql(TableName, FieldsSql, WhereList, OrderListg, LimitNum),
    db_mysqlutil:get_all({Sql, Server}).

select_all(Server, TableName, FieldsSql, WhereList) ->
    Sql = db_mysqlutil:make_select_sql(TableName, FieldsSql, WhereList),
    db_mysqlutil:get_all({Sql, Server}).

%% ====================================
%% 分批获取所有数据
%% ====================================
%% 带Server参数 (Server即?DB_GAME, ?DB_LOG...)
batch_select_all({_Server, [_TableName, _Fields, _WhereList, []]}) ->
    skip;
batch_select_all({Server, [TableName, Fields, WhereList, OrderList]}) ->
    batch_select_all({Server, [TableName, Fields, WhereList, OrderList, ?BATCH_SELECT_COUNT]});

batch_select_all({_Server, [_TableName, _Fields, _WhereList, [], _BatchCount]}) ->
    skip;
batch_select_all({Server, [TableName, Fields, WhereList, OrderList, BatchCount]}) when BatchCount > 0 ->
    batch_select_all_2(Server, TableName, Fields, WhereList, OrderList, BatchCount, 0, []);
batch_select_all({Server, [TableName, Fields, WhereList, OrderList, _BatchCount]}) ->
    batch_select_all_2(Server, TableName, Fields, WhereList, OrderList, ?BATCH_SELECT_COUNT, 0, []).

%%============
%%批量更新数据
%%============
batch_update(Server, Sql) ->
    db_mysqlutil:execute({Sql, Server}).

%%============
%%批量添加数据
%%============
batch_insert(Server, TableName, FieldList, ValueList)->
    Sql = db_mysqlutil:make_batch_insert_sql(TableName,FieldList,ValueList),
    db_mysqlutil:execute({Sql, Server}).

batch_replace(Server, TableName, FieldList, ValueLists)    ->
    Sql = db_mysqlutil:make_batch_replace_sql(TableName, FieldList, ValueLists),
    db_mysqlutil:execute({Sql, Server}).

%% 删除数据
delete_all(Server, TableName) ->
    Sql = db_mysqlutil:make_delete_sql(TableName, []),
    db_mysqlutil:execute({Sql, Server}).

delete(_Server, _TableName, WhereList) when WhereList == [] ->
    throw({delete_all_error, use_delete_all});
delete(Server, TableName, WhereList) ->
    Sql = db_mysqlutil:make_delete_sql(TableName, WhereList),
    db_mysqlutil:execute({Sql, Server}).

%% =======================================
%% batch_select_all 内部函数
%% =======================================
batch_select_all_2(Server, TableName, Fields, WhereList, OrderList, BatchCount, Start, Result) ->
    L = do_batch_select_2(Server, TableName, Fields, WhereList, OrderList,
        [Start, BatchCount]),
    case length(L) < BatchCount of
        true ->
            case length(Result) of
                0 ->
                    L;
                _ ->
                    lists:reverse(lists:reverse(L) ++ Result)
            end;
        _ ->
            batch_select_all_2(Server, TableName, Fields, WhereList, OrderList,
                BatchCount, Start + BatchCount, lists:reverse(L) ++ Result)
    end.

%% 实际去取数据
do_batch_select_2(Server, TableName, Fields, WhereList, OrderList, [Start, Limit]) ->
    select_all(Server, TableName, Fields, WhereList, OrderList, [Start, Limit]).
