%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 02. 四月 2018 17:37
%%%-------------------------------------------------------------------
-module(battle_ali_handler).
-include("common.hrl").

%% API
-export([
    battle_handle/3,
    handle/4
]).

battle_handle(2, BattleState, [MsgId]) ->
    lib_ali_battle:battle_force_quit(BattleState, MsgId),
    {ok, BattleState};

battle_handle(3, BattleState, [MsgId, OpenIds]) ->
    AllPlayers = lib_ali_battle:get_battle_player(),
    WinPlayerIds = [A#ali_battle_player.player_id || A <- AllPlayers,
        not lists:member(A#ali_battle_player.open_id, OpenIds)],
    ?PRINT_MSG("OpenIds ~p WinPlayerIds ~p", [OpenIds, WinPlayerIds]),
    case WinPlayerIds of
        [WinPlayerId | _] ->
            lib_ali_battle:battle_finish(BattleState, WinPlayerId, false);
        _ ->
            ok
    end,
    {ok, SendBin} = pt_ali_head:write(3, [BattleState#ets_battle_state.battle_id, MsgId, true]),
    lib_send:send_to_sid(BattleState#ets_battle_state.socket_pid, SendBin),
    {ok, BattleState};

battle_handle(4, BattleState, [MsgId, OpenIds]) ->
    lib_ali_battle:player_afk(BattleState, MsgId, OpenIds),
    {ok, BattleState};

battle_handle(5, BattleState, [MsgId, OpenIds]) ->
    lib_ali_battle:player_recovery(BattleState, MsgId, OpenIds),
    {ok, BattleState};

battle_handle(_Cmd, BattleState, _Data) ->
    {ok, BattleState}.

handle(11002, BattleState, OpenId, []) ->
    lib_ali_battle:update_player_game_state(?PLAYER_STATE_READY, OpenId),
    PlayerList = lib_ali_battle:get_battle_player(),
    case lib_ali_battle:check_player_ready() of
        true ->
            Seeds = [rand:uniform(100)],
            lib_ali_battle:update_seeds(Seeds),
            [begin
                 {ok, Data} = pt_11:write(11002, [0, Info#ali_battle_player.player_id, Info#ali_battle_player.open_id, Seeds]),
                 lib_send:send_to_open_id(Info#ali_battle_player.open_id, BattleState, Data)
             end || Info <- PlayerList ],
            ?PRINT_MSG("~p all ready  11 ~p", [Seeds, PlayerList]),
            {ok, ReadyData} = pt_11:write(11003, [3, PlayerList]),
            lib_send:send_to_battle_id(BattleState, ReadyData),
            {ok, BattleState#ets_battle_state{start_time = util:unixtime()}};
        _ ->
            ?PRINT_MSG("not ready  22 ~p", [PlayerList]),
            skip
    end;

handle(11004, BattleState, OpenId, Data) ->
    case Data of
        [all] ->
            lib_send:send_to_open_id(OpenId, BattleState, <<"return_all">>);
        [echo] ->
            lib_send:send_to_open_id(OpenId, BattleState, <<"return_echo">>);
        _ ->
            ok
    end,
    {ok, BattleState};

handle(11010, BattleState, OpenId, ProcessData) ->
    PlayerId = mod_id:get_player_id(OpenId),
    {ok, Data} = pt_11:write(11010, [PlayerId, ProcessData]),
    lib_send:send_to_battle_id(BattleState, Data),
    {ok, BattleState};

handle(11011, BattleState, OpenId, [PlayerScore, Level, Score2, ResultData]) ->
    PlayerId = mod_id:get_player_id(OpenId),
    Seeds = lib_ali_battle:get_seeds(),
    PlayerList = lib_ali_battle:get_battle_player(),
    {ok, Data} = pt_11:write(11011, [PlayerId, PlayerScore, ResultData, Seeds]),
    SendOpenIds = [
        Player#ali_battle_player.open_id
        || Player <- PlayerList
    ],
    lib_send:send_to_open_id(lists:delete(OpenId, SendOpenIds), BattleState, Data),
    lib_ali_battle:update_player_score_result_data([PlayerScore, Level, Score2], ResultData, OpenId),
    {ok, BattleState};

handle(11012, BattleState, _OpenId, WinPlayerId) ->
    {ok, Data} = pt_11:write(11012, [0, WinPlayerId]),
    lib_send:send_to_battle_id(BattleState, Data),
    lib_ali_battle:battle_finish(BattleState, WinPlayerId),
    {ok, BattleState};

handle(11013, BattleState, OpenId, _) ->
    PlayerList = lib_ali_battle:get_battle_player(),
    Seeds = lib_ali_battle:get_seeds(),
    [
        begin
            #ali_battle_player{
                player_id = PlayerId,
                score = PlayerScore,
                last_result_data = ResultData
            } = Player,
            {ok, Data} = pt_11:write(11011, [PlayerId, PlayerScore, ResultData, Seeds]),
            lib_send:send_to_open_id(OpenId, BattleState, Data)
        end || Player <- PlayerList
    ],
    {ok, BattleState};

handle(_Cmd, BattleState, _OpoenId, _Data) ->
    {ok, BattleState}.
