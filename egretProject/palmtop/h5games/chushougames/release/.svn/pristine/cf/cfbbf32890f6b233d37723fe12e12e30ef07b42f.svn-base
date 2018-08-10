-ifndef(__PRINTER_DEFINE_H__).
-define(__PRINTER_DEFINE_H__, true).

-define(PRINT_MSG(), ?PRINT_MSG("")).
-define(PRINT_MSG(__Format), ?PRINT_MSG(__Format, [])).
-define(PRINT_MSG(__Format, __Args), level_printer:test_msg(?MODULE, ?LINE, __Format, __Args)).

-define(DEBUG_MSG(), ?DEBUG_MSG("")).
-define(DEBUG_MSG(__Format), ?DEBUG_MSG(__Format, [])).
-define(DEBUG_MSG(__Format, __Args), level_printer:debug_msg(?MODULE, ?LINE, __Format, __Args)).

-define(INFO_MSG(), ?INFO_MSG("")).
-define(INFO_MSG(__Format), ?INFO_MSG(__Format, [])).
-define(INFO_MSG(__Format, __Args), level_printer:info_msg(?MODULE, ?LINE, __Format, __Args)).

-define(WARNING_MSG(), ?WARNING_MSG("")).
-define(WARNING_MSG(__Format), ?WARNING_MSG(__Format, [])).
-define(WARNING_MSG(__Format, __Args), level_printer:warning_msg(?MODULE, ?LINE, __Format, __Args)).

-define(ERROR_MSG(), ?ERROR_MSG("")).
-define(ERROR_MSG(__Format), ?ERROR_MSG(__Format, [])).
-define(ERROR_MSG(__Format, __Args), level_printer:error_msg(?MODULE, ?LINE, __Format, __Args)).

-define(ERROR_MSG_TRACE(), ?ERROR_MSG("stack = ~p", [erlang:get_stacktrace()])).
-define(ERROR_MSG_TRACE(__Format), ?ERROR_MSG(__Format), ?ERROR_MSG("stack = ~p", [erlang:get_stacktrace()])).
-define(ERROR_MSG_TRACE(__Format, __Args), ?ERROR_MSG(__Format, __Args), ?ERROR_MSG("stack = ~p", [erlang:get_stacktrace()])).

-define(CRITICAL_MSG(), ?CRITICAL_MSG("")).
-define(CRITICAL_MSG(__Format), ?CRITICAL_MSG(__Format, [])).
-define(CRITICAL_MSG(__Format, __Args), level_printer:critical_msg(?MODULE, ?LINE, __Format, __Args)).

-define(STACK_TRACE(), try throw(trace_mark) catch _:_ -> ?ERROR_MSG("stack = ~p", [erlang:get_stacktrace()]) end).

-endif.
