%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 25. 四月 2018 19:42
%%%-------------------------------------------------------------------
-module(lib_rank).

-include("common.hrl").
-define(TOP_RANK_NUM, 300).
-define(MIN_TOP_SCORE, min_top_score).

%% API
-export([
    get_total_rank/1,
    get_player_rank/1,
    get_ranks_by_open_ids/1,
    update_rank_player/1,
    update_rank/0,
    init_game_rank/0,
    init_rank/0,
    refresh_rank/0,
    save_rank/0,
    get_top_rank/2
]).
%%
%%-export([
%%    test_init_rank/0,
%%    update_test_player/2
%%]).
%%
%%
%%update_test_player(PlayerId, Score) ->
%%    update_rank_player(#ets_player{
%%        open_id = tool:to_list(PlayerId),
%%        player_id = PlayerId,
%%        platform_id = 10,
%%        week_top_score = Score
%%    }).
%%
%%test_player(PlayerId) ->
%%    Score = util:rand(0, 999),
%%    RankInfo = #ets_game_rank{
%%        player_id = PlayerId,
%%        open_id = tool:to_list(PlayerId),
%%        platform_id = 10,
%%        top_score = Score,
%%        rank = 0,
%%        last_update_time = util:unixtime() + Score + PlayerId
%%    },
%%    ets:insert(?ETS_GAME_RANK, RankInfo).
%%
%%test_init_rank() ->
%%    ets:delete_all_objects(?ETS_GAME_RANK),
%%    lists:foreach(fun test_player/1, lists:seq(1, 20000)).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

init_game_rank() ->
    ets:delete_all_objects(?ETS_GAME_RANK),
    RankList = db_player:get_week_rank(),
    [ets:insert(?ETS_GAME_RANK, One) || One <- RankList].

init_rank()->
    do_init_rank_segment(),
    refresh_top_rank().

do_init_rank_segment() ->
    ets:delete_all_objects(?ETS_RANK_SEGMENT),
    ets:foldl(fun do_init_segment/2, 0, ?ETS_GAME_RANK),
    do_init_segment_rank().
do_init_segment_rank() ->
    Last = ets:last(?ETS_RANK_SEGMENT),
    do_init_segment_rank(Last, 1).
do_init_segment_rank('$end_of_table', _Rank) ->
    ok;
