%% -*- coding: utf-8 -*-
%% Automatically generated, do not edit
%% Generated by gpb_compile version 4.1.3

-ifndef(p11).
-define(p11, true).

-define(p11_gpb_version, "4.1.3").

-ifndef('SC_11009_PB_H').
-define('SC_11009_PB_H', true).
-record(sc_11009,
        {playerId               :: integer()        % = 1, 32 bits
        }).
-endif.

-ifndef('CS_11004_PB_H').
-define('CS_11004_PB_H', true).
-record(cs_11004,
        {
        }).
-endif.

-ifndef('SC_11101_PB_H').
-define('SC_11101_PB_H', true).
-record(sc_11101,
        {result                 :: integer(),       % = 1, 32 bits
         round                  :: integer(),       % = 2, 32 bits
         playerId               :: integer() | undefined, % = 3, 32 bits
         shootData              :: binary() | undefined % = 4
        }).
-endif.

-ifndef('SC_11007_PB_H').
-define('SC_11007_PB_H', true).
-record(sc_11007,
        {result                 :: integer()        % = 1, 32 bits
        }).
-endif.

-ifndef('CS_11008_PB_H').
-define('CS_11008_PB_H', true).
-record(cs_11008,
        {
        }).
-endif.

-ifndef('GAMEPLAYERINFO_PB_H').
-define('GAMEPLAYERINFO_PB_H', true).
-record(gamePlayerInfo,
        {playerId               :: integer(),       % = 1, 32 bits
         score                  :: integer(),       % = 2, 32 bits
         gameInfo               :: binary()         % = 3
        }).
-endif.

-ifndef('SC_11006_PB_H').
-define('SC_11006_PB_H', true).
-record(sc_11006,
        {infos = []             :: [#gamePlayerInfo{}] | undefined % = 1
        }).
-endif.

-ifndef('PLAYERINFO_PB_H').
-define('PLAYERINFO_PB_H', true).
-record(playerInfo,
        {playerId               :: integer(),       % = 1, 32 bits
         openId                 :: iolist(),        % = 2
         nickname               :: iolist(),        % = 3
         avatarUrl              :: iolist(),        % = 4
         gender                 :: iolist(),        % = 5
         isRobot                :: integer() | undefined, % = 6, 32 bits
         battleTimes            :: integer() | undefined % = 7, 32 bits
        }).
-endif.

-ifndef('SC_11003_PB_H').
-define('SC_11003_PB_H', true).
-record(sc_11003,
        {readyTime              :: integer(),       % = 1, 32 bits
         playerInfos = []       :: [#playerInfo{}] | undefined, % = 2
         seeds = []             :: [integer()] | undefined % = 3, 32 bits
        }).
-endif.

-ifndef('CS_11014_PB_H').
-define('CS_11014_PB_H', true).
-record(cs_11014,
        {openId = []            :: [iolist()] | undefined % = 1
        }).
-endif.

-ifndef('SC_11008_PB_H').
-define('SC_11008_PB_H', true).
-record(sc_11008,
        {topScore               :: integer(),       % = 1, 32 bits
         weekScore              :: integer()        % = 2, 32 bits
        }).
-endif.

-ifndef('SC_11010_PB_H').
-define('SC_11010_PB_H', true).
-record(sc_11010,
        {playerId               :: integer(),       % = 1, 32 bits
         processData            :: binary()         % = 2
        }).
-endif.

-ifndef('SC_11012_PB_H').
-define('SC_11012_PB_H', true).
-record(sc_11012,
        {result                 :: integer(),       % = 1, 32 bits
         winPlayerId            :: integer(),       % = 2, 32 bits
         friendRank             :: integer() | undefined, % = 3, 32 bits
         rank                   :: integer() | undefined, % = 4, 32 bits
         reason                 :: integer() | undefined % = 5, 32 bits
        }).
-endif.

-ifndef('CS_11002_PB_H').
-define('CS_11002_PB_H', true).
-record(cs_11002,
        {
        }).
-endif.

-ifndef('SC_11015_PB_H').
-define('SC_11015_PB_H', true).
-record(sc_11015,
        {time                   :: integer(),       % = 1, 32 bits
         millisecond            :: integer()        % = 2, 32 bits
        }).
-endif.

-ifndef('CS_11007_PB_H').
-define('CS_11007_PB_H', true).
-record(cs_11007,
        {
        }).
-endif.

-ifndef('SHOOTPLAYERINFO_PB_H').
-define('SHOOTPLAYERINFO_PB_H', true).
-record(shootPlayerInfo,
        {playerId               :: integer(),       % = 1, 32 bits
         score                  :: integer()        % = 2, 32 bits
        }).
-endif.

-ifndef('SC_11102_PB_H').
-define('SC_11102_PB_H', true).
-record(sc_11102,
        {result                 :: integer(),       % = 1, 32 bits
         round                  :: integer(),       % = 2, 32 bits
         scoreInfos = []        :: [#shootPlayerInfo{}] | undefined, % = 3
         data                   :: binary() | undefined % = 4
        }).
-endif.

-ifndef('CS_11012_PB_H').
-define('CS_11012_PB_H', true).
-record(cs_11012,
        {winPlayerId            :: integer()        % = 1, 32 bits
        }).
-endif.

-ifndef('CS_11011_PB_H').
-define('CS_11011_PB_H', true).
-record(cs_11011,
        {score                  :: integer(),       % = 1, 32 bits
         resultData             :: binary()         % = 2
        }).
-endif.

-ifndef('CS_11006_PB_H').
-define('CS_11006_PB_H', true).
-record(cs_11006,
        {
        }).
-endif.

-ifndef('CS_11102_PB_H').
-define('CS_11102_PB_H', true).
-record(cs_11102,
        {round                  :: integer(),       % = 1, 32 bits
         addScore               :: integer(),       % = 2, 32 bits
         data                   :: binary() | undefined % = 3
        }).
-endif.

-ifndef('SC_11011_PB_H').
-define('SC_11011_PB_H', true).
-record(sc_11011,
        {playerId               :: integer(),       % = 1, 32 bits
         score                  :: integer(),       % = 2, 32 bits
         resultData             :: binary()         % = 3
        }).
-endif.

-ifndef('CS_11010_PB_H').
-define('CS_11010_PB_H', true).
-record(cs_11010,
        {processData            :: binary()         % = 1
        }).
-endif.

-ifndef('CS_11101_PB_H').
-define('CS_11101_PB_H', true).
-record(cs_11101,
        {round                  :: integer(),       % = 1, 32 bits
         shootData              :: binary()         % = 2
        }).
-endif.

-ifndef('SC_11005_PB_H').
-define('SC_11005_PB_H', true).
-record(sc_11005,
        {gameState              :: integer()        % = 1, 32 bits
        }).
-endif.

-ifndef('CS_11005_PB_H').
-define('CS_11005_PB_H', true).
-record(cs_11005,
        {
        }).
-endif.

-ifndef('CS_11015_PB_H').
-define('CS_11015_PB_H', true).
-record(cs_11015,
        {
        }).
-endif.

-ifndef('SC_11002_PB_H').
-define('SC_11002_PB_H', true).
-record(sc_11002,
        {result                 :: integer()        % = 1, 32 bits
        }).
-endif.

-endif.