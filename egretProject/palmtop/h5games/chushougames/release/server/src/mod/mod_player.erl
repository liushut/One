%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 13. 三月 2018 10:49
%%%-------------------------------------------------------------------
-module(mod_player).

-behaviour(gen_server).
-include("common.hrl").

%% API
-export([
    start/1,
    login/2,
    kick_player/2,
    save_player_data/1
]).

%% gen_server callbacks
-export([init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3]).

-define(SERVER, ?MODULE).

%%%===================================================================
%%% API
%%%===================================================================

save_player_data(Pid) ->
    case gen_server:call(Pid, {save_data}) of
        ok ->
            true;
        Error ->
            ?WARNING_MSG("Save ~p User Data Error ~p", [Pid, Error]),
            fasle
    end.

kick_player(Pid, Reason) ->
    case gen_server:call(Pid, {kick_player, Reason}) of
        ok ->
            true;
        Error ->
            ?WARNING_MSG("Save ~p User Data Error ~p", [Pid, Error]),
            fasle
    end.

login(Data, ClientState) ->
    [OpenId, _, _, AppId, _] = Data,
    %% TODO
    %% 添加校验
    case check_login_data(Data) of
        {true, Nickname, Gender, AvatarUrl} ->
            PlayerId = db_player:get_id_by_open_id(OpenId, config:get_pt_id()),
            PlayerPid =
                case lib_player:get_player_pid(PlayerId) of
                    Pid when is_pid(Pid) ->
                        {ok, Bin} = pt_10:write(10000, [0, PlayerId, OpenId, Nickname, AvatarUrl]),
                        lib_send:send_to_sid(ClientState#ets_socket_state.pid, Bin),
                        gen_server:cast(Pid, {update_socket_pid, ClientState#ets_socket_state.pid}),
                        Pid;
                    _ ->
                        {ok, Pid} = mod_player:start(
                            [ClientState#ets_socket_state.pid, PlayerId, OpenId, AppId, Nickname, Gender, AvatarUrl]),
                        Pid
                end,
            NewClientState = ClientState#ets_socket_state{
                player_id = PlayerId,
                player_pid = PlayerPid,
                login_state = ?CLIENT_STATE_LOGIN,
                open_id = OpenId
            },
            {ok, NewClientState};
        _ ->
            {ok, Bin} = pt_10:write(10000, [3, 0]),
            lib_send:send_to_sid(ClientState#ets_socket_state.pid, Bin),
            {false, ClientState}
    end.

check_login_data([OpenId, Sign, Time, AppId, Params]) ->
    HandleModule = config:get_pt_handler(),
    case check_open_id(OpenId) of
        true ->
            case catch HandleModule:get_user_info(Params) of
                {'EXIT', _} ->
                    false;
                {true, Nickname, Gender, AvatarUrl} ->
                    {true, Nickname, Gender, AvatarUrl};
                _ ->
                    false
            end;
        _ ->
            false
    end.

check_open_id(OpenId) when is_list(OpenId)->
    length(OpenId) > 2;
check_open_id(_) ->
    false.

%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @end
%%--------------------------------------------------------------------
-spec(start(Params::any()) ->
    {ok, Pid :: pid()} | ignore | {error, Reason :: term()}).
start(Params) ->
    gen_server:start(?MODULE, Params, []).

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
    {ok, State :: #ets_player{}} | {ok, State :: #ets_player{}, timeout() | hibernate} |
    {stop, Reason :: term()} | ignore).
init([SocketPid, PlayerId, OpenId, _AppId, Nickname, Gender, AvatarUrl]) ->
    process_flag(trap_exit, true),
    PlatformId = config:get_pt_id(),
    Player = lib_player:init_player([PlayerId, OpenId, PlatformId, Nickname, Gender, AvatarUrl]),
    Other = #player_other{
        socket_pid = SocketPid,
        pid = self()
    },
    NewPlayer = day_login_time(Player#ets_player{
        other = Other
    }),
    ets:insert(?ETS_PLAYER, NewPlayer),
    {ok, Bin} = pt_10:write(10000, [0, PlayerId]),
    lib_send:send_to_player(NewPlayer, Bin),
    {ok, NewPlayer}.


%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling call messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_call(Request :: term(), From :: {pid(), Tag :: term()},
    State :: #ets_player{}) ->
    {reply, Reply :: term(), NewState :: #ets_player{}} |
    {reply, Reply :: term(), NewState :: #ets_player{}, timeout() | hibernate} |
    {noreply, NewState :: #ets_player{}} |
    {noreply, NewState :: #ets_player{}, timeout() | hibernate} |
    {stop, Reason :: term(), Reply :: term(), NewState :: #ets_player{}} |
    {stop, Reason :: term(), NewState :: #ets_player{}}).
handle_call(Request, From, State) ->
    try
        do_call(Request, From, State)
    catch
        Error : Reason ->
            ?ERROR_MSG("do Call Error:~p~nReason:~p", [Error, Reason]),
            {reply, error, State}
    end.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling cast messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_cast(Request :: term(), State :: #ets_player{}) ->
    {noreply, NewState :: #ets_player{}} |
    {noreply, NewState :: #ets_player{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #ets_player{}}).
handle_cast(Request, State) ->
    try
        do_cast(Request, State)
    catch
        Error : Reason ->
            ?ERROR_MSG("do Cast Error:~p~nReason:~p~n~p", [Error, Reason, erlang:get_stacktrace()]),
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
-spec(handle_info(Info :: timeout() | term(), State :: #ets_player{}) ->
    {noreply, NewState :: #ets_player{}} |
    {noreply, NewState :: #ets_player{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #ets_player{}}).
handle_info(Info, State) ->
    try
        do_info(Info, State)
    catch
        Error : Reason ->
            ?ERROR_MSG("do Info Error:~p~nReason:~p", [Error, Reason]),
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
    State :: #ets_player{}) -> term()).
terminate(_Reason, State) ->
    do_close_player(State),
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Convert process state when code is changed
%%
%% @spec code_change(OldVsn, State, Extra) -> {ok, NewState}
%% @end
%%--------------------------------------------------------------------
-spec(code_change(OldVsn :: term() | {down, term()}, State :: #ets_player{},
    Extra :: term()) ->
    {ok, NewState :: #ets_player{}} | {error, Reason :: term()}).
code_change(_OldVsn, State, _Extra) ->
    {ok, State}.

%%%===================================================================
%%% Internal functions
%%%===================================================================
-spec(do_call(Request :: term(), From :: {pid(), Tag :: term()},
    State :: #ets_player{}) ->
    {reply, Reply :: term(), NewState :: #ets_player{}} |
    {reply, Reply :: term(), NewState :: #ets_player{}, timeout() | hibernate} |
    {noreply, NewState :: #ets_player{}} |
    {noreply, NewState :: #ets_player{}, timeout() | hibernate} |
    {stop, Reason :: term(), Reply :: term(), NewState :: #ets_player{}} |
    {stop, Reason :: term(), NewState :: #ets_player{}}).

do_call({kick_player, Reason}, _From, State) ->
    save_data(State),
    {stop, Reason, ok, State};

do_call(_Request, _From, State) ->
    {reply, ok, State}.


-spec(do_cast(Request :: term(), State :: #ets_player{}) ->
    {noreply, NewState :: #ets_player{}} |
    {noreply, NewState :: #ets_player{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #ets_player{}}).
do_cast({update_socket_pid, SocketPid}, State) ->
    Other = State#ets_player.other#player_other{
        socket_pid = SocketPid
    },
    NewState = day_login_time(State#ets_player{
        other = Other
    }),
    ets:insert(?ETS_PLAYER, NewState),
    {noreply, NewState};
do_cast({socket_event, {Cmd, HandleModule, Data}}, State) ->
    NewState =
        case HandleModule:handle(Cmd, State, Data) of
            {ok, NewPlayer} when is_record(NewPlayer, ets_player) ->
                NewPlayer;
            {update, NewPlayer} when is_record(NewPlayer, ets_player) ->
                ets:insert(?ETS_PLAYER, NewPlayer),
                NewPlayer;
            NewPlayer when is_record(NewPlayer, ets_player) ->
                NewPlayer;
            _Other ->
                State
        end,
    {noreply, NewState};
do_cast({socket_close}, State) ->
    ?PRINT_MSG("socket close", []),
    lib_room:send_room_event(State, player_quit, []),
    db_player:update_player(State),
    {stop, normal, State};
do_cast(_Request, State) ->
    {noreply, State}.

-spec(do_info(Info :: timeout() | term(), State :: #ets_player{}) ->
    {noreply, NewState :: #ets_player{}} |
    {noreply, NewState :: #ets_player{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #ets_player{}}).
do_info({daily_timer}, State) ->
    NewState = day_login_time(State),
    ets:insert(?ETS_PLAYER, NewState),
    {noreply, NewState};

do_info(Info, State) ->
    ?PRINT_MSG("Info ~p", [Info]),
    {noreply, State}.

do_close_player(State) ->
    gen_server:cast(global_rank, {update_player_score, State}),
    ets:delete(?ETS_PLAYER, State#ets_player.player_id),
    ok.

day_login_time(State) ->
    WeekStart = util:week_start(),
    NowTime = util:unixtime(),
    if
        State#ets_player.last_login_time > WeekStart ->
            State#ets_player{
                last_login_time = NowTime
            };
        true ->
            State#ets_player{
                week_top_score = 0,
                last_login_time = NowTime
            }
    end.

save_data(_State) ->
    ok.
