%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 03. 四月 2018 14:40
%%%-------------------------------------------------------------------
-module(lib_ali_battle).

%% API
-export([
    get_battle_player/0,
    get_battle_player/1,
    update_battle_players/1,
    update_battle_player/1,
    check_player_ready/0,
    update_player_game_state/2,
    update_player_score_result_data/3,
    battle_finish/2,
    battle_finish/3,
    battle_force_quit/2,
    get_winner/0,
    player_afk/3,
    player_recovery/3,
    check_player_afk/1,
    battle_timeout/1,
    update_seeds/1,
    get_seeds/0
]).

-include("common.hrl").
-define(DIC_ALI_BATTLE_PLAYER, dic_ali_battle_player).

get_battle_player() ->
    case get(?DIC_ALI_BATTLE_PLAYER) of
        List when is_list(List) ->
            List;
        _ ->
            []
    end.

get_battle_player(PlayerId) ->
    List = get_battle_player(),
    case lists:keyfind(PlayerId, #ali_battle_player.player_id, List) of
        false ->
            [];
        Player ->
            Player
    end.

update_battle_players(Players) when is_list(Players) ->
    put(?DIC_ALI_BATTLE_PLAYER, Players).

update_battle_player(Player) ->
    List = get_battle_player(),
    case lists:keytake(Player#ali_battle_player.player_id, #ali_battle_player.player_id, List) of
        {value, _OldInfo, TmpList} ->
            NewList = [Player | TmpList];
        _ ->
            NewList = [Player | List]
    end,
    update_battle_players(NewList).

update_player_game_state(NewState, OpenId) ->
    PlayerId = mod_id:get_player_id(OpenId),
    Player = get_battle_player(PlayerId),
    NewPlayer = Player#ali_battle_player{
        game_state = NewState
    },
    update_battle_player(NewPlayer).

update_player_score_result_data([Score, Level, Score2], ResultData, OpenId) ->
    PlayerId = mod_id:get_player_id(OpenId),
    Player = get_battle_player(PlayerId),
    NewPlayer = Player#ali_battle_player{
        score = Score,
        score2 = Score2,
        level = Level,
        last_result_data = ResultData
    },
    update_battle_player(NewPlayer).

update_seeds(GameSeeds) ->
    case get_seeds() of
        [] ->
            put(game_seeds, GameSeeds);
        _ ->
            ok
    end.

get_seeds() ->
    case get(game_seeds) of
        List when is_list(List) ->
            List;
        _ ->
            []
    end.

get_winner() ->
    case get(battle_winner) of
        PlayerId when is_integer(PlayerId) ->
            PlayerId;
        _ ->
            0
    end.

update_winner(WinPlayerId) ->
    put(battle_winner, WinPlayerId).

