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

read(11005, _) ->
    {ok, []};

read(11006, _) ->
    {ok, []};

read(11007, _) ->
    {ok, []};

read(11008,_) ->
    {ok, []};

read(11010, Bin) ->
    #cs_11010{
        processData = ProcessData
    } = p11:decode_msg(Bin, cs_11010),
    {ok, ProcessData};

read(11011, Bin) ->
    #cs_11011{
        score = Score,
        resultData = ResultData
    } = p11:decode_msg(Bin, cs_11011),
    {ok, [Score, ResultData]};

read(11012, Bin) ->
    #cs_11012{
        winPlayerId = WinPlayerId
    } = p11:decode_msg(Bin, cs_11012),
    ?PRINT_MSG("11012 ~p", [WinPlayerId]),
    {ok, WinPlayerId};

read(11014, Bin) ->
    #cs_11014{
        openId = OpenIds
    } = p11:decode_msg(Bin, cs_11014),
    {ok, OpenIds};

read(11015, _) ->
    {ok, []};

read(11101, Bin) ->
    #cs_11101{
        round = Round,
        shootData = ShootData
    } = p11:decode_msg(Bin, cs_11101),
    {ok, [Round, ShootData]};

read(11102, Bin) ->
    #cs_11102{
        round = Round,
        addScore = AddScore,
        data = Data
    } = p11:decode_msg(Bin, cs_11102),
    {ok, [Round, AddScore, Data]};

read(Cmd, Data) ->
    ?WARNING_MSG("error cmd ~p ~p", [Cmd, Data]),
    {ok, []}.

write(11002, Result) ->
    write_end(11002, #sc_11002{
        result = Result
    });

write(11003, [ReadyTime, RoomPlayers, Seeds]) ->
    List = player_to_infos(RoomPlayers),
    ?PRINT_MSG("RoomPlayers ~p~n~p", [RoomPlayers, List]),
    write_end(11003, #sc_11003{
        readyTime = ReadyTime,
        playerInfos = List,
        seeds = Seeds
    });

write(11005, GameState) ->
    write_end(11005, #sc_11005{
        gameState = GameState
    });

write(11006, GamePlayerInfos) ->
    List = GamePlayerInfos,
    write_end(11006, #sc_11006{
        infos = List
    });

write(11007, Result) ->
    write_end(11007, #sc_11007{result = Result});

write(11008, [TopScore, WeekScore]) ->
    write_end(11008, #sc_11008{
        topScore = TopScore,
        weekScore = WeekScore
    });

write(11009, PlayerId) ->
    write_end(11009, #sc_11009{playerId = PlayerId});

write(11010, [PlayerId, ProcessData]) ->
    write_end(11010, #sc_11010{
        playerId = PlayerId,
        processData = ProcessData
    });

write(11011, [PlayerId, Score, ResultData]) ->
    write_end(11011, #sc_11011{
        playerId = PlayerId,
        score = Score,
        resultData = ResultData
    });

write(11012, [Result, WinPlayerId]) ->
    write_end(11012, #sc_11012{
        result = Result,
        winPlayerId = WinPlayerId
    });

write(11012, [Result, WinPlayerId, Reason]) ->
    write_end(11012, #sc_11012{
        result = Result,
        winPlayerId = WinPlayerId,
        reason = Reason
    });

write(11012, [Result, WinPlayerId, FriendRank, Rank]) ->
    write_end(11012, #sc_11012{
        result = Result,
        winPlayerId = WinPlayerId,
        friendRank = FriendRank,
        rank = Rank
    });

write(11015, [Time, MillSecond]) ->
    write_end(11015, #sc_11015{
        time = Time,
        millisecond = MillSecond
    });

write(11101, [Result, Round, PlayerId, ShootData]) ->
    write_end(11101, #sc_11101{
        result = Result,
        round = Round,
        playerId = PlayerId,
        shootData = ShootData
    });

write(11102, [Result, Round, RoomPlayers, Data]) ->
    List = [#shootPlayerInfo{
        playerId = One#room_player.player_id,
        score = One#room_player.score
    } || One <- RoomPlayers],
    write_end(11102, #sc_11102{
        result = Result,
        round = Round,
        data = Data,
        scoreInfos = List
    });

write(Cmd, Data) ->
    ?WARNING_MSG("Unknow Cmd ~p Data ~p", [Cmd, Data]),
    {ok, <<>>}.

write_end(Cmd, Record) ->
    Data = p11:encode_msg(Record),
    {ok, pt_base:pack(Cmd, Data)}.

player_to_infos(Players) ->
    [player_to_info(P) || P <- Players].

player_to_info(Player) when is_record(Player, ets_player) ->
    #ets_player{
        player_id = PlayerId,
        open_id = OpenId,
        nickname = Nickname,
        avatar_url = AvatarUrl,
        play_count = BattleTimes,
        gender = Gender
    } = Player,
    #playerInfo{
        playerId = PlayerId,
        openId = OpenId,
        nickname = tool:to_binary(Nickname),
        avatarUrl = AvatarUrl,
        isRobot = 0,
        battleTimes = BattleTimes,
        gender = tool:to_list(Gender)
    };
player_to_info(Player) ->
    #room_player{
        player_id = PlayerId,
        open_id = OpenId,
        nickname = Nickname,
        avatar_url = AvatarUrl,
        play_count = BattleTimes,
        gender = Gender
    } = Player,
    #playerInfo{
        playerId = PlayerId,
        openId = OpenId,
        nickname = tool:to_binary(Nickname),
        avatarUrl = AvatarUrl,
        isRobot = 0,
        battleTimes = BattleTimes,
        gender = tool:to_list(Gender)
    }.

