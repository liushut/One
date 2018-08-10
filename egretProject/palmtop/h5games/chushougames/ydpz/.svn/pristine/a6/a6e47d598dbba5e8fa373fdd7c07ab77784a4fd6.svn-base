-ifndef(__ETS_DEFINE_HRL__).
-define(__ETS_DEFINE_HRL__, true).

-define(ETS_SYSTEM_INFO,    ets_system_info).                       %% 系统配置信息
-define(ETS_MONITOR_PID,    ets_monitor_pid).                       %% 记录监控的PID
-define(ETS_PLAYER_ID,      ets_player_id).                         %% playerId表
-define(ETS_ROOM_ID,        ets_room_id).
-define(ETS_ROOM,           ets_room).
-define(ETS_PLAYER,         ets_player).
-define(ETS_CLIENT_STATE,   ets_client_state).
-define(ETS_BATTLE_STATE,    ets_battle_state).
-define(ETS_GATE_STATE,     ets_gate_state).

-record(ets_gate_state,{
    socket_pid = undefined,
    socket_type = undefined,
    socket_ip = ""
}).

-record(ets_battle_state,{
    battle_id = 0,
    room_id = 0,
    socket_pid = undefined,
    battle_pid = undefined,
    start_time
}).

-record(ets_client_state, {
    pid = undefined,
    player_id  = 0,
    player_pid,
    open_id = "",
    socket_ip,
    socket_port,
    socket_type = websocket,
    login_state = 0
}).

-record(ets_player, {
    id = 0,
    open_id = "",
    nickname = "",
    avatar_url = "",
    room_id = 0,
    login_time = 0,
    game_state = 0,
    socket_pid = undefined,
    pid = undefined,
    room_pid = undefined
}).

-record(ets_room, {
    id = 0,
    room_pid = undefined,
    match_id = "",
    game_state = 0,
    room_owner = 0
}).


-endif.
