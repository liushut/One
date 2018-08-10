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
        sign = Sign,
        timestamp = Time,
        appId = AppId,
        params = Params
    } = p10:decode_msg(Bin, cs_10000),
    {ok, login, [OpenId, Sign, Time, AppId, Params]};

read(10001, Bin) ->
    #cs_10001{
        gameMode = GameMode,
        matchType = MatchType,
        matchId = MatchId
    } = p10:decode_msg(Bin, cs_10001),
    {ok, [MatchId, MatchType, GameMode]};

read(10010, Bin) ->
    #cs_10010{
        cpPropId = PropId
    } = p10:decode_msg(Bin, cs_10010),
    {ok, PropId};


read(10011, Bin) ->
    #cs_10011{
        cpOrderId = OrderId
    } = p10:decode_msg(Bin, cs_10011),
    {ok, OrderId};

read(Cmd, Bin) ->
    ?WARNING_MSG("Cmd Not Found ~p", [{Cmd, Bin}]),
    error.

write(10000, [Result, PlayerId]) ->
    write(10000, [Result, PlayerId, "", "", ""]);
write(10000, [Result, PlayerId, OpenId, Nickname, AvatarUrl]) ->
    ?PRINT_MSG("Info ~p", [{Result, PlayerId, Nickname, AvatarUrl, OpenId}]),
    write_end(10000, #sc_10000{
        result = Result,
        playerId = PlayerId,
        nickname = Nickname,
        avatarUrl = AvatarUrl,
        openId = OpenId
    });

write(10001, [Result, RoomId, MatchId]) ->
    ?PRINT_MSG("Info ~p", [{Result, RoomId}]),
    write_end(10001, #sc_10001{
        result = Result,
        roomId = RoomId,
        matchId = MatchId
    });

write(10010, [Result, OrderId, ProName, PropId, PayAmount]) ->
    write_end(10010, #sc_10010{
        result = Result,
        cpOrderId = OrderId,
        cpPropName = ProName,
        cpPropId = PropId,
        payAmount = PayAmount
    });

write(10010, Result) ->
    write_end(10010, #sc_10010{
        result = Result
    });

write(10011, [Result, OrderId]) ->
    write_end(10011, #sc_10011{
        result = Result,
        cpOrderId = OrderId
    });

write(Cmd, Data) ->
    ?ERROR_MSG("unknow write msg ~p", [Cmd, Data]),
    {ok, <<>>}.

write_end(Cmd, Record) ->
    Data = p10:encode_msg(Record),
    {ok, pt_base:pack(Cmd, Data)}.
