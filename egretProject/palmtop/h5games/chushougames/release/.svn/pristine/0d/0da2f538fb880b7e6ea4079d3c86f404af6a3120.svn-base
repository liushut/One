%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 21. 四月 2018 10:18
%%%-------------------------------------------------------------------

-ifndef(__MYSQL_ETS__).
-define(__MYSQL_ETS__, true).

-define(ETS_MYSQL_STATE, ets_mysql_state).
-record(ets_mysql_state, {
    pid,
    server,
    process_name,
    db_name,
    select = 0,
    update = 0,
    delete = 0,
    insert = 0,
    other = 0
}).

-endif.
