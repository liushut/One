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
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8 COMMENT='游戏支付表';

-- ----------------------------
-- Records of game_orders
-- ----------------------------
