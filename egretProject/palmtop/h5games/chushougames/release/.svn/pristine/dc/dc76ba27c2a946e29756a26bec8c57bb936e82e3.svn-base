%%%------------------------------------------------	
%%% File    : table_record.erl	
%%%------------------------------------------------  	
-ifndef(__TABLE_RECORD_HRL__).   	
-define(__TABLE_RECORD_HRL__, true). 	
 	
%% game_player ==> ets_player 	
-record(ets_player, {
    player_id = 0,                                    %%玩家Id	
    open_id = "",                                     %%平台账号	
    platform_id = 0,                                  %%平台Id	
    nickname = "",                                    %%平台昵称	
    avatar_url = "",                                  %%头像url	
    gender = 1,                                       %%性别：0女,1男	
    game_state = 0,                                   %%当前游戏状态	
    room_id = 0,                                      %%当前房间Id	
    top_score = 0,                                    %%历史最高分	
    week_top_score = 0,                               %%本周最高分	
    score = 0,                                        %%当前分数	
    play_count = 0,                                   %%总开局数	
    week_play_count = 0,                              %%本周开局数	
    register_time = 0,                                %%注册时间	
    last_login_time = 0,                              %%最后登录时间	
    other = 0                                         %%内存状态字段	
}).	

%% game_rank ==> ets_game_rank 	
-record(ets_game_rank, {
    player_id = 0,                                    %%玩家Id	
    open_id = "",                                     %%平台账号	
    platform_id = 0,                                  %%平台Id	
    top_score = 0,                                    %%最高分	
    rank = 0,                                         %%全站排名	
    last_update_time = 0                              %%最后更新时间	
}).	

%% game_player_id ==> ets_player_id 	
-record(ets_player_id, {
    id = 0,                                           %%	
    open_id = "",                                     %%平台OpenId	
    platform_id = 0,                                  %%平台Id	
    register_time = 0                                 %%注册时间	
}).	

%% game_orders ==> ets_game_orders 	
-record(ets_game_orders, {
    id = 0,                                           %%	
    player_id = 0,                                    %%玩家Id	
    open_id = "",                                     %%平台账号	
    platform_id = 0,                                  %%平台Id	
    game_order_id = "",                               %%游戏订单id	
    pt_order_id = "",                                 %%平台回调订单Id	
    product_id = "",                                  %%商品Id	
    product_name = "",                                %%商品名	
    pay_amount = 0,                                   %%支付金额	
    unit = "",                                        %%支付单位	
    status = 0,                                       %%状态：0未支付,1已支付,2支付失败	
    create_time = 0,                                  %%下单时间	
    finish_time = 0                                   %%回调时间	
}).	

%% log_statistics ==> ets_log_statistics 	
-record(ets_log_statistics, {
    date_time = 0,                                    %%统计时间	
    dnu = 0,                                          %%当日新增	
    dau = 0,                                          %%当日活跃	
    pcu = 0,                                          %%峰值在线	
    ccu = 0                                           %%当前在线	
}).	

%% log_room_data ==> ets_log_room_data 	
-record(ets_log_room_data, {
    id = 0,                                           %%日志id	
    log_time = 0,                                     %%记录时间	
    room_id = 0,                                      %%房间id	
    game_mode = 0,                                    %%游戏模式	
    player_count = 0,                                 %%玩家数	
    players = "",                                     %%玩家详细信息	
    win_player = 0,                                   %%胜利玩家Id：0表示平局	
    start_time = 0,                                   %%开始时间	
    end_time = 0                                      %%结束时间	
}).	


-endif.	
