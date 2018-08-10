%%%--------------------------------------
%%% @Module  : table_to_record
%%% @Created : 2018.05.1
%%% @Description: 将mysql数据表 转换成 erl record
%%%         生成文件： "../include/table_to_record.hrl"
%%%--------------------------------------
-module(table_record).

%%
%% Include files
%%

-define(RECORD_FILENAME, "./include/table_record.hrl").

-define(SERVER_APPS, [sasl, os_mon, kernel, stdlib, asn1, crypto, public_key, inets, ssl, mysql]).

-define(TABLES, [
    {game_player, ets_player},
    {game_rank, ets_game_rank},
    {game_player_id, ets_player_id},
    {game_orders, ets_game_orders},

    {log_statistics, ets_log_statistics},
    {log_room_data, ets_log_room_data}
]).

%%
%% Exported Functions
%%
-compile(export_all).

%%
%% API Functions
%%
start() ->
    try

        start_applications(?SERVER_APPS),
        get_db_config(),
        tables_to_record()
    catch
        _:Reason ->
            io:format("Reason:~p~n~p~n", [Reason, erlang:get_stacktrace()]),
            error
    end,
    halt(),
    ok.

get_db_config() ->
    {ok, EnvList} = application:get_env(mysql, game),
    FilterFunc = fun(EnvItem) ->
        case EnvItem of
            {db, _} -> true;
            _ -> false
        end
                 end,
    [{_, DB_Name} | _] = lists:filter(FilterFunc, EnvList),
    put(db_name, DB_Name).


get_db_server() ->
    game.

get_db_name() ->
    get(db_name).

