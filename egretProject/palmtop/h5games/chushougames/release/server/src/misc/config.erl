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
    get_pt_handler/0,
    get_pt_http_handler/0,
    get_pt_id/0,
    get_is_room/0,
    get_room_num/0,
    is_http_ip/1,
    get_config/1,
    is_server_open/0,
    set_server_open/1,
    get_app_id/0,
    get_app_key/0
]).

get_pt_handler() ->
    case get_config(platform_handle_moduel) of
        undefined ->
            PtName = get_config(platform_name),
            Handler = tool:to_atom(lists:concat([PtName, "_pt_handler"])),
            set_config(platform_handle_moduel, Handler),
            Handler;
        Handler ->
            Handler
    end.

get_pt_http_handler() ->
    case get_config(platform_http_handle) of
        undefined ->
            PtName = get_config(platform_name),
            Handler = tool:to_atom(lists:concat([PtName, "_http_handler"])),
            set_config(platform_http_handle, Handler),
            Handler;
        Handler ->
            Handler
    end.

get_pt_id() ->
    get_config(platform_id).

get_is_room() ->
    get_config(is_room).

get_room_num() ->
    get_config(room_player_num).

get_app_id() ->
    get_config(app_id).

get_app_key() ->
    get_config(app_key).

is_server_open() ->
    case get_config(is_server_open) of
        IsOpen when is_boolean(IsOpen) ->
            IsOpen;
        _ ->
            false
    end.

set_server_open(IsOpen) ->
    application:set_env(server, is_server_open, IsOpen).


is_http_ip(Ip) ->
    case config:get_config(http_ip) of
        List when is_list(List) ->
            lists:member(Ip, List);
        _ ->
            false
    end.

get_config(Key) ->
    case application:get_env(?SERVER, Key) of
        {ok, Val} ->
            Val;
        undefined ->
            undefined
    end.

set_config(Key, Value) ->
    application:set_env(?SERVER, Key, Value).