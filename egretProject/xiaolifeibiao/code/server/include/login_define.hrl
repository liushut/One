%%%------------------------------------------------
%%% File    : login_define.hrl
%%% Created : 2018-03-08
%%% Description: 登陆相关定义
%%%------------------------------------------------
-ifndef(LOGIN_DEFINE).
-define(LOGIN_DEFINE, true).

-define(CREATE_ROLE_SUCCESS, 1).            %% 创角成功
%% 角色创建失败原因
-define(CREATE_ROLE_FAIL_NAME_EXIST, 2).    %% 角色名已经存在
-define(CREATE_ROLE_FAIL_ROLE_EXIST, 3).    %% 账号已经创建角色
-define(CREATE_ROLE_FAIL_INVAILD_NAME, 4).  %% 名字不合法
-define(CREATE_ROLE_FAIL_DB, 5).            %% DB错误
-define(CREATE_ROLE_FAIL_MAX_COUNT, 6).     %% 最多创角6个
-define(CREATE_ROLE_FAIL_UNLOGIN, 7). %% 账号未登陆
-define(CREATE_ROLE_FAIL_IN_GAME, 8).       %% 账号已进入游戏

-define(CREATE_ROLE_MAX_COUNT, 6).          %% 最多创角6个

-define(LOGIN_SUCCESS, 1).                  %% 登入成功
%% 登陆失败、掉线原因
-define(LOGIN_FAIL_SYS_ERROR, 0).           %% 系统异常导致登陆不上
-define(LOGIN_NO_ROLE, 2).                  %% 登入未创角色
-define(LOGIN_FAIL_SERVICE_NOT_OPNE, 3).    %% 服务器未到开启时间
-define(CLIENT_RECV_PACKET_ERROR, 4).       %% 已经在游戏状态，发送登陆数据包
-define(CLIENT_RECV_ROUTING_ERROR, 5).      %% 玩家数据包错误（未定义协议，WPE改网络包）
-define(CLIENT_RECV_PACKET_SIZE_ERROR, 6).  %% 数据包长度错误
-define(LOGIN_FAIL_VAILD_SIGN, 7).          %% 登陆md5校验不符
-define(LOGIN_FAIL_CREATE_BEFORE_LOGIN, 8). %% 没有登陆直接创建角色
-define(LOGIN_FAIL_ENTER_BEFORE_LOGIN, 9).  %% 没有登陆就进入游戏
-define(LOGIN_FAIL_ENTER_GAME_ERROR, 10).   %% 进入游戏错误（可能是系统原因）
-define(LOGIN_FAIL_USERID_ERROR, 11).       %% 用户Id和不属于该账号
-define(LOGIN_FAIL_SERVER_NOT_EXIST, 12).   %% 服务器不存在
-define(LOGIN_FAIL_RESET_SOCKET_ERROR, 13). %% 重置socket出错
-define(LOGIN_FAIL_CREATE_ERROR, 14).       %% 角色创建错误
-define(LOGIN_FAIL_SERVICE_ERROR, 15).      %% 系统服务关闭中
-define(LOGIN_FAIL_BORBID, 16).             %% 玩家被封号
-define(LOGIN_FAIL_MAX_ONLINE, 17).         %% 服务器人数爆满

-define(DELETE_SUCCESS, 0).                 %% 玩家删除角色成功
-define(DELETE_FAIL_ONLINE, 1).             %% 角色在线
-define(DELETE_FAIL_NO_ROLE, 2).            %% 角色不存在
-define(DELETE_FAIL_TIME_LIMIT, 3).         %% 当前账号今天已删除过角色了，请明天再试

%% 服务端断开客户端原因
-define(KICK_SERVER_DOWN, 1).               %% 服务器关闭
-define(KICK_LOGIN_DUPLICATE, 2).           %% 账号在其他地方登陆
-define(KICK_INFANT, 3).                    %% 账号纳入防沉迷
-define(KICK_ACCOUNT_UNNORMAL, 4).          %% 账号异常(数据问题)
-define(KICK_CLOSE_CONNECT, 5).             %% 断开链接(WPE发包修改数据导致链接断开)
-define(KICK_ACCOUNT_FORBIDDEN, 6).         %% 后台封号
-define(KICK_ACCOUNT_DELETE, 7).            %% 删除角色

%%  其他定义
-define(ETS_CLIENT_RECV_INFO, ets_client_recv_info).        %% 客户端链接ets表
-define(ETS_LOGIN_ERROR_COUNT, ets_login_error_count).      %% 登陆错误统计

-record(login_error_info, {
    error_code = 0,                         %% 登陆错误原因
    today_error_count = 0,                  %% 当天错误次数
    total_error_count = 0,                  %% 服务器启动到现在的错误次数
    today_midnight = 0                      %% 当天0点时间
}).


-endif.