%%############辅助调用函数##############
manage_applications(Iterate, Do, Undo, SkipError, ErrorTag, Apps) ->
    Iterate(fun(App, Acc) ->
        case Do(App) of
            ok -> [App | Acc];%合拢
            {error, {SkipError, _}} -> Acc;
            {error, Reason} ->
                io:format("Reason:~p~n", [Reason]),
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

tables_to_record() ->
    file:write_file(?RECORD_FILENAME, ""),
    file:write_file(?RECORD_FILENAME, "%%%------------------------------------------------\t\n", [append]),
    file:write_file(?RECORD_FILENAME, "%%% File    : table_record.erl\t\n", [append]),
    file:write_file(?RECORD_FILENAME, "%%% Description: 从mysql表生成的record \t\n", [append]),
    file:write_file(?RECORD_FILENAME, "%%% Warning:  由程序自动生成，请不要随意修改！\t\n", [append]),
    file:write_file(?RECORD_FILENAME, "%%%------------------------------------------------  \t\n", [append]),
    file:write_file(?RECORD_FILENAME, "-ifndef(__TABLE_RECORD_HRL__).   \t\n", [append]),
    file:write_file(?RECORD_FILENAME, "-define(__TABLE_RECORD_HRL__, true). \t\n", [append]),
    file:write_file(?RECORD_FILENAME, " \t\n", [append]),

    io:format("~n~n"),

    lists:foreach(fun(Table) ->
        case Table of
            {Table_name, Record_name} -> table_to_record(Table_name, Record_name, "");
            {Table_name, Record_name, TableComment} -> table_to_record(Table_name, Record_name, TableComment);
            _ -> no_action
        end
                  end,
        ?TABLES),

    file:write_file(?RECORD_FILENAME, "\n", [append]),
    file:write_file(?RECORD_FILENAME, "-endif.\t\n", [append]),

    io:format("finished!~n~n"),
    ok.

retrieve_tabel_field(Table_name) ->
    GetFieldsSql = io_lib:format(
        "SELECT `column_name`,`data_type`,`column_default`,`column_comment` FROM `information_schema`.`COLUMNS`
        WHERE `table_name`='~s' AND `table_schema` = '~s'",
        [Table_name, get_db_name()]
    ),
    db_mysqlutil:get_all({GetFieldsSql, get_db_server()}).

gen_record_content(Table_name, Record_name) ->
    file:write_file(?RECORD_FILENAME,
        list_to_binary(io_lib:format("%% ~s ==> ~s \t\n", [Table_name, Record_name])),
        [append]),
    file:write_file(?RECORD_FILENAME,
        list_to_binary(io_lib:format("-record(~s, {\n", [Record_name])),
        [append]),
    TableField = retrieve_tabel_field(Table_name),
    %%io:format("table fields ~p~n", [TableField]),
    GenerateFunc =
        fun([Name, Type, Default, Description], Sum) ->
            Point =
                if Sum == length(TableField) ->
                    '';
                    true -> ','
                end,
            %%io:format("~s\t\t\t~s\t\t~s\t~s~n", [Table_name, Record_name, Type, Default]),
            DefaultVal =
                case Default of
                    undefined ->
                        '';
                    null ->
                        case get_erl_type(string_to_term(Type)) of
                            binary ->
                                lists:concat([" = \"\""]);
                            integer ->
                                lists:concat([" = 0"]);
                            _ ->
                                ''
                        end;
                    <<>> ->
                        case get_erl_type(string_to_term(Type)) of
                            binary ->
                                lists:concat([" = \"\""]);
                            integer ->
                                lists:concat([" = 0"]);
                            _ ->
                                ''
                        end;
                    <<"[]">> ->
                        lists:concat([" = ", binary_to_list(Default)]);
                    Val ->
                        case get_erl_type(string_to_term(Type)) of
                            binary ->
                                lists:concat([" = <<\"", binary_to_list(Val), "\">>"]);
                            _ ->
                                lists:concat([" = ", binary_to_list(Val)])
                        end
                end,
            Comment = io_lib:format("~s~s~s", [Name, DefaultVal, Point]),
            Space = lists:duplicate(50 - length(lists:flatten(Comment)), " "),
            Bytes = list_to_binary(io_lib:format("    ~s~s%%~s\t\n", [Comment, Space, Description])),
            file:write_file(?RECORD_FILENAME, Bytes, [append]),
            {[], Sum + 1}
        end,
    lists:mapfoldl(GenerateFunc, 1, TableField),
    file:write_file(?RECORD_FILENAME,
        list_to_binary(io_lib:format("}).\t\n", [])),
        [append]).

table_to_record(Table_name, Record_name, _TableComment) ->
    io:format("    ~p => ~p~n", [Table_name, Record_name]),
    gen_record_content(Table_name, Record_name),
    file:write_file(?RECORD_FILENAME, list_to_binary(io_lib:format("\n", [])), [append]).

%% time format
one_to_two(One) -> io_lib:format("~2..0B", [One]).

%% @doc get the time's seconds for integer type
%% @spec get_seconds(Time) -> integer()
get_seconds(Time) ->
    {_MegaSecs, Secs, _MicroSecs} = Time,
    Secs.

time_format(Now) ->
    {{Y, M, D}, {H, MM, S}} = calendar:now_to_local_time(Now),
    lists:concat([Y, "-", one_to_two(M), "-", one_to_two(D), " ",
        one_to_two(H), ":", one_to_two(MM), ":", one_to_two(S)]).
date_format(Now) ->
    {{Y, M, D}, {_H, _MM, _S}} = calendar:now_to_local_time(Now),
    lists:concat([Y, "-", one_to_two(M), "-", one_to_two(D)]).
date_hour_format(Now) ->
    {{Y, M, D}, {H, _MM, _S}} = calendar:now_to_local_time(Now),
    lists:concat([Y, "-", one_to_two(M), "-", one_to_two(D), " ", one_to_two(H)]).
date_hour_minute_format(Now) ->
    {{Y, M, D}, {H, MM, _S}} = calendar:now_to_local_time(Now),
    lists:concat([Y, "-", one_to_two(M), "-", one_to_two(D), " ", one_to_two(H), "-", one_to_two(MM)]).
%% split by -
minute_second_format(Now) ->
    {{_Y, _M, _D}, {H, MM, _S}} = calendar:now_to_local_time(Now),
    lists:concat([one_to_two(H), "-", one_to_two(MM)]).

hour_minute_second_format(Now) ->
    {{_Y, _M, _D}, {H, MM, S}} = calendar:now_to_local_time(Now),
    lists:concat([one_to_two(H), ":", one_to_two(MM), ":", one_to_two(S)]).

get_erl_type({Type, _Len}) -> get_erl_type(Type);
get_erl_type(Type) ->
    case Type of
        varchar -> binary;
        char -> binary;
        'character varying' -> binary;
        binary -> binary;
        varbinary -> binary;
        blob -> binary;
        text -> binary;
        enum -> binary;
        set -> binary;
        tinyint -> integer;
        smallint -> integer;
        mediumint -> integer;
        int -> integer;
        bigint -> integer;
        bit -> integer;
        float -> float;
        double -> float;
        numeric -> float;
        datetime -> datetime;
        date -> date;
        timestamp -> datetime;
        'timestamp without time zone' -> datetime;
        time -> time;
        year -> integer;
        Other -> Other
    end.

get_tables() -> ?TABLES.


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
