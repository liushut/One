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

-record(ws_state, {
    web_socket,
    handle_state
}).

init(Req, _Opts) ->
    #{
        peer := HostInfo
    } = Req,
    {cowboy_websocket, Req, HostInfo}.

websocket_init(Host) ->
    try
        case Host of
            {TIp, Port} ->
                Ip = inet:ntoa(TIp),
                Port;
            _ ->
                Ip = "",
                Port = 0
        end,
        {ok, HandleState} = client_handler:init([self(), websocket, Ip, Port]),
        State = #ws_state{
            web_socket = self(),
            handle_state = HandleState
        },
        {ok, State}
    catch
        Error : Reason ->
            ?WARNING_MSG("Error ~p~n Reason ~p", [Error, Reason]),
            ?WARNING_MSG("~p",[erlang:get_stacktrace()]),
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
websocket_info({socket_close}, State) ->
    {stop, State};
websocket_info(Info, State) ->
    case client_handler:info(Info, State#ws_state.handle_state) of
        {ok, NewState} ->
            ok;
        NewState when is_record(NewState, ets_socket_state) ->
            ok;
        _ ->
            NewState = State#ws_state.handle_state
    end,
	{ok, State#ws_state{handle_state = NewState}}.

terminate(Reason, _Req, State) ->
    client_handler:terminate(Reason, State#ws_state.handle_state),
    ok.

do_websocket_handle({text, _Msg}, State) ->
    {ok, State};
do_websocket_handle({binary, Binary}, State) ->
    {ok, NewState} = client_handler:router_package(Binary, State#ws_state.handle_state),
    {ok, State#ws_state{handle_state = NewState}};
do_websocket_handle(_Data, State) ->
    {ok, State}.
