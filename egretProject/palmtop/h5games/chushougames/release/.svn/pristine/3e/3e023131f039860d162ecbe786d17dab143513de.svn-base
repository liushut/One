%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 02. 五月 2018 16:48
%%%-------------------------------------------------------------------
-module(game_http_handler).

%% API
-export([
    handle/3
]).

-include("common.hrl").
-define(HTTP_HANDLE_PATH_LIST, [
    <<"/shutdown">>,
    <<"/savedata">>
]).

handle(Ip, Path, Request) ->
    case lists:member(Path, ?HTTP_HANDLE_PATH_LIST) of
        true ->
            case config:is_http_ip(Ip) of
                true ->
                    do_handle(Path, Request);
                _ ->
                    <<"close">>
            end;
        _ ->
            skip
    end.

do_handle(<<"/savedata">>, _Request) ->
    <<"success">>;

do_handle(<<"/shutdown">>, _Request) ->
    <<"success">>;

do_handle(Path, Request) ->
    ?WARNING_MSG("Path ~p Req ~p", [Path, Request]),
    <<"unknow">>.
