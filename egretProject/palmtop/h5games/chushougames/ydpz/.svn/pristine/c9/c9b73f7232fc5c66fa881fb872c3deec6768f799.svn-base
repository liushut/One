%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 02. 四月 2018 14:39
%%%-------------------------------------------------------------------
-module(pt_ali_head).

-include("common.hrl").

%% API
-export([
    read/1,
    write/2
]).

read(HeadContent) ->
    Cmd =  proplists:get_value(<<"cmd">>, HeadContent),
    read(Cmd, HeadContent).

read(0, HeadContent) ->
    BattleId = get_string_val(<<"battleId">>, HeadContent),
    OpenId = get_string_val(<<"openId">>, HeadContent),
    {0, BattleId, OpenId};

read(1, HeadContent) ->
    BattleId = get_string_val(<<"battleId">>, HeadContent),
    MsgId = proplists:get_value(<<"msgId">>, HeadContent),
    PlayerList = proplists:get_value(<<"playerList">>, HeadContent),
    PlayerInfos = read_player(PlayerList),
    {1, BattleId, [MsgId, PlayerInfos]};

read(2, HeadContent) ->
    BattleId = get_string_val(<<"battleId">>, HeadContent),
    MsgId = proplists:get_value(<<"msgId">>, HeadContent),
    ?PRINT_MSG("cmd 2 Content ~p", [HeadContent]),
    {2, BattleId, [MsgId]};

read(3, HeadContent) ->
    BattleId = get_string_val(<<"battleId">>, HeadContent),
    MsgId = proplists:get_value(<<"msgId">>, HeadContent),
    OpenIds = get_string_list(<<"openIds">>, HeadContent),
    ?PRINT_MSG("cmd 3 Content ~p", [HeadContent]),
    {3, BattleId, [MsgId, OpenIds]};

read(4, HeadContent) ->
    BattleId = get_string_val(<<"battleId">>, HeadContent),
    MsgId = proplists:get_value(<<"msgId">>, HeadContent),
    OpenIds = get_string_list(<<"openIds">>, HeadContent),
    ?PRINT_MSG("cmd 4 Content ~p", [HeadContent]),
    {4, BattleId, [MsgId, OpenIds]};

read(5, HeadContent) ->
    BattleId = get_string_val(<<"battleId">>, HeadContent),
    MsgId = proplists:get_value(<<"msgId">>, HeadContent),
    OpenIds = get_string_list(<<"openIds">>, HeadContent),
    ?PRINT_MSG("cmd 5 Content ~p", [HeadContent]),
    {5, BattleId, [MsgId, OpenIds]};

read(_Cmd, _Head) ->
    ok.

write(1, [BattleId, MsgId, IsSuccess]) ->
    Content = [
        {battleId, BattleId},
        {msgId, MsgId},
        {isSuccess, IsSuccess}],
    pack_ali_write(1, Content);

write(2, [BattleId, MsgId, IsSuccess, GroupResultList]) ->
    Content = [
        {battleId, BattleId},
        {msgId, MsgId},
        {isSuccess, IsSuccess},
        {groupResult, {struct_array, GroupResultList}}
    ],
    pack_ali_write(2, Content);

write(3, [BattleId, MsgId, IsSuccess]) ->
    Content = [
        {battleId, BattleId},
        {msgId, MsgId},
        {isSuccess, IsSuccess}],
    pack_ali_write(3, Content);

write(4, [BattleId, MsgId, IsSuccess]) ->
    Content = [
        {battleId, BattleId},
        {msgId, MsgId},
        {isSuccess, IsSuccess}],
    pack_ali_write(4, Content);

write(5, [BattleId, MsgId, IsSuccess]) ->
    Content = [
        {battleId, BattleId},
        {msgId, MsgId},
        {isSuccess, IsSuccess}],
    pack_ali_write(4, Content);

write(10000, [BattleId, OpenIds, Data]) ->
    Content = [
        {battleId, BattleId}, {openIds, {array, OpenIds}}
    ],
    pack_write(10000, Content, Data);

write(10001, [BattleId, Data]) ->
    Content = [
        {battleId, BattleId}
    ],
    pack_write(10001, Content, Data);

write(10002, [BattleId, MsgId, GroupResultList]) ->
    Content = [
        {battleId, BattleId},
        {msgId, MsgId},
        {groupResult, {struct_array, GroupResultList}}
    ],
    ?PRINT_MSG("Content ~p", [Content]),
    pack_ali_write(10002, Content);

write(_Cmd, _HeadContent) ->
    {ok, <<>>}.

pack_ali_write(Cmd, Content) ->
    pack_write(Cmd, Content, <<>>).
pack_write(Cmd, Content, Body) ->
    HeadContent = {
        struct,
        [{<<"cmd">>, Cmd} | pack_kv_list(Content)]
        },
    HeadBin = iolist_to_binary(mochijson2:encode(HeadContent)),
    HeadSize = byte_size(HeadBin),
    Bin = <<HeadSize:32, HeadBin/binary, Body/binary>>,
    {ok, Bin}.

pack_kv_list(Content) ->
    [{atom_to_binary(Key, utf8), to_binary(Val)} || {Key, Val} <- Content].

to_binary({struct_array, List}) ->
    [
        {struct, pack_kv_list(Data)} || Data <- List
    ];
to_binary({array, List}) ->
    [to_binary(Data) || Data <- List];
to_binary(Val) when is_list(Val) ->
    tool:to_binary(Val);
to_binary(Val) when is_boolean(Val) ->
    Val;
to_binary(Val) when is_atom(Val) ->
    atom_to_binary(Val, utf8);
to_binary(Val) ->
    Val.

read_player(PlayerList) ->
    read_player(PlayerList, []).

read_player([], List) ->
    List;
read_player([{struct, PlayerInfo} | Tail], List) ->
    OpenId = get_string_val(<<"openId">>, PlayerInfo),
    IsRobot = proplists:get_value(<<"isRobot">>, PlayerInfo),
    Nickname = get_string_val(<<"nickName">>, PlayerInfo),
    GroupId = get_string_val(<<"groupId">>, PlayerInfo),
    AvatarUrl = get_string_val(<<"avatarUrl">>, PlayerInfo),
    Gender = proplists:get_value(<<"gender">>, PlayerInfo, "1"),
    BattleTimes = proplists:get_value(<<"battleTimes">>, PlayerInfo, "1"),
    Info = #{
        openId => OpenId,
        isRobot => tool:to_integer(IsRobot),
        nickname => Nickname,
        groupId => GroupId,
        avatarUrl => AvatarUrl,
        battleTimes => tool:to_integer(BattleTimes),
        gender => tool:to_integer(Gender)
    },
    read_player(Tail, [Info | List]).

get_string_list(Key, Content) ->
    List = proplists:get_value(Key, Content),
    [tool:to_list(Val) || Val <- List].

get_string_val(Key, List) ->
    case proplists:get_value(Key, List) of
        undefined ->
            "";
        Val ->
            tool:to_list(Val)
    end.