%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 14. 三月 2018 16:37
%%%-------------------------------------------------------------------
-module(mod_room).

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
-define(DIC_ROOM_PLAYER, dic_room_player).
-define(ROOM_CLOSE_TIMER, 600000).

-include("common.hrl").

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @end
%%--------------------------------------------------------------------
-spec(start(RoomId :: any()) ->
    {ok, Pid :: pid()} | ignore | {error, Reason :: term()}).
start(RoomId) ->
    gen_server:start(?MODULE, [RoomId], []).

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
    {ok, State :: #ets_room{}} | {ok, State :: #ets_room{}, timeout() | hibernate} |
    {stop, Reason :: term()} | ignore).
init([RoomId]) ->
    MatchId = mod_id:get_room_matchid(RoomId),
    Room = #ets_room{
        room_id = RoomId,
        pid = self(),
        room_game_state = ?ROOM_GAME_STATE_NOT_START,
        start_time = util:unixtime(),
        match_id = MatchId
    },
    erlang:send_after(?ROOM_CLOSE_TIMER, self(), {force_close}),
    ets:insert(?ETS_ROOM, Room),
    {ok, Room}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling call messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_call(Request :: term(), From :: {pid(), Tag :: term()},
    State :: #ets_room{}) ->
    {reply, Reply :: term(), NewState :: #ets_room{}} |
    {reply, Reply :: term(), NewState :: #ets_room{}, timeout() | hibernate} |
    {noreply, NewState :: #ets_room{}} |
    {noreply, NewState :: #ets_room{}, timeout() | hibernate} |
    {stop, Reason :: term(), Reply :: term(), NewState :: #ets_room{}} |
    {stop, Reason :: term(), NewState :: #ets_room{}}).
handle_call(_Request, _From, State) ->
    {reply, ok, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling cast messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_cast(Request :: term(), State :: #ets_room{}) ->
    {noreply, NewState :: #ets_room{}} |
    {noreply, NewState :: #ets_room{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #ets_room{}}).
handle_cast(Request, State) ->
    try
        do_cast(Request, State)
    catch
        Error : Reason ->
            ?ERROR_MSG("Do Cast Error ~p~p~n ~p", [Error, Reason, erlang:get_stacktrace()]),
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
-spec(handle_info(Info :: timeout() | term(), State :: #ets_room{}) ->
    {noreply, NewState :: #ets_room{}} |
    {noreply, NewState :: #ets_room{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #ets_room{}}).
handle_info(Info, State) ->
    try
        do_info(Info, State)
    catch
        Error : Reason ->
            ?WARNING_MSG("Error ~p ~p~n ~p", [Error, Reason, erlang:get_stacktrace()]),
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
    State :: #ets_room{}) -> term()).
terminate(_Reason, State) ->
    ets:delete(?ETS_ROOM, State#ets_room.room_id),
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Convert process state when code is changed
%%
%% @spec code_change(OldVsn, State, Extra) -> {ok, NewState}
%% @end
%%--------------------------------------------------------------------
-spec(code_change(OldVsn :: term() | {down, term()}, State :: #ets_room{},
    Extra :: term()) ->
    {ok, NewState :: #ets_room{}} | {error, Reason :: term()}).
code_change(_OldVsn, State, _Extra) ->
    {ok, State}.

%%%===================================================================
%%% handle functions
%%%===================================================================

do_cast({player_room_event, Event, PlayerStatus, Args}, State) ->
    case room_handler:handle(Event, State, PlayerStatus, Args) of
        {ok, NewState} when is_record(NewState, ets_room) ->
            ok;
        NewState when is_record(NewState, ets_room) ->
            ok;
        _ ->
            NewState = State
    end,
    {noreply, NewState};

do_cast({player_enter_room, Player}, State) ->
    RoomPlayer = lib_room_internal:player_to_room_player(Player),
    lib_room_internal:update_room_player(RoomPlayer),
    {ok, Bin} = pt_10:write(10001, [0, State#ets_room.room_id, State#ets_room.match_id]),
    lib_send:send_to_player(Player, Bin),
    ?PRINT_MSG("player enter room ~p", [Player]),
    {noreply, State};

do_cast({player_ready, Player}, State) ->
    case lib_room_internal:get_room_player(Player#ets_player.player_id) of
        [] ->
            Result = 1;
        RoomPlayer ->
            if
                RoomPlayer#room_player.game_state < ?PLAYER_STATE_INGAME ->
                    NewRoomPlayer = RoomPlayer#room_player{
                        game_state = ?PLAYER_STATE_READY
                    },
                    Result = 0,
                    lib_room_internal:update_room_player(NewRoomPlayer);
                true ->
                    Result = 3
            end
    end,
    {ok, Bin} = pt_11:write(11002, Result),
    lib_send:send_to_player(Player, Bin),
    case lib_room_internal:check_room_player_ready() of
        true ->
            lib_room_internal:begin_set_player_state();
        _ ->
            ok
    end,
    {noreply, State};

do_cast({send_to_room, Bin}, State) ->
    lib_room_internal:send_to_room(Bin),
    {noreply, State};

do_cast(Info, State) ->
    ?WARNING_MSG("cast unknow message ~p~n~p", [Info, State]),
    {noreply, State}.


do_info({force_close}, State) ->
    {noreply, State};

do_info({room_close}, State) ->
    {stop, normal, State};

do_info(_Info, State) ->
    {noreply, State}.

%%%===================================================================
%%% Internal functions
%%%===================================================================

