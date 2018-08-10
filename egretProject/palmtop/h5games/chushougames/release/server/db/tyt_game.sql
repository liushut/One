/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1(本地数据库)
Source Server Version : 50635
Source Host           : 127.0.0.1:3306
Source Database       : tyt_game

Target Server Type    : MYSQL
Target Server Version : 50635
File Encoding         : 65001

Date: 2018-05-07 15:45:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `game_orders`
-- ----------------------------
DROP TABLE IF EXISTS `game_orders`;
CREATE TABLE `game_orders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `player_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '玩家Id',
  `open_id` varchar(128) NOT NULL COMMENT '平台账号',
  `platform_id` int(11) NOT NULL COMMENT '平台Id',
  `game_order_id` varchar(128) NOT NULL COMMENT '游戏订单id',
  `pt_order_id` varchar(128) DEFAULT NULL COMMENT '平台回调订单Id',
  `product_id` varchar(64) NOT NULL COMMENT '商品Id',
  `product_name` varchar(64) NOT NULL COMMENT '商品名',
  `pay_amount` int(11) NOT NULL COMMENT '支付金额',
  `unit` varchar(32) NOT NULL COMMENT '支付单位',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态：0未支付,1已支付,2支付失败',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '下单时间',
  `finish_time` int(11) NOT NULL DEFAULT '0' COMMENT '回调时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `game_order_id` (`game_order_id`),
  KEY `player_id` (`player_id`),
  KEY `open_id` (`open_id`),
  KEY `create_time` (`create_time`),
  KEY `finish_time` (`finish_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='游戏支付表';

-- ----------------------------
-- Records of game_orders
-- ----------------------------

-- ----------------------------
-- Table structure for `game_player`
-- ----------------------------
DROP TABLE IF EXISTS `game_player`;
CREATE TABLE `game_player` (
  `player_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '玩家Id',
  `open_id` varchar(128) NOT NULL COMMENT '平台账号',
  `platform_id` int(11) NOT NULL DEFAULT '0' COMMENT '平台Id',
  `nickname` varchar(128) NOT NULL COMMENT '平台昵称',
  `avatar_url` text NOT NULL COMMENT '头像url',
  `gender` tinyint(4) NOT NULL DEFAULT '1' COMMENT '性别：0女,1男',
  `game_state` int(11) NOT NULL DEFAULT '0' COMMENT '当前游戏状态',
  `room_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '当前房间Id',
  `top_score` bigint(20) NOT NULL DEFAULT '0' COMMENT '历史最高分',
  `week_top_score` bigint(20) NOT NULL DEFAULT '0' COMMENT '本周最高分',
  `score` bigint(20) NOT NULL DEFAULT '0' COMMENT '当前分数',
  `play_count` bigint(20) NOT NULL DEFAULT '0' COMMENT '总开局数',
  `week_play_count` bigint(20) NOT NULL DEFAULT '0' COMMENT '本周开局数',
  `register_time` int(11) NOT NULL DEFAULT '0' COMMENT '注册时间',
  `last_login_time` int(11) NOT NULL DEFAULT '0' COMMENT '最后登录时间',
  `other` tinyint(4) NOT NULL DEFAULT '0' COMMENT '内存状态字段',
  PRIMARY KEY (`player_id`),
  UNIQUE KEY `idx_account` (`open_id`,`platform_id`),
  KEY `register_date` (`register_time`),
  KEY `last_login_date` (`last_login_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='玩家表';

-- ----------------------------
-- Records of game_player
-- ----------------------------

-- ----------------------------
-- Table structure for `game_player_id`
-- ----------------------------
DROP TABLE IF EXISTS `game_player_id`;
CREATE TABLE `game_player_id` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(128) NOT NULL COMMENT '平台OpenId',
  `platform_id` int(11) NOT NULL DEFAULT '0' COMMENT '平台Id',
  `register_time` int(11) NOT NULL COMMENT '注册时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_openid_appid` (`open_id`,`platform_id`),
  KEY `idx_register_time` (`register_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='平台自增Id表';

-- ----------------------------
-- Records of game_player_id
-- ----------------------------

-- ----------------------------
-- Table structure for `game_rank`
-- ----------------------------
DROP TABLE IF EXISTS `game_rank`;
CREATE TABLE `game_rank` (
  `player_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '玩家Id',
  `open_id` varchar(128) NOT NULL COMMENT '平台账号',
  `platform_id` int(11) NOT NULL DEFAULT '0' COMMENT '平台Id',
  `top_score` bigint(20) NOT NULL DEFAULT '0' COMMENT '最高分',
  `rank` bigint(20) NOT NULL DEFAULT '0' COMMENT '全站排名',
  `last_update_time` int(11) NOT NULL DEFAULT '0' COMMENT '最后更新时间',
  PRIMARY KEY (`player_id`),
  UNIQUE KEY `open_id` (`open_id`,`platform_id`),
  KEY `last_update_date` (`last_update_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='玩家分数排行表';

-- ----------------------------
-- Records of game_rank
-- ----------------------------

-- ----------------------------
-- Table structure for `log_online`
-- ----------------------------
DROP TABLE IF EXISTS `log_online`;
CREATE TABLE `log_online` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `log_time` int(11) NOT NULL DEFAULT '0' COMMENT '统计时间',
  `ccu` int(11) NOT NULL DEFAULT '0' COMMENT '当前在线',
  PRIMARY KEY (`id`),
  KEY `log_time` (`log_time`)
) ENGINE=InnoDB AUTO_INCREMENT=5050 DEFAULT CHARSET=utf8 COMMENT='实时在线统计表';

-- ----------------------------
-- Records of log_online
-- ----------------------------

-- ----------------------------
-- Table structure for `log_room_data`
-- ----------------------------
DROP TABLE IF EXISTS `log_room_data`;
CREATE TABLE `log_room_data` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '日志id',
  `log_time` int(11) NOT NULL DEFAULT '0' COMMENT '记录时间',
  `room_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '房间id',
  `game_mode` int(11) NOT NULL DEFAULT '0' COMMENT '游戏模式',
  `player_count` int(11) NOT NULL DEFAULT '0' COMMENT '玩家数',
  `players` text COMMENT '玩家详细信息',
  `win_player` bigint(20) NOT NULL DEFAULT '0' COMMENT '胜利玩家Id：0表示平局',
  `start_time` int(11) NOT NULL DEFAULT '0' COMMENT '开始时间',
  `end_time` int(11) NOT NULL DEFAULT '0' COMMENT '结束时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='游戏开局日志表';

-- ----------------------------
-- Records of log_room_data
-- ----------------------------

-- ----------------------------
-- Table structure for `log_statistics`
-- ----------------------------
DROP TABLE IF EXISTS `log_statistics`;
CREATE TABLE `log_statistics` (
  `date_time` int(11) NOT NULL DEFAULT '0' COMMENT '统计时间',
  `dnu` int(11) NOT NULL DEFAULT '0' COMMENT '当日新增',
  `dau` int(11) NOT NULL DEFAULT '0' COMMENT '当日活跃',
  `pcu` int(11) NOT NULL DEFAULT '0' COMMENT '峰值在线',
  `ccu` int(11) NOT NULL DEFAULT '0' COMMENT '当前在线',
  PRIMARY KEY (`date_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='玩家统计表';

-- ----------------------------
-- Records of log_statistics
-- ----------------------------