check_player_ready() ->
    Players = [P || P <- get_battle_player(), P#ali_battle_player.is_robot == 0],
    LengthPlayer = length(Players),
    if
        LengthPlayer < 1 ->
            false;
        true ->
            ReadyList = [ true || Player <- Players, Player#ali_battle_player.game_state >= ?PLAYER_STATE_READY],
            length(ReadyList) == LengthPlayer
    end.

battle_timeout(BattleState) ->
    battle_finish(BattleState, 0),
    ok.

check_player_afk(BattleState) ->
    PlayerList = get_battle_player(),
    {AfkPlayers, WinPlayers} = lists:splitwith(fun(Player) -> Player#ali_battle_player.game_state == ?PLAYER_STATE_AFK end, PlayerList),
    case AfkPlayers of
        [] ->
            ok;
        _ ->
            ?PRINT_MSG("check player afk ~p~n~p~n~p",
                [BattleState#ets_battle_state.battle_id, AfkPlayers, WinPlayers]),
            case WinPlayers of
                [WinPlayer | _] ->
                    battle_finish(BattleState, WinPlayer#ali_battle_player.player_id);
                _ ->
                    battle_finish(BattleState, 0)
            end
    end.

%% 暂离
player_afk(BattleState, MsgId, OpenIds) ->
    [update_player_game_state(?PLAYER_STATE_AFK, OpenId) || OpenId <- OpenIds],
    {ok, SendBin} = pt_ali_head:write(4, [BattleState#ets_battle_state.battle_id, MsgId, true]),
    lib_send:send_to_sid(BattleState#ets_battle_state.socket_pid, SendBin),
    Timer = erlang:send_after(10000, self(), {check_player_afk}),
    update_afk_timer(Timer),
    ?PRINT_MSG("player afk ~p ~p", [BattleState, OpenIds]),
    ok.

update_afk_timer(Timer) ->
    case get(battle_afk_timer) of
        undefined ->
            put(battle_afk_timer, Timer);
        OldTimer ->
            erlang:cancel_timer(OldTimer),
            put(battle_afk_timer, Timer)
    end.

%% 恢复
player_recovery(BattleState, MsgId, OpenIds) ->
    [update_player_game_state(?PLAYER_STATE_INGAME, OpenId) || OpenId <- OpenIds],
    {ok, SendBin} = pt_ali_head:write(5, [BattleState#ets_battle_state.battle_id, MsgId, true]),
    lib_send:send_to_sid(BattleState#ets_battle_state.socket_pid, SendBin),
    update_afk_timer(undefined),
    ?PRINT_MSG("recovery ~p ~p", [OpenIds, BattleState]),
    ok.

battle_force_quit(BattleState, MsgId) ->
    PlayerList = get_battle_player(),
    {GroupResultList, ScoreList} = battle_end_result(PlayerList, 0, [], []),
    {ok, SendBin} = pt_ali_head:write(2, [BattleState#ets_battle_state.battle_id, MsgId, true, GroupResultList, ScoreList]),
    lib_send:send_to_sid(BattleState#ets_battle_state.socket_pid, SendBin),
    erlang:send_after(20000, self(), {close_battle}),
    ok.

battle_finish(BattleState, TmpWinPlayerId) ->
    battle_finish(BattleState, TmpWinPlayerId, true).
battle_finish(BattleState, TmpWinPlayerId, IsDelay) ->
    case get_winner() of
        0 ->
            WinPlayerId = TmpWinPlayerId,
            update_winner(TmpWinPlayerId);
        WinPlayerId ->
            WinPlayerId
    end,
    PlayerList = get_battle_player(),
    {GroupResultList, ScoreList} = battle_end_result(PlayerList, WinPlayerId, [], []),
    MsgId = mod_id:get_msg_id(),
    erlang:send_after(20000, self(), {close_battle}),
    {ok, EndData} = pt_ali_head:write(10002, [BattleState#ets_battle_state.battle_id, MsgId, GroupResultList, ScoreList]),
    game_end_log(BattleState),
    if
        IsDelay ->
            lib_send:send_to_sid(BattleState#ets_battle_state.socket_pid, EndData, 1500);
        true ->
            lib_send:send_to_sid(BattleState#ets_battle_state.socket_pid, EndData)
    end.

battle_end_result([], _, GroupList, ScoreList) ->
    {GroupList, ScoreList};
battle_end_result([BattlePlayer|T], WinPlayerId, GroupResultList, ScoreList) when is_record(BattlePlayer, ali_battle_player)->
    Result =
        if
            WinPlayerId == 0 ->
                0;
            BattlePlayer#ali_battle_player.player_id == WinPlayerId ->
                1;
            true ->
                -1
        end,
    GroupResult = [{groupId, BattlePlayer#ali_battle_player.group_id}, {result, Result}],
    ScoreInfo = [{openId, BattlePlayer#ali_battle_player.open_id},
        {score, BattlePlayer#ali_battle_player.score},
        {loseScore, 0}],
    battle_end_result(T, WinPlayerId, [GroupResult | GroupResultList], [ScoreInfo | ScoreList]);
battle_end_result([BattlePlayer|T], WinPlayerId, GroupResultList, ScoreList) ->
    ?WARNING_MSG("Not ali battle record ~p", [BattlePlayer]),
    battle_end_result(T, WinPlayerId, GroupResultList, ScoreList).

game_end_log(BattleState) ->
    case get(is_game_end_log) of
        true ->
            ok;
        _ ->
            PlayerList = get_battle_player(),
            WinPlayerId = get_winner(),
            #ets_battle_state{
                battle_id = BattleId,
                start_time = StartTime,
                room_id = RoomId
            } = BattleState,
            Duration = util:unixtime() - StartTime,
            F = fun(Player) ->
                ResultStr =
                    if
                        WinPlayerId == Player#ali_battle_player.player_id ->
                            "win";
                        true ->
                            "lose"
                    end,
                {ok, Bin} = pt_ali_head:write(10005,
                    [BattleId, RoomId, Player, ResultStr, Duration, Player#ali_battle_player.level, Player#ali_battle_player.score2]),
                lib_send:send_to_sid(BattleState#ets_battle_state.socket_pid, Bin)
                end,
            lists:map(F, PlayerList),
            put(is_game_end_log, true)
    end.
