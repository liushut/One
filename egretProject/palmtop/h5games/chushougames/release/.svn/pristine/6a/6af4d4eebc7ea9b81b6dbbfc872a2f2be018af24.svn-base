%%%-------------------------------------------------------------------
%%% @copyright (C) 2018, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 18. 四月 2018 10:05
%%%-------------------------------------------------------------------
-module(http_recv).

%% API

-export([init/2]).
-export([terminate/3]).

-include("common.hrl").

init(Req, Opts) ->
    QsGet = cowboy_req:parse_qs(Req),
    #{
        path := Path,
        peer := {IpPeer, _}
    } = Req,
    %% TODO 添加白名单处理
    Ip = misc:ip_to_binary(IpPeer),
    {ok, QsPost, Req2} = cowboy_req:read_urlencoded_body(Req),
    HandleModule = config:get_pt_http_handler(),
    ReqList = QsGet ++ QsPost,
    case game_http_handler:handle(Ip, Path, ReqList) of
        skip ->
            Content =
                case catch HandleModule:handle(Path, ReqList) of
                    {'EXIT', Reason} ->
                        ?WARNING_MSG("Handle Error ~p ~p ~p~n ~p",
                            [HandleModule, Path, Reason, erlang:get_stacktrace()]),
                        <<>>;
                    Result ->
                        Result
                end,
            Reply = cowboy_req:reply(200, #{
                <<"content-type">> => <<"text/plain;charset=utf-8">>
            }, Content, Req2),
            {ok, Reply, Opts};
        Content ->
            Reply = cowboy_req:reply(200, #{
                <<"content-type">> => <<"text/plain;charset=utf-8">>
            }, Content, Req2),
            {ok, Reply, Opts}
    end.

terminate(_Reason, _Req, _State) ->
    ok.

