%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 14. 五月 2018 19:17
%%%-------------------------------------------------------------------
-module(oppo_pt_handler).

-include("common.hrl").
%% API
-export([
    get_user_info/1,
    game_start_event/2,
    game_end_event/3
]).

get_user_info(Data) ->
    case Data of
        [Nickname, GenderStr, AvatarUrl | _] ->
            Gender =
                case GenderStr of
                    "M" ->
                        1;
                    _ ->
                        0
                end,
            {true, tool:to_list(unicode:characters_to_binary(Nickname, utf8)), Gender, AvatarUrl};
        _ ->
            {false, "", "", ""}
    end.

game_start_event(RoomStatus, RoomPlayerList) ->
    #ets_room{
        match_id = TableId,
        match_token = TableToken
    } = RoomStatus,
    PlayerIdList = tool:to_list(util:maps_to_json(
        #{
            playerlist => {array, [One#room_player.open_id || One <- RoomPlayerList]}
        }
    )),
    Url = get_report_url() ++ "/instant-battle/gameapi/gameStart",
    GameId = config:get_app_id(),
    Time = util:time_millisecond(),
    Data = [
        {"gameId", GameId},
        {"tableId", TableId},
        {"tableToken", TableToken},
        {"timeStamp", Time}
    ],
    Sign = make_sign_str(Data),
    NewData = Data ++ [{"sign", Sign}, {"playerList", PlayerIdList}],
    request_url(Url, NewData).

get_win_result(PlayerId, WinPlayerId) ->
    case WinPlayerId of
        0 ->
            3;
        PlayerId ->
            1;
        _ ->
            2
    end.

game_end_event(RoomStatus, RoomPlayerList, WinPlayerId) ->
    #ets_room{
        match_id = TableId,
        match_token = TableToken
    } = RoomStatus,
    NewWinId =
        case lists:keyfind(WinPlayerId, #room_player.player_id, RoomPlayerList) of
            false ->
                0;
            _ ->
                WinPlayerId
        end,
    ResultList = [
        #{
            uid => One#room_player.open_id,
            result => get_win_result(One#room_player.player_id, NewWinId)
        } || One <- RoomPlayerList
    ],
    Url = get_report_url() ++ "/instant-battle/gameapi/gameEnd",
    GameId = config:get_app_id(),
    Time = util:time_millisecond(),
    Result = tool:to_list(util:maps_to_json(
        #{
            resultlist => {array, ResultList}
        })),
    Data = [
        {"gameId", GameId},
        {"tableId", TableId},
        {"tableToken", TableToken},
        {"timeStamp", Time}
    ],
    Sign = make_sign_str(Data),
    NewData = Data ++ [{"sign", Sign}, {"result", Result}],
    request_url(Url, NewData).

%% ======================================================
get_report_url() ->
    case config:get_config(is_test) of
        true ->
            "http://183.131.22.101:8017";
        _ ->
            "http://183.131.22.101:8017"
    end.

make_sign_str(Data) ->
    Secret = config:get_app_key(),
    NewData = [{"gameKey", Secret} | Data],
    SignStr = pack_data(lists:sort(NewData), ""),
    util:md5(SignStr, true).

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

request_url(Url, BodyData) ->
    request_url(post, Url, BodyData).

request_url(Method, Url, BodyData) ->
    BodyStr = make_body(BodyData),
    case httpc:request(Method,{Url, [], "application/x-www-form-urlencoded", BodyStr},[],[]) of
        {ok, {_,_,Body}} ->
            {_, Ret} = mochijson2:decode(Body),
            RetCode = proplists:get_value(<<"errorcode">>, Ret),
            case tool:to_list(RetCode) of
                "0" ->
                    {ok, 0};
                _ ->
                    Msg = tool:to_list(proplists:get_value(<<"errormsg">>, Ret)),
                    ?WARNING_MSG("~p ~s ~p~n ~p ~n~p", [RetCode, Msg, Url, Ret, BodyData]),
                    {ok, RetCode}
            end;
        {error, Reason} ->
            ?WARNING_MSG("Report Error ~p~n~s~n~s", [Reason, Url, BodyStr]),
            {error, Reason}
    end.