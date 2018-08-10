%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 23. 四月 2018 11:01
%%%-------------------------------------------------------------------
-module(db_game).

%% API
-export([
    select_one/3,
    select_row/3,
    select_all/3,
    insert/2,
    insert/3,
    replace/2,
    update/3,
    update/5,
    delete/2,
    delete_all/1
]).

-define(DB_SERVER, game).

select_one(TableName, FieldsSql, WhereList) ->
    db_mysql:select_one(?DB_SERVER, TableName, FieldsSql, WhereList).

select_row(TableName, FieldsSql, WhereList) ->
    db_mysql:select_row(?DB_SERVER, TableName, FieldsSql, WhereList).

select_all(TableName, FieldsSql, WhereList) ->
    db_mysql:select_all(?DB_SERVER, TableName, FieldsSql, WhereList).

insert(TableName, FieldValueList) ->
    db_mysql:insert(?DB_SERVER, TableName, FieldValueList).

insert(TableName, FieldList, ValueList) ->
    db_mysql:insert(?DB_SERVER, TableName, FieldList, ValueList).

replace(TableName, FieldValueList) ->
    db_mysql:replace(?DB_SERVER, TableName, FieldValueList).

update(TableName, Field, Data, Key, Value) ->
    db_mysql:update(?DB_SERVER, TableName, Field, Data, Key, Value).

update(TableName, FieldValueList, WhereList) ->
    db_mysql:update(?DB_SERVER, TableName, FieldValueList, WhereList).

delete_all(TableName) ->
    db_mysql:delete_all(?DB_SERVER, TableName).

delete(TableName, WhereList) ->
    db_mysql:delete(?DB_SERVER, TableName, WhereList).
