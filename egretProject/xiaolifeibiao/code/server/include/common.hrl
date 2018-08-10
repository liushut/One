%% 这里放头文件必须满足考虑以下问题
%% 1.是否是各个系统公用的定义文件
%% 2.该定义被普遍的在各个地方使用(如果某系统的设计明显有自己定义的一层接口
%% 隔离的话，建议将其他系统需要获取的定义信息通过该系统的接口获得之)
%% 3.是否是一些第三方库的东西，这样可以认为比较稳定，且直接包含
-ifndef(__COMMON_HRL__).
-define(__COMMON_HRL__, true).

-author("server").

-include_lib("stdlib/include/ms_transform.hrl").
-include("printer_define.hrl").
-include("define.hrl").
-include("record.hrl").
-include("ets_define.hrl").
-include("db_define.hrl").
-include("login_define.hrl").

%% 定义几种二进制类型
-define(UINT,   32/unsigned-integer).
-define(INT,    32/signed-integer).
-define(USHORT, 16/unsigned-integer).
-define(SHORT,  16/signed-integer).
-define(UBYTE,  8/unsigned-integer).
-define(BYTE,   8/signed-integer).

%% ===========一些特殊处理相关参数的定义=======
-define(DIFF_SECONDS_1900_1970,     2208988800).
-define(DIFF_SECONDS_0000_1970,     62167219200).
-define(ONE_DAY_SECONDS,            86400).                         %% 一天的时间（秒）
-define(ONE_DAY_MINUTES,            1440).                         %% 一天的分钟
-define(ONE_DAY_HOURS,              24).                         %% 一天的小时
-define(ONE_DAY_MILLISECONDS,       86400000).                        %%一天时间（毫秒）
-define(ONE_HOUR_SECONDS,           3600).                          %%一小时的时间（秒）
-define(FIVE_HOUR,                  18000).                         %%五小时（多个系统的刷新时间）

-endif.
