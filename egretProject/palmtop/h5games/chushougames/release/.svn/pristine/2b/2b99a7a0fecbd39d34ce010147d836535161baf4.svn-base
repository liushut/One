%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 21. 四月 2018 15:03
%%%-------------------------------------------------------------------
-module(chushou_pt_handler).

-include("common.hrl").
%% API
-export([
    get_user_info/1,
    game_start_event/2,
    game_end_event/3,
    game_end_event/4,
    make_sign_str/1
]).

game_start_event(RoomStatus, _RoomPlayerList) ->
    report_room_create(RoomStatus#ets_room.room_id).

game_end_event(RoomStatus, RoomPlayerList, WinPlayerId) ->
    ResultList = room_player_to_result(RoomPlayerList, WinPlayerId),
    #ets_room{
        room_id = RoomId,
        start_time = StartTime,
        end_time = EndTime
    } = RoomStatus,
    game_end_event(RoomId, ResultList, StartTime, EndTime).


%% 游戏结束事件接口
game_end_event(RoomId, ResultPlayers, StartTime, EndTime) ->
    case config:get_is_room() of
        true ->
            report_room_close(RoomId);
        _ ->
            ok
    end,
    game_end_report(RoomId, ResultPlayers, StartTime, EndTime).

get_user_info(Data) ->
    case Data of
        [Nickname, GenderStr, AvatarUrl | _] ->
            Gender =
                case GenderStr of
                    "male" ->
                        1;
                    _ ->
                        0
                end,
            {true, tool:to_list(unicode:characters_to_binary(Nickname, utf8)), Gender, AvatarUrl};
        _ ->
            {false, "", "", ""}
    end.

%% ======================== 内部调用函数 ====================

room_player_to_result(RoomPlayers, WinPlayerId) ->
    room_player_to_result(RoomPlayers, WinPlayerId, [], 0).

room_player_to_result([], _WinPlayerId, ResultList, _Index) ->
    ResultList;
room_player_to_result([RoomPlayer | Tail], WinPlayerId, ResultList, Index) ->
    #room_player{
        open_id = OpenId,
        player_id = PlayerId,
        score = Score
    } = RoomPlayer,
    Result =
        if
            WinPlayerId == 0 ->
                -1;
            PlayerId == WinPlayerId ->
                1;
            true ->
                0
        end,
    R = #result_player{
        open_id = OpenId,
        group = Index,
        score = Score,
        result = Result
    },
    room_player_to_result(Tail, WinPlayerId, [R | ResultList], Index + 1).

get_report_url() ->
    case config:get_config(is_test) of
        true ->
            "https://open-game.vchushou.com";
        _ ->
            "https://open-game.chushou.tv"
    end.

make_sign_str(Data) ->
    Secret = config:get_app_key(),
    Str = pack_data(lists:sort(Data), ""),
    SignStr = lists:concat([Secret, "&", Str]),
    util:md5(SignStr).

pack_data([{Key, Val}], Str) ->
    Str ++ lists:concat([to_list(Key), "=", to_list(Val)]);
pack_data([{Key, Val} | Tail], Str) ->
    NewStr = Str ++ lists:concat([to_list(Key), "=", to_list(Val), "&"]),
    pack_data(Tail, NewStr).

to_list(Val) when is_binary(Val) ->
    tool:to_list(Val);
to_list(Val) ->
    Val.

make_body(Data) ->
    pack_data(Data, "").

result_player_to_map(ResultPlayer, GameMode) ->
    #result_player{
        open_id = OpenId,
        score = Score,
        group = Group,
        result = Result
    } = ResultPlayer,
    if
        GameMode == 0 ->
            #{
                openUid => OpenId,
                score => Score,
                scoreUnit => ?SCORE_UNIT
            };
        true ->
            #{
                openUid => OpenId,
                result => Result,
                group => Group,
                score => Score,
                scoreUnit => ?SCORE_UNIT
            }
    end.

%% ======================== 平台http调用接口 ====================


%% ======================== 平台上报接口 ====================
report_room_create(RoomId) ->
    report_room_change(RoomId, 1).
report_room_close(RoomId) ->
    report_room_change(RoomId, 2).

report_room_change(RoomId, Event) ->
    Url = get_report_url() ++ "/xinternal/h5game/status/room.htm",
    Method = post,
    Time = util:time_millisecond(),
    Data = lists:sort([
        {"_t", Time},
        {"_xappkey", config:get_app_id()},
        {"event", Event},
        {"gameRoomId", RoomId}
    ]),
    Sign = make_sign_str(Data),
    request_url(Method, Url, [{"_sign", Sign} | Data]).

game_end_report(RoomId, ResultPlayers, StartTime, EndTime) ->
    case config:get_is_room() of
        true ->
            GameMode = 1,
            GameModeDesc = <<"1v1"/utf8>>,
            Title = <<"1v1对决"/utf8>>,
            Desc = <<"精彩的比赛"/utf8>>;
        _ ->
            GameMode = 0,
            GameModeDesc = <<"个人赛"/utf8>>,
            Title = <<"个人赛"/utf8>>,
            Desc = <<"精彩的比赛"/utf8>>
    end,
    game_end_report(RoomId, GameMode, GameModeDesc, Title, Desc, ResultPlayers, StartTime, EndTime).

game_end_report(RoomId, GameMode, GameModeDesc, Title, Desc, ResultPlayers, StartTime, EndTime) ->
    Url = get_report_url() ++ "/xinternal/h5game/record/report.htm",
    Method = post,
    Time = util:time_millisecond(),
    PlayerJsonStr =  util:list_to_json([result_player_to_map(One, GameMode) || One <- ResultPlayers]),
    Data =
        if
        GameMode == 0 ->
            lists:sort([
                {"_t", Time},
                {"_xappkey", config:get_app_id()},
                {"gameMode", GameMode},
                {"gameModeDesc", GameModeDesc},
                {"title", Title},
                {"description", Desc},
                {"players", PlayerJsonStr}
            ]);
        true ->
            lists:sort([
                {"_t", Time},
                {"_xappkey", config:get_app_id()},
                {"gameRecordId", RoomId},
                {"gameRoomId", RoomId},
                {"gameMode", GameMode},
                {"gameModeDesc", GameModeDesc},
                {"title", Title},
                {"description", Desc},
                {"start_time", StartTime},
                {"end_time", EndTime},
                {"players", PlayerJsonStr}
            ])
    end,
    Sign = make_sign_str(Data),
    request_url(Method, Url, [{"_sign", Sign} | Data]).


request_url(Method, Url, BodyData) ->
    BodyStr = make_body(BodyData),
    case httpc:request(Method,{Url, [],"application/x-www-form-urlencoded", BodyStr},[],[]) of
        {ok, {_,_,Body}} ->
            {_, Ret} = mochijson2:decode(Body),
            RetCode = proplists:get_value(<<"code">>, Ret),
            if
                RetCode == 0 orelse RetCode == "0" ->
                    {ok, 0};
                true ->
                    Msg = tool:to_list(proplists:get_value(<<"message">>, Ret)),
                    ?WARNING_MSG("~p ~s ~p~n ~p ~n~p", [RetCode, Msg, Url, Ret, BodyData]),
                    {ok, RetCode}
            end;
        {error, Reason} ->
            ?WARNING_MSG("chushou Report Error ~p~n~s~n~s", [Reason, Url, BodyStr]),
            {error, Reason}
    end.
