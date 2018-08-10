%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 24. 五月 2018 17:04
%%%-------------------------------------------------------------------
-module(huoshu_pt_handler).

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

game_start_event(_RoomStatus, _RoomPlayerList) ->
    ok.

game_end_event(_RoomStatus, _RoomPlayerList, _WinPlayerId) ->
        ok.