do_init_segment_rank(Key, Rank) ->
    [Segment] = ets:lookup(?ETS_RANK_SEGMENT, Key),
    NewSegment = Segment#ets_rank_segment{
        begin_rank = Rank
    },
    ets:insert(?ETS_RANK_SEGMENT, NewSegment),
    do_init_segment_rank(ets:prev(?ETS_RANK_SEGMENT, Key), Rank + Segment#ets_rank_segment.player_count).

do_init_segment(RankInfo, _) ->
    case ets:lookup(?ETS_RANK_SEGMENT, RankInfo#ets_game_rank.top_score) of
        [Info] ->
            ets:insert(?ETS_RANK_SEGMENT, Info#ets_rank_segment{
                player_count = Info#ets_rank_segment.player_count + 1
            });
        _ ->
            ets:insert(?ETS_RANK_SEGMENT, #ets_rank_segment{
                score = RankInfo#ets_game_rank.top_score, player_count = 1})
    end.
refresh_top_rank() ->
    ets:delete_all_objects(?ETS_PLAYER_TOP_RANK),
    ets:delete_all_objects(?ETS_TOP_RANK_SCORE),
    ets:delete_all_objects(?ETS_TOP_RANK),
    do_refresh_top_rank(ets:last(?ETS_RANK_SEGMENT), 1, ?TOP_RANK_NUM).
do_refresh_top_rank('$end_of_table', Rank, Total) ->
    {Rank, Total};
do_refresh_top_rank(_, Rank, Total) when Rank > Total ->
    {Rank, Total};
do_refresh_top_rank(SegmentKey, Rank, Total) ->
    [Segment] = ets:lookup(?ETS_RANK_SEGMENT, SegmentKey),
    #ets_rank_segment{
        score = Score
    } = Segment,
    PlayerList = lists:sort(fun sort_function/2, ets:match_object(?ETS_GAME_RANK, #ets_game_rank{_='_', top_score = Score})),
    NewRank = lists:foldl(
        fun(Info, OldRank) ->
            NewInfo = Info#ets_game_rank{
                rank = OldRank
            },
            TopRank = #ets_top_rank{
                open_id = NewInfo#ets_game_rank.open_id,
                score = NewInfo#ets_game_rank.top_score,
                rank = OldRank,
                player_id = NewInfo#ets_game_rank.player_id
            },
            ets:insert(?ETS_PLAYER_TOP_RANK, NewInfo),
            ets:insert(?ETS_TOP_RANK, TopRank),
            OldRank + 1
        end, Rank, PlayerList),
    ets:insert(?ETS_TOP_RANK_SCORE, #ets_top_rank_score{
        score = Score
    }),
    Next = ets:prev(?ETS_RANK_SEGMENT, Segment#ets_rank_segment.score),
    do_refresh_top_rank(Next, NewRank, Total).

get_top_rank(OpenId, WeekTopScore) ->
    case get_min_top_score() of
        '$end_of_table' ->
            1;
        MinScore when MinScore > WeekTopScore ->
            get_score_rank(WeekTopScore);
        _ ->
            case ets:lookup(?ETS_PLAYER_TOP_RANK, OpenId) of
                [Info] ->
                    Info#ets_game_rank.rank;
                _ ->
                    get_score_rank(WeekTopScore)
            end
    end.

get_score_rank(Score) ->
    case ets:lookup(?ETS_RANK_SEGMENT, Score) of
        [Segment] ->
            Segment#ets_rank_segment.begin_rank;
        _ ->
            0
    end.

update_rank_segment(OldScore, Score) ->
    case ets:lookup(?ETS_RANK_SEGMENT, Score) of
        [Segment] ->
            NewSegment = Segment#ets_rank_segment{
                player_count = Segment#ets_rank_segment.player_count + 1
            },
            ets:insert(?ETS_RANK_SEGMENT, NewSegment);
        _ ->
            case ets:next(?ETS_RANK_SEGMENT, Score) of
                '$end_of_table' ->
                    Segment = #ets_rank_segment{
                        player_count = 1,
                        begin_rank = 1,
                        score = Score
                    };
                RankScoreKey ->
                    [OldSegment] = ets:lookup(?ETS_RANK_SEGMENT, RankScoreKey),
                    Segment = #ets_rank_segment{
                        score = Score,
                        player_count = 1,
                        begin_rank = OldSegment#ets_rank_segment.begin_rank + OldSegment#ets_rank_segment.player_count
                    }
            end,
            ets:insert(?ETS_RANK_SEGMENT, Segment)
    end,
    HighScore = ets:prev(?ETS_RANK_SEGMENT, Score),
    do_update_rank_segment(OldScore, HighScore).
do_update_rank_segment(LowScore, '$end_of_table') ->
    {LowScore, '$end_of_table'};
do_update_rank_segment(Score, Score) ->
    [Segment] = ets:lookup(?ETS_RANK_SEGMENT, Score),
    NewCount = Segment#ets_rank_segment.player_count - 1,
    if
        NewCount > 0 ->
            NewSegment = Segment#ets_rank_segment{
                player_count = NewCount,
                begin_rank = Segment#ets_rank_segment.begin_rank + 1
            },
            ets:insert(?ETS_RANK_SEGMENT, NewSegment);
        true ->
            ets:delete(?ETS_RANK_SEGMENT, Score)
    end,
    {Score, same};
do_update_rank_segment(LowScore, Score) ->
    case ets:lookup(?ETS_RANK_SEGMENT, Score) of
        [Segment] ->
            NewSegment = Segment#ets_rank_segment{
                begin_rank = Segment#ets_rank_segment.begin_rank + 1
            },
            ets:insert(?ETS_RANK_SEGMENT, NewSegment),
            do_update_rank_segment(LowScore, ets:prev(?ETS_RANK_SEGMENT, Score));
        _ ->
            ?ERROR_MSG("Error Rank Segment ~p Reload Rank", [{LowScore, Score}]),
            %% 未知错误，重新刷新排行榜
            init_rank()
    end.

