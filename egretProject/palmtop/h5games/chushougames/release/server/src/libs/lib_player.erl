%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 26. 三月 2018 11:13
%%%-------------------------------------------------------------------
-module(lib_player).
-include("common.hrl").

%% API
-export([
    get_player_pid/1,
    enter_match_game/2,
    get_room_player/1,
    set_player_ready/1,
    check_player_ready/1,
    init_player/1,
    update_friends/1,
    get_friends/0
]).

-define(DIC_PLAYER_FRIENDS, dic_player_friends).

update_friends(OpenIds) ->
    put(?DIC_PLAYER_FRIENDS, OpenIds).

get_friends() ->
    case get(?DIC_PLAYER_FRIENDS) of
        List when is_list(List) ->
            List;
        _ ->
            []
    end.

init_player([PlayerId, OpenId, PlatformId, Nickname, Gender, AvatarUrl]) ->
    case db_player:get_player_info(PlayerId) of
        {ok, []} ->
            Date = util:unixtime(),
            Player = #ets_player{
                player_id = PlayerId,
                open_id = OpenId,
                platform_id = PlatformId,
                nickname = Nickname,
                gender = Gender,
                avatar_url = AvatarUrl,
                register_time = Date,
                last_login_time = Date
            },
            ok = db_player:add_player(Player),
            Player;
        {ok, Player} when is_record(Player, ets_player) ->
            Player#ets_player{
                avatar_url = AvatarUrl,
                nickname = Nickname,
                gender = Gender,
                open_id = OpenId
            };
        Error ->
            Error
    end.


get_player_pid(PlayerId) ->
    case ets:lookup(?ETS_PLAYER, PlayerId) of
        [Info] when is_pid(Info#ets_player.other#player_other.pid) ->
            Info#ets_player.other#player_other.pid;
        _ ->
            []
    end.

get_room_player(RoomId) ->
    ets:match_object(?ETS_PLAYER, #ets_player{room_id = RoomId, _ = '_'}).

check_player_ready([]) ->
    false;
check_player_ready(Players) ->
    ReadyLength = length([1 || P <- Players, P#ets_player.game_state == ?PLAYER_STATE_READY]),
    ReadyLength == length(Players) andalso ReadyLength >= 2.

set_player_ready(Player) ->
    NewPlayer = Player#ets_player{game_state = ?PLAYER_STATE_READY},
    ets:insert(?ETS_PLAYER, NewPlayer),
    NewPlayer.

enter_match_game(Status, [MatchId, _MatchType, _GameMode]) ->
    case config:get_is_room() of
        true ->
            RoomId = mod_id:get_room_id(MatchId),
            {ok, RoomPid} = lib_room:start_room(RoomId),
            if
                is_pid(RoomPid) ->
                    ok;
                true ->
                    ?ERROR_MSG("can not start game room ~p ~p", [RoomId, RoomPid]),
                    Status
            end,
            NewStatus = Status#ets_player{
                room_id = RoomId,
                other = Status#ets_player.other#player_other{
                    room_pid = RoomPid
                }
            },
            gen_server:cast(RoomPid, {player_enter_room, NewStatus}),
            NewStatus;
        _ ->
            {ok, Bin} = pt_10:write(10001, [0, 0, MatchId]),
            lib_send:send_to_player(Status, Bin),
            Status#ets_player{
                game_state = ?PLAYER_STATE_READY
            }
    end.

%%
%%enter_room(Player, MatchId) ->
%%    RoomId = mod_id:get_room_id(MatchId),
%%    if
%%        Player#ets_player.room_id =/= RoomId ->
%%            NewPlayer = Player#ets_player
%%    end,
%%
%%    if
%%        Player#ets_player.room_id =/= 0 and ->
%%            {ok, Bin} = pt_10:write(10002, 0),
%%            lib_send:send_to_player(Player, Bin),
%%            {ok, Player};
%%        true ->
%%            {}
%%    end
