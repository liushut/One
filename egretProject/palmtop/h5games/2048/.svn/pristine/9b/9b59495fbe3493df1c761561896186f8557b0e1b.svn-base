-ifndef(__RECORD_HRL__).
-define(__RECORD_HRL__, true).

-record(room_state, {
    room_id = undefined,
    room_player_list = [],
    ready_state = []
}).

-record(room_player,{
    player_id = 0,
    player_pid = undefined,
    socket_pid = undefined,
    open_id = "",
    nickname = "",
    avatar_url = "",
    game_state = 0,
    score = 0
}).

-record(ali_battle_player, {
    player_id = 0,
    battle_id = "",
    battle_pid = undefined,
    open_id = "",
    nickname = "",
    avatar_url = "",
    group_id = "",
    gender = 1,
    is_robot = false,
    game_state = 0,
    score = 0,
    level = 0,
    score2 = 0,
    last_result_data = <<>>,
    battle_times = 1,
    robot_level = 0
}).

-endif.