update_rank_player(Player) ->
    Score = Player#ets_player.week_top_score,
    IsChange = case ets:lookup(?ETS_GAME_RANK, Player#ets_player.open_id) of
        [OldRank] ->
            if
                OldRank#ets_game_rank.top_score >= Score ->
                    false;
                true ->
                    Time = util:unixtime(),
                    NewRank = OldRank#ets_game_rank{
                        top_score = Score,
                        last_update_time = Time
                    },
                    ets:insert(?ETS_GAME_RANK, NewRank),
                    update_rank_segment(OldRank#ets_game_rank.top_score, Score),
                    true
            end;
        _ ->
            Time = util:unixtime(),
            RankInfo = #ets_game_rank{
                player_id = Player#ets_player.player_id,
                open_id = tool:to_list(Player#ets_player.open_id),
                platform_id = Player#ets_player.platform_id,
                top_score = Score,
                rank = 0,
                last_update_time = Time
            },
            ets:insert(?ETS_GAME_RANK, RankInfo),
            update_rank_segment(-1, Score),
            true
    end,
    case IsChange andalso Score > get_min_top_score() of
        true ->
            refresh_top_rank();
        _ ->
            skip
    end.

refresh_rank()->
    WeekStart = util:week_start(),
    Ms = ets:fun2ms(fun(Info) when Info#ets_game_rank.last_update_time > WeekStart -> Info end),
    List = ets:select(?ETS_GAME_RANK, Ms),
    ets:delete_all_objects(?ETS_GAME_RANK),
    [ets:insert(?ETS_GAME_RANK, One) || One <- List].


get_min_top_score() ->
    case ets:first(?ETS_TOP_RANK_SCORE) of
        '$end_of_table' ->
            0;
        MinScore ->
            MinScore
    end.

save_rank() ->
    db_game:delete_all(game_rank),
    List = ets:tab2list(?ETS_GAME_RANK),
    db_player:update_rank(List).

update_rank() ->
    WeekStart = util:week_start(),
    Ms = ets:fun2ms(fun(Info) when Info#ets_game_rank.last_update_time > WeekStart -> Info end),
    List = rank_player(ets:select(?ETS_GAME_RANK, Ms)),
    ets:delete_all_objects(?ETS_GAME_RANK),
    [ets:insert(?ETS_GAME_RANK, One) || One <- List].

get_player_rank(OpenId) ->
    case ets:lookup(?ETS_GAME_RANK, OpenId) of
        [PlayerRank] ->
            PlayerRank;
        _ ->
            []
    end.

get_ranks_by_open_ids(OpenIds) ->
    get_ranks_by_open_ids(OpenIds, []).

get_ranks_by_open_ids([], List) ->
    rank_player(List);
get_ranks_by_open_ids([OpenId | Tail], List) ->
    case get_player_rank(OpenId) of
        [] ->
            RankPlayer = #ets_game_rank{
                player_id = 0,
                open_id = OpenId,
                platform_id = 0,
                top_score = 0,
                last_update_time = 0
            };
        RankPlayer ->
            RankPlayer
    end,
    get_ranks_by_open_ids(Tail, [RankPlayer | List]).

get_total_rank(Count) ->
    Ms = ets:fun2ms(fun(Info) when Info#ets_top_rank.rank =< Count -> Info end),
    ets:select(?ETS_TOP_RANK, Ms).

rank_player(RankPlayers) ->
    List = lists:sort(fun sort_function/2, RankPlayers),
    rank_player(List, [], 1, -1).

rank_player([], NewList, _Rank, _MaxCount) ->
    lists:reverse(NewList);
rank_player([RankPlayer | Tail], List, Rank, MaxCount) ->
    if
        MaxCount > 0 andalso MaxCount =< Rank ->
            rank_player([], [RankPlayer#ets_game_rank{rank = Rank} | List], Rank + 1, MaxCount);
        true ->
            rank_player(Tail, [RankPlayer#ets_game_rank{rank = Rank} | List], Rank + 1, MaxCount)
    end.

sort_function(A, B) ->
    if
        A#ets_game_rank.top_score > B#ets_game_rank.top_score ->
            true;
        A#ets_game_rank.top_score == B#ets_game_rank.top_score ->
            A#ets_game_rank.last_update_time < B#ets_game_rank.last_update_time;
        true ->
            false
    end.

