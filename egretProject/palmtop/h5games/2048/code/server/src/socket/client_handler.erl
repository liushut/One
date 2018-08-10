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
    router_package/2
    ]).

-include("common.hrl").
-include("pb_router.hrl").

init([Socket, SocketType]) ->
    process_flag(trap_exit, true),
    State = #ets_client_state{
        socket_type = SocketType,
        socket = Socket,
        pid = self()
    },
    ets:insert(?ETS_CLIENT_STATE, State),
    {ok, State}.

router_package(Bin, State) ->
    do_router_package(Bin, State).

do_router_package(<<>>, State) ->
    {ok, State};
do_router_package(<<Length:32, Cmd:16, Body/binary>>, State) ->
    ?PRINT_MSG("State ~p", [State]),
    try
        BodySize = byte_size(Body),
        if
            Length < BodySize ->
                ?WARNING_MSG("Length Error ~p", [{Length, BodySize, Cmd}]),
                {ok, State};
            true ->
                <<BodyData:BodySize/binary, Rest/binary>> = Body,
                NewState =
                    case read_body(Cmd, BodyData) of
                        {_HandleModule, login, Data} ->
                            {ok, NewCState} = mod_player:login(Data, State),
                            NewCState;
                        {HandleModule, Data} when State#ets_client_state.login_state == ?CLIENT_STATE_LOGIN ->
                            gen_server:cast(State#ets_client_state.player_pid, {socket_event, {Cmd, HandleModule, Data}}),
                            State;
                        {HandleModule, Data} ->
                            gen_server:cast(State#ets_client_state.player_pid, {socket_event, {Cmd, HandleModule, Data}}),
                            ?WARNING_MSG("Client Not Login ~p", [State]),
                            State;
                        Unknow ->
                            ?ERROR_MSG("read data error ~p", [Unknow]),
                            State
                    end,
                do_router_package(Rest, NewState)
        end
    catch
        Error : Reason ->
            ?ERROR_MSG("router package error ~p~n Reason ~p~n Package=~p~n ~p", [Error, Reason, {Cmd, Body}, erlang:get_stacktrace()]),
            {ok, State}
    end;
do_router_package(Bin, State) ->
    ?WARNING_MSG("error package ~p", [Bin]),
    {ok, State}.

read_body(Cmd, Body) ->
    Head = Cmd div 100,
    case maps:find(Head, ?PB_ROUTER_MAP) of
        {ok, {ReadModule, HandleModule}} ->
            case ReadModule:read(Cmd, Body) of
                {ok, Action, Data} ->
                    {HandleModule, Action, Data};
                {ok, Data} ->
                    {HandleModule, Data};
                Error ->
                    [read_data_error, Error]
            end;
        _ ->
            ?WARNING_MSG("Unknow Msg~p ~p", [Cmd, Body]),
            read_data_error
    end.

terminate(Reason, State) ->
    ?PRINT_MSG("Do terminate socket ~p ~p", [Reason, State]),
    if
        is_pid(State#ets_client_state.player_pid)->
            gen_server:cast(State#ets_client_state.player_pid, {socket_close});
        true ->
            skip
    end,
    ok.

