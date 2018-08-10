%%%----------------------------------------------------------------------
%%% File    : print_level.erl
%%% Created : 2018-03-09
%%%----------------------------------------------------------------------
-module(print_level).

-export([set/1, get/0]).

%% Error levels:
-define(LOG_PRINT_LEVELS,[ {0, no_log, "No log"}
                    ,{1, critical, "Critical"}
                    ,{2, error, "Error"}
                    ,{3, warning, "Warning"}
                    ,{4, info, "Info"}
                    ,{5, debug, "Debug"}
					,{6, test, "Test"}
                    ]).

get() ->
    Level = level_printer:get(),
    case lists:keysearch(Level, 1, ?LOG_PRINT_LEVELS) of
        {value, Result} -> Result;
        _ -> erlang:error({no_such_print_level, Level})
    end.

set(PrintLevel) when is_atom(PrintLevel) ->
    set(level_to_integer(PrintLevel));
set(PrintLevel) when is_integer(PrintLevel) ->
    try
        {Mod,Code} = dynamic_compile:from_string(file_src(PrintLevel)),
        code:load_binary(Mod, "level_printer.erl", Code)
    catch
        _Type:Error -> {false, Error}
    end;
set(PrintLevel) when is_list(PrintLevel) ->
    set(list_to_integer(PrintLevel));
set(_) ->
    exit("level must be an integer").

level_to_integer(Level) ->
    case lists:keysearch(Level, 2, ?LOG_PRINT_LEVELS) of
        {value, {Int, Level, _Desc}} -> Int;
        _ -> erlang:error({no_such_print_level, Level})
    end.
%% --------------------------------------------------------------
%% Code of the mcs level_printer, dynamically compiled and loaded
%% This allows to dynamically change log level while keeping a
%% very efficient code.
file_src(PrintLevel) ->
    L = integer_to_list(PrintLevel),
    "-module(level_printer).

    -export([test_msg/4,
			 debug_msg/4,
             info_msg/4,
             warning_msg/4,
             error_msg/4,
             critical_msg/4,
             get/0]).

    get() -> "++ L ++".

    test_msg(Module, Line, Format, Args) when " ++ L ++ " >= 6 ->
        notify(print,
            \"T(~p:~p:~p:) : ~n \"++Format++\"~n\",
            [self(), Module, Line]++Args);
    test_msg(_,_,_,_) -> ok.

    debug_msg(Module, Line, Format, Args) when " ++ L ++ " >= 5 ->
        notify(debug,
               \"D(~p:~p:~p:) : ~n \"++Format++\"~n\",
               [self(), Module, Line]++Args);
    debug_msg(_,_,_,_) -> ok.

    info_msg(Module, Line, Format, Args) when " ++ L ++ " >= 4 ->
        notify(print,
               \"I(~p:~p:~p:) : ~n \"++Format++\"~n\",
               [self(), Module, Line]++Args);
    info_msg(_,_,_,_) -> ok.

    warning_msg(Module, Line, Format, Args) when " ++ L ++ " >= 3 ->
            notify(warning,
                   \"W(~p:~p:~p:) : ~n \"++Format++\"~n\",
                   [self(), Module, Line]++Args);
    warning_msg(_,_,_,_) -> ok.

    error_msg(Module, Line, Format, Args) when " ++ L ++ " >= 2 ->
            notify(error,
                   \"E(~p:~p:~p:) : ~n \"++Format++\"~n\",
                   [self(), Module, Line]++Args);
    error_msg(_,_,_,_) -> ok.

    critical_msg(Module, Line, Format, Args) when " ++ L ++ " >= 1 ->
            notify(error,
                   \"C(~p:~p:~p:) : ~n \"++Format++\"~n\",
                   [self(), Module, Line]++Args);
    critical_msg(_,_,_,_) -> ok.

    notify(Type, Format, Args) ->
            LoggerMsg = {log, Type, self(), Format, Args},
            gen_event:notify(logger_event, LoggerMsg).
    ".
