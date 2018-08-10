%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 21. 三月 2018 9:33
%%%-------------------------------------------------------------------
-module(make_proto).

%% API
-export([start/0]).

-define(PROTO_FILE_DIR, "../../proto/").
-define(OUTPUT_ERL_DIR, "../src/proto/").
-define(OUTPUT_HRL_DIR, "../include/proto/").
-define(GPB_EBIN_DIR, "../deps/gpb/ebin/").

start() ->
    true = code:add_pathz(?GPB_EBIN_DIR),
    Opts = [{o_erl, ?OUTPUT_ERL_DIR},{o_hrl, ?OUTPUT_HRL_DIR}],
    Files = get_files(?PROTO_FILE_DIR),
    [io:format("~p  ~p~n", [FileName, gpb_compile:file(FileName, Opts)]) || FileName <- Files],
    io:format("compile done!~n", []),
    halt().

get_files(Dir) ->
    {ok, Files} = file:list_dir(Dir),
    [filename:join([Dir, File]) || File <- Files, filename:extension(File) == ".proto"].
