%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 21. 三月 2018 19:04
%%%-------------------------------------------------------------------
-module(client_handler).

%% API
-export([
    init/1,
    terminate/2
]).

-export([
    router_package/2,
    info/2
]).

-include("common.hrl").
-include("pb_router.hrl").
-define(HEART_BEAT_CHECK_TIMER, 5000).

init(Args) ->
    [Socket, SocketType, Ip, Port] = Args,
    process_flag(trap_exit, true),
    State = #ets_socket_state{
        socket_type = SocketType,
        socket_ip = Ip,
        socket_port = Port,
        socket = Socket,
        pid = self()
    },
    ets:insert(?ETS_SOCKET_STATE, State),
    {ok, State}.

router_package(<<>>, State) ->
    {ok, State};
router_package(<<Length:32, Cmd:16, Body/binary>>, State) ->
    try
        BodySize = byte_size(Body),
        if
            Length < BodySize ->
                ?WARNING_MSG("Length Error ~p", [{Length, BodySize, Cmd}]),
                {ok, State};
            true ->
                <<BodyData:Length/binary, Rest/binary>> = Body,
                NewState =
                    case read_body(Cmd, BodyData) of
                        {_HandleModule, login, Data} ->
                            {ok, NewCState} = mod_player:login(Data, State),
                            NewCState;
                        {HandleModule, Data} when State#ets_socket_state.login_state == ?CLIENT_STATE_LOGIN ->
                            gen_server:cast(State#ets_socket_state.player_pid, {socket_event, {Cmd, HandleModule, Data}}),
                            State;
                        {HandleModule, Data} ->
                            gen_server:cast(State#ets_socket_state.player_pid, {socket_event, {Cmd, HandleModule, Data}}),
                            ?WARNING_MSG("Client Not Login ~p", [State]),
                            State;
                        Unknow ->
                            ?WARNING_MSG("read data error ~p", [Unknow]),
                            State
                    end,
                router_package(Rest, NewState)
        end
    catch
        Error : Reason ->
            ?ERROR_MSG("router package error ~p~n Reason ~p~n Package=~p~n ~p",
                [Error, Reason, {Cmd, Body}, erlang:get_stacktrace()]),
            {ok, State}
    end;
router_package(Bin, State) ->
    ?WARNING_MSG("error package ~p", [Bin]),
    {ok, State}.

read_body(Cmd, Body) ->
    Head = Cmd div 100,
    case maps:get(Head, ?PB_ROUTER_MAP) of
        {ReadModule, HandleModule} ->
            case ReadModule:read(Cmd, Body) of
                {ok, Action, Data} ->
                    {HandleModule, Action, Data};
                {ok, Data} ->
                    {HandleModule, Data};
                Error ->
                    [read_data_error, Error]
            end;
        _ ->
            error
    end.

info({heart_beat_timer}, State) ->
    {ok, State};

info(_Info, State) ->
    {ok, State}.

terminate(Reason, State) ->
    ?PRINT_MSG("Do terminate socket ~p~n~p", [Reason, State]),
    if
        is_pid(State#ets_socket_state.player_pid) ->
            gen_server:cast(State#ets_socket_state.player_pid, {socket_close});
        true ->
            ok
    end,
    ets:delete(?ETS_SOCKET_STATE, self()),
    ok.

