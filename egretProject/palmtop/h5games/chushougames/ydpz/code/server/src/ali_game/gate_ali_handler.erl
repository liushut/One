%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 21. 三月 2018 19:04
%%%-------------------------------------------------------------------
-module(gate_ali_handler).

%% API
-export([
    init/1,
    terminate/2
]).

-export([
    router_package/2
    ]).

-export([
    do_router_package/2,
    do_router_ali_package/2
]).

-include("common.hrl").
-include("pb_router.hrl").

init([Socket, SocketType, Host]) ->
    process_flag(trap_exit, true),
    State = #ets_gate_state{
        socket_pid = Socket,
        socket_type = SocketType,
        socket_ip = Host
    },
    ?DEBUG_MSG("Connect State ~p", [State]),
    ets:insert(?ETS_GATE_STATE, State),
    {ok, State}.

router_package(Bin, State) ->
    do_router_ali_package(Bin, State).
%%    do_router_package(Bin, State).

do_router_ali_package(<<>>, State) ->
    {ok, State};
do_router_ali_package(Bin, State) ->
    <<HeadLen:32, Content/binary>> = Bin,
    <<Head:HeadLen/binary, Body/binary>> = Content,
    {_, HeadContent} = mochijson2:decode(Head),
    SocketPid = State#ets_gate_state.socket_pid,
    case pt_ali_head:read(HeadContent) of
        {0, BattleId, OpenId} ->
            read_package(BattleId, OpenId, Body);
        {1, BattleId, [MsgId, PlayerInfos]} ->
            ?PRINT_MSG("HeadContent ~p", [HeadContent]),
            ?PRINT_MSG("Info ~p", [{BattleId, MsgId, PlayerInfos}]),
            {ok, _Pid} = mod_ali_battle:start_battle(State#ets_gate_state.socket_pid, BattleId, PlayerInfos),
            {ok, SendBin} = pt_ali_head:write(1, [BattleId, MsgId, true]),
            lib_send:send_to_sid(SocketPid, SendBin);
        {Cmd, BattleId, Data} ->
            Pid = mod_ali_battle:get_battle_pid(BattleId),
            gen_server:cast(Pid, {battle_socket_event, Cmd, Data});
        _ ->
            ?PRINT_MSG("Recv HeadContent ~p", [HeadContent]),
            ok
    end,
    {ok, State}.

read_package(BattleId, OpenId, <<"{\"opt\": \"echo\"}">>) ->
    Pid = mod_ali_battle:get_battle_pid(BattleId),
    gen_server:cast(Pid, {player_socket_event, OpenId, 11004, battle_ali_handler, [echo]}),
    skip;
read_package(BattleId, OpenId, <<"{\"opt\": \"all\"}">>) ->
    Pid = mod_ali_battle:get_battle_pid(BattleId),
    gen_server:cast(Pid, {player_socket_event, OpenId, 11004, battle_ali_handler, [all]}),
    skip;
read_package(BattleId, OpenId, <<Length:32, Cmd:16, Body/binary>>) ->
    case Body of
        <<BodyData:Length/binary, Rest/binary>> ->
            case read_body(Cmd, BodyData) of
                {HandleModule, Data} ->
                    Pid = mod_ali_battle:get_battle_pid(BattleId),
                    gen_server:cast(Pid, {player_socket_event, OpenId, Cmd, HandleModule, Data});
                _ ->
                    error
            end,
            read_package(BattleId, OpenId, Rest);
        _ ->
            skip
    end;
read_package(_BattleId, _OpenId, _Data) ->
    skip.


do_router_package(<<>>, State) ->
    {ok, State};
do_router_package(<<Length:32, Cmd:16, Body/binary>>, State) ->
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

terminate(_Reason, State) ->
    ?PRINT_MSG("Reason ~p", [_Reason]),
    ets:delete(?ETS_GATE_STATE, State#ets_gate_state.socket_pid),
    ok.

