%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 12. 三月 2018 11:20
%%%-------------------------------------------------------------------
-module(config).
-define(SERVER, server).

%% API
-export([
    get_config/1,
    get_game_code/0
]).

get_game_code() ->
    get_config(game_code).

get_config(Key) ->
    case application:get_env(?SERVER, Key) of
        {ok, Val} ->
            Val;
        undefined ->
            undefined
    end.
