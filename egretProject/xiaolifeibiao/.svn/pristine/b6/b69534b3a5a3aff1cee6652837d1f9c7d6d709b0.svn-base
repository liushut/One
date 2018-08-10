%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 22. 三月 2018 14:59
%%%-------------------------------------------------------------------
-module(pt_base).

%% API
-export([
    pack/2
]).

-include("common.hrl").
-include("pb_router.hrl").


pack(Cmd, Data) when is_binary(Data) ->
    BodySize = byte_size(Data),
    <<BodySize:32, Cmd:16, Data/binary>>;
pack(Cmd, IoList) ->
    BodySize = iolist_size(IoList),
    [<<BodySize:32, Cmd:16>>, IoList].

