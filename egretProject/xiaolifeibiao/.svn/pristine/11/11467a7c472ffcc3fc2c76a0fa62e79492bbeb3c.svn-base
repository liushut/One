%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 22. 三月 2018 15:53
%%%-------------------------------------------------------------------
-module(pt_10).

%% API
-export([
    read/2,
    write/2
]).

-include("common.hrl").
-include("proto/p10.hrl").

read(10000, Bin) ->
    #cs_10000{
        openId = OpenId,
        nickname = Nickname,
        avatarUrl = AvatarUrl,
        sign = Sign,

        timestamp = Time
    } = p10:decode_msg(Bin, cs_10000),
    {ok, [OpenId, Nickname, AvatarUrl, Sign, Time]};

read(10001, Bin) ->
    #cs_10001{
        matchId = MatchId
    } = p10:decode_msg(Bin, cs_10001),
    {ok, MatchId};

read(10002, _) ->
    {ok, []};

read(10004, _) ->
    {ok, []};

read(10010, Bin) ->
    #cs_10010{
        processData = ProcessData
    } = p10:decode_msg(Bin, cs_10010),
    {ok, ProcessData};

read(10011, Bin) ->
    #cs_10011{
        resultData = ResultData
    } = p10:decode_msg(Bin, cs_10011),
    {ok, ResultData};

read(Cmd, Bin) ->
    ?WARNING_MSG("Cmd Not Found ~p", [{Cmd, Bin}]),
    error.

write(10000, [Result, PlayerId]) ->
    write_end(10000, #sc_10000{
        result = Result,
        playerId = PlayerId
    });

write(10001, [Result, RoomId, MatchId]) ->
    ?PRINT_MSG("Info ~p", [{Result, RoomId}]),
    write_end(10001, #sc_10001{
        result = Result,
        roomId = RoomId,
        matchId = MatchId
    });

write(10002, Result) ->
    write_end(10002, #sc_10002{
        result = Result
    });

write(10003, ReadyTime) ->
    write_end(10003, #sc_10003{
        readyTime = ReadyTime
    });

write(10010, [PlayerId, ProcessData]) ->
    write_end(10010, #sc_10010{
        playerId = PlayerId,
        processData = ProcessData
    });

write(10011, [PlayerId, ResultData, Seeds]) ->
    write_end(10011, #sc_10011{
        playerId = PlayerId,
        resultData = ResultData,
        seeds = Seeds
    });

write(Cmd, Data) ->
    ?ERROR_MSG("unknow write msg ~p", [Cmd, Data]),
    {ok, <<>>}.

write_end(Cmd, Record) ->
    Data = p10:encode_msg(Record),
    {ok, pt_base:pack(Cmd, Data)}.
