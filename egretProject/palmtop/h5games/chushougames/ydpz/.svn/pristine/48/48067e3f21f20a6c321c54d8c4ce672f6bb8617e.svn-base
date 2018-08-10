%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 09. 三月 2018 15:08
%%%-------------------------------------------------------------------
-module(tcpsocket_recv).

-behaviour(gen_server).

%% API
-export([start/1]).

%% gen_server callbacks
-export([init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3]).

-define(SERVER, ?MODULE).
-include("common.hrl").

-record(tcp_state, {
    tcp_socket,
    handle_state
}).

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @end
%%--------------------------------------------------------------------
-spec(start(Socket :: any()) ->
    {ok, Pid :: pid()} | ignore | {error, Reason :: term()}).
start(Socket) ->
    gen_server:start(?MODULE, Socket, []).

%%%===================================================================
%%% gen_server callbacks
%%%===================================================================

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Initializes the server
%%
%% @spec init(Args) -> {ok, State} |
%%                     {ok, State, Timeout} |
%%                     ignore |
%%                     {stop, Reason}
%% @end
%%--------------------------------------------------------------------
-spec(init(Args :: term()) ->
    {ok, State :: #tcp_state{}} | {ok, State :: #tcp_state{}, timeout() | hibernate} |
    {stop, Reason :: term()} | ignore).
init(Socket) ->
    Host = misc:get_ip(Socket),
    {ok, HandleState} = client_handler:init([self(), tcpsocket, Host]),
    State = #tcp_state{
        tcp_socket = Socket,
        handle_state = HandleState
    },
    async_recv(Socket, 0, ?SOCKET_TIMEOUT),
    {ok, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling call messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_call(Request :: term(), From :: {pid(), Tag :: term()},
    State :: #tcp_state{}) ->
    {reply, Reply :: term(), NewState :: #tcp_state{}} |
    {reply, Reply :: term(), NewState :: #tcp_state{}, timeout() | hibernate} |
    {noreply, NewState :: #tcp_state{}} |
    {noreply, NewState :: #tcp_state{}, timeout() | hibernate} |
    {stop, Reason :: term(), Reply :: term(), NewState :: #tcp_state{}} |
    {stop, Reason :: term(), NewState :: #tcp_state{}}).
handle_call(Info, _From, State) ->
    try
        do_call(Info,_From, State)
    catch
        Error: Reason ->
            ?ERROR_MSG_TRACE("Error~p ~p~n ~p ~nState=~p", [Error, Reason, Info, State]),
            {reply, ok, State}
    end.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling cast messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_cast(Request :: term(), State :: #tcp_state{}) ->
    {noreply, NewState :: #tcp_state{}} |
    {noreply, NewState :: #tcp_state{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #tcp_state{}}).
handle_cast(Info, State) ->
    try
        do_cast(Info, State)
    catch
        Error: Reason ->
            ?ERROR_MSG_TRACE("Error~p ~p~n ~p ~nState=~p", [Error, Reason, Info, State]),
            {noreply, State}
    end.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling all non call/cast messages
%%
%% @spec handle_info(Info, State) -> {noreply, State} |
%%                                   {noreply, State, Timeout} |
%%                                   {stop, Reason, State}
%% @end
%%--------------------------------------------------------------------
-spec(handle_info(Info :: timeout() | term(), State :: #tcp_state{}) ->
    {noreply, NewState :: #tcp_state{}} |
    {noreply, NewState :: #tcp_state{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #tcp_state{}}).
handle_info(Info, State) ->
    try
        do_info(Info, State)
    catch
        Error: Reason ->
            ?ERROR_MSG_TRACE("Error~p ~p~n ~p ~nState=~p", [Error, Reason, Info, State]),
            {noreply, State}
    end.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is called by a gen_server when it is about to
%% terminate. It should be the opposite of Module:init/1 and do any
%% necessary cleaning up. When it returns, the gen_server terminates
%% with Reason. The return value is ignored.
%%
%% @spec terminate(Reason, State) -> void()
%% @end
%%--------------------------------------------------------------------
-spec(terminate(Reason :: (normal | shutdown | {shutdown, term()} | term()),
    State :: #tcp_state{}) -> term()).
terminate(Reason, State) ->
    gate_ali_handler:terminate(Reason, State#tcp_state.handle_state),
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Convert process state when code is changed
%%
%% @spec code_change(OldVsn, State, Extra) -> {ok, NewState}
%% @end
%%--------------------------------------------------------------------
-spec(code_change(OldVsn :: term() | {down, term()}, State :: #tcp_state{},
    Extra :: term()) ->
    {ok, NewState :: #tcp_state{}} | {error, Reason :: term()}).
code_change(_OldVsn, State, _Extra) ->
    {ok, State}.

%%%===================================================================
%%% Internal functions
%%%===================================================================
do_call(_Info, _From, State) ->
    {reply, ok, State}.

do_cast(_Info, State) ->
    {noreply, State}.

do_info({inet_async, Socket, _Ref, {ok, Binary}}, State) ->
    ?PRINT_MSG("Binary~p", [Binary]),
    {ok, NewHandleState} = gate_ali_handler:router_package(Binary, State#tcp_state.handle_state),
    case async_recv(Socket, 0, ?SOCKET_TIMEOUT) of
        {ok, _NewRef} ->
            {noreply, State#tcp_state{handle_state = NewHandleState}};
        Error ->
            ?ERROR_MSG("~p Error ~p~n", [NewHandleState, Error]),
            {stop, normal, State}
    end;

do_info({inet_async, _Socket, _Ref, {error, closed}}, State) ->
    ?DEBUG_MSG("socket close ~p", [State]),
    {stop, normal, State};

do_info({inet_async, _Socket, _Ref, {error, Reason}}, State) ->
    ?WARNING_MSG("Socket Error=~p~n State=~p",
        [erl_posix_msg:message(Reason), State]),
    {stop, normal, State};

do_info({send, Bin}, State) ->
    catch erlang:port_command(State#tcp_state.tcp_socket, Bin, [force]),
    {noreply, State};

do_info({'EXIT', Port, Reason}, State) ->
    ?PRINT_MSG("Port Close=~p ~p", [Port, Reason]),
    {stop, normal, State};

do_info(_Info, State) ->
    {noreply, State}.

%% 异步接收TCP消息接口
async_recv(Sock, Length, Timeout) when is_port(Sock) ->
    case prim_inet:async_recv(Sock, Length, Timeout) of
        {error, Reason} ->
            {error, Reason};
        {ok, Res} ->
            {ok, Res};
        Reason ->
            {error, Reason}
    end.