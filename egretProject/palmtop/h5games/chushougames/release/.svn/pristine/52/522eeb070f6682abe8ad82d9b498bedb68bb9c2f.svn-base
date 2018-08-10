-ifndef(__RECORD_HRL__).
-define(__RECORD_HRL__, true).

-record(room_player,{
    player_id = 0,
    player_pid = undefined,
    socket_pid = undefined,
    open_id = "",
    nickname = "",
    avatar_url = "",
    gender = 0,
    game_state = 0,
    play_count = 0,
    score = 0
}).

-record(result_player, {
    player_id = 0,
    open_id = "",
    score = 0,
    result = 0,
    group,
    group_name
}).

-record(player_other, {
    socket_pid = undefined,
    pid = undefined,
    room_pid = undefined
}).

-endif.