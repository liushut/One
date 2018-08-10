%%%-----------------------------------
%%% @Module  : websocket_handler
%%% @Description: websocket接收进程
%%%-----------------------------------
-module(websocket_recv).

-export([
    init/2,
    websocket_info/2,
    websocket_init/1,
    websocket_handle/2,
    terminate/3
    ]).

-include("common.hrl").

init(Req, _Opts) ->
    #{
        peer := Host
    } = Req,
    {cowboy_websocket, Req, Host}.

websocket_init(Host) ->
    try
        gate_ali_handler:init([self(), websocket, Host])
    catch
        Error : Reason ->
            ?WARNING_MSG("Error ~p~n Reason ~p", [Error, Reason]),
            error
    end.

websocket_handle(Info, State) ->
    try
        do_websocket_handle(Info, State)
    catch
        Error : Reason ->
            ?WARNING_MSG("Do handle error ~p ~p ~p~n", [Error, Info, Reason]),
            ?WARNING_MSG("~p", [erlang:get_stacktrace()]),
            {ok, State}
    end.


websocket_info({send, SendData}, State) ->
	{reply, {binary, SendData}, State};
websocket_info({send, text, SendData}, State) ->
	{reply, {text, SendData}, State};
websocket_info({timeout, _Ref, Msg}, State) ->
	{reply, {text, Msg}, State};
websocket_info(_Info, State) ->
	{ok, State}.

terminate(Reason, Req, State) ->
    ?DEBUG_MSG("Close Req ~p", [Req]),
    gate_ali_handler:terminate(Reason, State),
    ok.

do_websocket_handle({text, _Msg}, State) ->
    {ok, State};
do_websocket_handle({binary, Binary}, State) ->
    {ok, NewState} = gate_ali_handler:router_package(Binary, State),
    {ok, NewState};
do_websocket_handle(_Data, State) ->
    {ok, State}.
