%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 23. 四月 2018 14:25
%%%-------------------------------------------------------------------
-module(db_player).
-include("common.hrl").

%% API
-export([
    get_id_by_open_id/2,
    get_player_info/1,
    get_player_info/2,
    add_player/1,
    update_player/1,
    get_week_rank/0,
    update_rank/1,
    update_rank_player/1
]).

get_week_rank() ->
    WeekStart = util:week_start(),
    case db_game:select_all(game_player, "player_id, open_id, platform_id, week_top_score, last_login_time", [{last_login_time, '>', WeekStart}]) of
        List when is_list(List) ->
            [to_rank_player(One)|| One <- List];
        Error ->
            ?WARNING_MSG("get week rank error ~p ", [Error]),
            []
    end.

%%get_week_rank() ->
%%    WeekStart = util:week_start(),
%%    case db_game:select_all(game_rank, "*", [{last_update_time, '>', WeekStart}]) of
%%        [] ->
%%            get_week_rank_from_player();
%%        List when is_list(List) ->
%%            [rank_to_record(One) || One <- List];
%%        Error ->
%%            ?WARNING_MSG("Get Rank Error ~p", [Error]),
%%            []
%%    end.
%%
%%rank_to_record(Info) ->
%%    Record = erlang:list_to_tuple([ets_game_rank | Info]),
%%    Record#ets_game_rank{
%%        open_id = tool:to_list(Record#ets_game_rank.open_id)
%%    }.

update_rank(RankPlayers) ->
    [update_rank_player(One) || One <- RankPlayers].

update_rank_player(RankPlayer) ->
    Fields = record_info(fields, ets_game_rank),
    [_ | Values] = erlang:tuple_to_list(RankPlayer),
    ok = db_game:replace(game_rank, util:merge_field_value(Fields, Values)).


to_rank_player([PlayerId, OpenId, PtId, WeekTopScore, UpdateTime]) ->
    #ets_game_rank{
        player_id = PlayerId,
        open_id = tool:to_list(OpenId),
        platform_id = PtId,
        top_score = WeekTopScore,
        last_update_time = UpdateTime
    }.

get_id_by_open_id(OpenId, PtId) ->
    case db_game:select_one(game_player_id, "id", [{open_id, OpenId}, {platform_id, PtId}]) of
        [] ->
            ok = db_game:insert(game_player_id,
                [open_id, platform_id, register_time],
                [OpenId, PtId, util:unixtime()]
                ),
            case db_game:select_one(game_player_id, "id", [{open_id, OpenId}, {platform_id, PtId}]) of
                [Id] ->
                    Id;
                Error ->
                    ?ERROR_MSG("insert get id error ~p ~p ~p", [Error, OpenId, PtId]),
                    undefined
            end;
        [Id] ->
            Id;
        Error ->
            ?ERROR_MSG("get player id error ~p", [Error]),
            undefined
    end.

get_player_info(PlayerId) ->
    Info = db_game:select_one(game_player, "*", [{player_id, PlayerId}]),
    to_player(Info).

get_player_info(OpenId, PtId) ->
    Info = db_game:select_one(game_player, "*", [{open_id, OpenId},{platform_id, PtId}]),
    to_player(Info).

add_player(Player) when is_record(Player, ets_player) ->
    FieldList = record_info(fields, ets_player),
    ValueList = get_player_values(Player),
    ok = db_game:insert(game_player, FieldList, ValueList).

update_player(Player) ->
    [player_id | FieldList] = record_info(fields, ets_player),
    [PlayerId | ValueList] = get_player_values(Player),
    ok = db_game:update(game_player, FieldList, ValueList, player_id, PlayerId).

get_player_values(Player) ->
    [_Name | Values] = tuple_to_list(Player#ets_player{other = 0}),
    Values.

to_player([]) ->
    {ok, []};
to_player(Info) when is_list(Info) ->
    Record = list_to_tuple([ets_player | Info]),
    #ets_player{
        open_id = OpenId,
        avatar_url = AvatarUrl,
        nickname = Nickname
    } = Record,
    {ok, Record#ets_player{
        open_id = tool:to_list(OpenId),
        avatar_url = tool:to_list(AvatarUrl),
        nickname = tool:to_list(Nickname),
        other = undefined
    }};
to_player(Error) ->
    ?ERROR_MSG("get player error ~p", [Error]),
    {error, []}.
