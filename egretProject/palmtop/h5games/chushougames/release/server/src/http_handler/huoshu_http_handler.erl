%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 14. 五月 2018 19:16
%%%-------------------------------------------------------------------
-module(huoshu_http_handler).

%% API
-export([
    handle/2
]).

-include("common.hrl").

handle(Path, Requests) ->
    ?WARNING_MSG("Unknow Path ~p~n~p", [Path, Requests]),
    <<>>.