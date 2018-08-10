%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 22. 三月 2018 15:53
%%%-------------------------------------------------------------------
-module(pt_11).

%% API
-export([
    read/2,
    write/2
]).

-include("common.hrl").
-include("proto/p11.hrl").

read(11002, _) ->
    {ok, []};

read(11004, _) ->
    {ok, []};

read(11010, Bin) ->
    #cs_11010{
        processData = ProcessData
    } = p11:decode_msg(Bin, cs_11010),
    {ok, ProcessData};

read(11011, Bin) ->
    #cs_11011{
        playerScore = PlayerScore,
        resultData = ResultData,
        score2 = Score2,
        level = Level
    } = p11:decode_msg(Bin, cs_11011),
    {ok, [PlayerScore, Level, Score2, ResultData]};

read(11012, Bin) ->
    #cs_11012{
        winPlayerId = WinPlayerId
    } = p11:decode_msg(Bin, cs_11012),
    {ok, WinPlayerId};

read(11013, _) ->
    {ok, []};

read(Cmd, Bin) ->
    ?WARNING_MSG("Cmd Not Found ~p", [{Cmd, Bin}]),
    error.

write(11002, [Result, PlayerId, OpenId, Seeds]) ->
    write_end(11002, #sc_11002{
        result = Result,
        playerId = PlayerId,
        openId = OpenId,
        seeds = Seeds
    });

write(11003, [ReadyTime, PlayerList]) ->
    write_end(11003, #sc_11003{
        readyTime = ReadyTime,
        playerInfos = pack_player_info(PlayerList)
    });

write(11010, [PlayerId, ProcessData]) ->
    write_end(11010, #sc_11010{
        playerId = PlayerId,
        processData = ProcessData
    });

write(11011, [PlayerId, PlayerScore, ResultData, Seeds]) ->
    write_end(11011, #sc_11011{
        playerId = PlayerId,
        playerScore = PlayerScore,
        resultData = ResultData,
        seeds = Seeds
    });

write(11012, [Result, WinPlayerId]) ->
    write_end(11012, #sc_11012{
        result = Result,
        winPlayerId = WinPlayerId
    });

write(Cmd, Data) ->
    ?ERROR_MSG("unknow write msg ~p", [Cmd, Data]),
    {ok, <<>>}.

write_end(Cmd, Record) ->
    Data = p11:encode_msg(Record),
    {ok, pt_base:pack(Cmd, Data)}.

pack_player_info(PlayerList) ->
    [battle_player_to_info(Info) || Info <- PlayerList].

battle_player_to_info(BattlePlayer) ->
    #ali_battle_player{
        player_id = PlayerId,
        open_id = OpenId,
        nickname = Nickname,
        avatar_url = AvatarUrl,
        gender = Gender,
        battle_times = BattleTimes,
        is_robot = IsRobot,
        robot_level = RobotLevel
    } = BattlePlayer,
    #playerInfo{
        playerId = PlayerId,
        openId = OpenId,
        nickname = Nickname,
        avatarUrl = AvatarUrl,
        gender = Gender,
        battleTimes = BattleTimes,
        isRobot = tool:to_integer(IsRobot),
        robotLevel = RobotLevel
    }.
