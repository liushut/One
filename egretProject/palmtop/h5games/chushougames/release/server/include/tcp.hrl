-ifndef(TCP_HRL).
-define(TCP_HRL, true).
%%tcp_server监听参数
-define(TCP_OPTIONS, [binary, {packet, 0}, {active, false}, {buffer, 4380},
    {high_watermark, 16384}, {low_watermark, 8192},
    {reuseaddr, true}, {nodelay, false},
    {delay_send, true}, {send_timeout, 5000},
    {keepalive, true}, {exit_on_close, true}]).

-endif.
