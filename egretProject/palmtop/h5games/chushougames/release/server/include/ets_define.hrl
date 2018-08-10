-ifndef(__ETS_DEFINE_HRL__).
-define(__ETS_DEFINE_HRL__, true).

-define(ETS_SYSTEM_INFO, ets_system_info).                       %% 系统配置信息
-define(ETS_MONITOR_PID, ets_monitor_pid).                       %% 记录监控的PID
-define(ETS_PLAYER_ID, ets_player_id).                         %% playerId表
-define(ETS_ROOM_ID, ets_room_id).
-define(ETS_ROOM, ets_room).
-define(ETS_PLAYER, ets_player).
-define(ETS_SOCKET_STATE, ets_socket_state).
-define(ETS_STATISTICS, ets_statistics).
-define(ETS_GAME_RANK, ets_game_rank).
-define(ETS_PLAYER_TOP_RANK, ets_player_top_rank).
-define(ETS_TOP_RANK_SCORE, ets_top_rank_score).
-define(ETS_TOP_RANK, ets_top_rank).
-define(ETS_RANK_SEGMENT, ets_rank_segment).

-record(ets_socket_state, {
    pid = undefined,
    player_id  = 0,
    player_pid,
    open_id = "",
    socket_ip,
    socket_port,
    socket,
    socket_type = websocket,
    login_time = 0,
    login_state = 0
}).

-record(ets_room, {
    room_id = 0,
    pid = undefined,
    match_id = "",
    match_token = "",
    room_game_state = 0,
    room_owner = 0,
    start_time = 0,
    end_time = 0,
    round = 1
}).

-record(ets_rank_segment,  {
    score = 0,
    player_count = 0,
    begin_rank = 0
}).

-record(ets_top_rank, {
    rank = 0,
    open_id = 0,
    player_id = 0,
    score = 0
}).

-record(ets_top_rank_score, {
    score = 0,
    player_count = 0
}).

-endif.
