%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 26. 三月 2018 11:19
%%%-------------------------------------------------------------------
-module(mod_id).

-behaviour(gen_server).
-include("common.hrl").
%% API
-export([
    get_player_id/1,
    get_room_id/1,
    get_room_matchid/1,
    get_msg_id/0
]).

-export([start_link/0]).

%% gen_server callbacks
-export([init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3]).


-define(SERVER, ?MODULE).
-record(state, {
    player_id_index = 1,
    room_id_index = 1
}).

%%%===================================================================
%%% API
%%%===================================================================

get_player_id(OpenId) ->
    case ets:lookup(?ETS_PLAYER_ID, OpenId) of
        [{OpenId, PlayerId} | _] ->
            PlayerId;
        _ ->
            case gen_server:call(?MODULE, {create_player_id, OpenId}, infinity) of
                {ok, PlayerId} ->
                    PlayerId;
                Error ->
                    ?WARNING_MSG("Can not Get PlayerId ~p", [Error]),
                    0
            end
    end.

get_room_id(MatchId) ->
    case ets:lookup(?ETS_ROOM_ID, MatchId) of
        [{MatchId, RoomId} | _] ->
            RoomId;
        _ ->
            case gen_server:call(?MODULE, {create_room_id, MatchId}, infinity) of
                {ok, RoomId} ->
                    RoomId;
                Error ->
                    ?WARNING_MSG("Can not Get RoomId ~p", [Error]),
                    0
            end
    end.

get_msg_id() ->
    case gen_server:call(?MODULE, {create_msg_id}, infinity) of
        {ok, MsgId} ->
            MsgId;
        _ ->
            create_msg_id()
    end.

create_msg_id() ->
    case get(battle_msg_id) of
        MsgId when is_integer(MsgId) ->
            put(battle_msg_id, MsgId + 1);
        _ ->
            Node = config:get_config(node_index),
            <<MsgId:32>> = <<Node:16,1:16>>,
            put(battle_msg_id, MsgId+1),
            MsgId
    end.

get_room_matchid(RoomId) ->
    case ets:match_object(?ETS_ROOM_ID, {'_', RoomId}) of
        [{MatchId, RoomId} | _] ->
            MatchId;
        _ ->
            ""
    end.


%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @end
%%--------------------------------------------------------------------
-spec(start_link() ->
    {ok, Pid :: pid()} | ignore | {error, Reason :: term()}).
start_link() ->
    gen_server:start_link({local, ?SERVER}, ?MODULE, [], []).

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
    {ok, State :: #state{}} | {ok, State :: #state{}, timeout() | hibernate} |
    {stop, Reason :: term()} | ignore).
init([]) ->
    process_flag(trap_exit, true),
    ets:new(?ETS_PLAYER_ID, [{keypos, 1}, named_table, protected, set]),
    ets:new(?ETS_ROOM_ID, [{keypos, 1}, named_table, protected, set]),
    case config:get_config(node_index) of
        NodeIndex when is_integer(NodeIndex) ->
            <<BeginIndex:64>> = <<NodeIndex:16, 1:48>>;
        _ ->
            <<BeginIndex:64>> = <<1:16, 1:48>>
    end,
    misc:write_monitor_pid(self(),?MODULE, {}),
    {ok, #state{
        player_id_index = BeginIndex,
        room_id_index = BeginIndex
        }}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling call messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_call(Request :: term(), From :: {pid(), Tag :: term()},
    State :: #state{}) ->
    {reply, Reply :: term(), NewState :: #state{}} |
    {reply, Reply :: term(), NewState :: #state{}, timeout() | hibernate} |
    {noreply, NewState :: #state{}} |
    {noreply, NewState :: #state{}, timeout() | hibernate} |
    {stop, Reason :: term(), Reply :: term(), NewState :: #state{}} |
    {stop, Reason :: term(), NewState :: #state{}}).
handle_call(Request, From, State) ->
    try
        do_call(Request, From ,State)
    catch
        Error : Reason ->
            ?WARNING_MSG("do call Error ~p ~p~n~p", [Error, Reason, erlang:get_stacktrace()]),
            {reply, ok, State}
    end.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling cast messages
%%
%% @end
%%--------------------------------------------------------------------
-spec(handle_cast(Request :: term(), State :: #state{}) ->
    {noreply, NewState :: #state{}} |
    {noreply, NewState :: #state{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #state{}}).
handle_cast(_Request, State) ->
    {noreply, State}.

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
-spec(handle_info(Info :: timeout() | term(), State :: #state{}) ->
    {noreply, NewState :: #state{}} |
    {noreply, NewState :: #state{}, timeout() | hibernate} |
    {stop, Reason :: term(), NewState :: #state{}}).
handle_info(_Info, State) ->
    {noreply, State}.

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
    State :: #state{}) -> term()).
terminate(_Reason, _State) ->
    misc:delete_monitor_pid(self()),
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Convert process state when code is changed
%%
%% @spec code_change(OldVsn, State, Extra) -> {ok, NewState}
%% @end
%%--------------------------------------------------------------------
-spec(code_change(OldVsn :: term() | {down, term()}, State :: #state{},
    Extra :: term()) ->
    {ok, NewState :: #state{}} | {error, Reason :: term()}).
code_change(_OldVsn, State, _Extra) ->
    {ok, State}.

%%%===================================================================
%%% Internal functions
%%%===================================================================
do_call({create_player_id, OpenId}, _From, State) ->
    case ets:lookup(?ETS_PLAYER_ID, OpenId) of
        [{OpenId, PlayerId} | _] ->
            {reply, {ok, PlayerId}, State};
        _ ->
            NewId = State#state.player_id_index + 1,
            ets:insert(?ETS_PLAYER_ID, {OpenId, NewId}),
            {reply, {ok, NewId}, State#state{player_id_index = NewId}}
    end;

do_call({create_room_id, MatchId}, _From, State) ->
    case ets:lookup(?ETS_ROOM_ID, MatchId) of
        [{MatchId, RoomId} | _] ->
            {reply, {ok, RoomId}, State};
        _ ->
            NewId = State#state.room_id_index + 1,
            ets:insert(?ETS_ROOM_ID, {MatchId, NewId}),
            {reply, {ok, NewId}, State#state{room_id_index = NewId}}
    end;

do_call({create_msg_id}, _From, State) ->
    MsgId = create_msg_id(),
    {reply, {ok, MsgId}, State};

do_call(_Request, _From, State) ->
    {reply, ok, State}.
