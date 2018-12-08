-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2018-12-08 14:20:32
-- 服务器版本： 5.7.18
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cAuth`
--

-- --------------------------------------------------------

--
-- 表的结构 `cAppinfo`
--

CREATE TABLE `cAppinfo` (
  `appid` char(36) DEFAULT NULL,
  `secret` char(64) DEFAULT NULL,
  `ip` char(20) DEFAULT NULL,
  `login_duration` int(11) DEFAULT NULL,
  `qcloud_appid` char(64) DEFAULT NULL,
  `session_duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `cAppinfo`
--

INSERT INTO `cAppinfo` (`appid`, `secret`, `ip`, `login_duration`, `qcloud_appid`, `session_duration`) VALUES
('wxeca1b1addbd4197c', '', '111.230.32.244', 1000, '1256680925', 2000);

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) NOT NULL,
  `content` varchar(511) DEFAULT NULL,
  `images` varchar(1023) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `comment`
--

INSERT INTO `comment` (`id`, `user`, `username`, `avatar`, `content`, `images`, `product_id`, `create_time`) VALUES
(4, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '王先统', 'https://wx.qlogo.cn/mmopen/vi_32/EYTFJRGIdn9ZxNribwkYDNq5x36y1IPHRfvhkUWAcawE4VyJZSOxC3x9XiacHGJVV7YpId8QcMFQRenxH4RVo8mw/132', '呼呼', '', 2, '2018-12-08 20:13:33');

-- --------------------------------------------------------

--
-- 表的结构 `cSessionInfo`
--

CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

--
-- 转存表中的数据 `cSessionInfo`
--

INSERT INTO `cSessionInfo` (`open_id`, `uuid`, `skey`, `create_time`, `last_visit_time`, `session_key`, `user_info`) VALUES
('oZ9__0I0KqHHJsw19tLHoQNRyF78', '45690fa7-f93f-464b-9008-ff88d6600f34', '5e5e8de8287164495dfd3b7658ab3871772578e5', '2018-05-07 21:39:22', '2018-12-08 13:20:50', 'V9kpPcTcad2GnHt64xq5mw==', '{\"openId\":\"oZ9__0I0KqHHJsw19tLHoQNRyF78\",\"nickName\":\"王先统\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"Chengdu\",\"province\":\"Sichuan\",\"country\":\"China\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/EYTFJRGIdn9ZxNribwkYDNq5x36y1IPHRfvhkUWAcawE4VyJZSOxC3x9XiacHGJVV7YpId8QcMFQRenxH4RVo8mw/132\",\"watermark\":{\"timestamp\":1543908814,\"appid\":\"wxeca1b1addbd4197c\"}}');

-- --------------------------------------------------------

--
-- 表的结构 `order_product`
--

CREATE TABLE `order_product` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `order_product`
--

INSERT INTO `order_product` (`order_id`, `product_id`, `count`) VALUES
(13, 2, 1),
(14, 2, 1),
(15, 2, 1),
(16, 2, 1),
(19, 3, 1),
(19, 4, 2),
(20, 4, 2),
(21, 3, 1),
(22, 3, 1),
(23, 4, 1);

-- --------------------------------------------------------

--
-- 表的结构 `order_user`
--

CREATE TABLE `order_user` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `order_user`
--

INSERT INTO `order_user` (`id`, `user`, `create_time`) VALUES
(11, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '2018-12-02 21:31:35'),
(12, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '2018-12-02 21:31:36'),
(13, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '2018-12-02 21:35:44'),
(14, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '2018-12-02 21:36:33'),
(15, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '2018-12-02 21:41:11'),
(16, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '2018-12-02 21:42:39'),
(17, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '2018-12-06 09:43:12'),
(18, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '2018-12-06 09:43:13'),
(19, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '2018-12-06 10:38:04'),
(20, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '2018-12-06 11:10:28'),
(21, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '2018-12-06 11:14:01'),
(22, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '2018-12-06 11:16:27'),
(23, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', '2018-12-06 11:17:01');

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL COMMENT 'id',
  `image` varchar(255) NOT NULL COMMENT '图片',
  `name` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '名称',
  `price` decimal(11,2) NOT NULL COMMENT '价格',
  `source` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`id`, `image`, `name`, `price`, `source`) VALUES
(1, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product1.jpg', '钱包', '132.00', '国内·广东'),
(2, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product2.jpg', '金色木吉他', '480.50', '国内·广东'),
(3, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product3.jpg', '红纹铁质装订机', '28.00', '国内·福建'),
(4, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product4.jpg', '新鲜有机青蔬', '30.90', '国内·江苏'),
(5, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product5.jpg', '仿铁盘创意时钟', '45.00', '海外·瑞典'),
(6, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product6.jpg', '新鲜采摘葡萄', '24.80', '国内·新疆'),
(7, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product7.jpg', '果蔬大礼包', '158.00', '海外·新西兰'),
(8, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product8.jpg', '红色复古轿车模型', '35.00', '海外·德国'),
(9, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product9.jpg', '风驰电掣小摩托', '249.00', '国内·浙江'),
(10, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product10.jpg', '筐装大红苹果', '29.80', '国内·山东'),
(11, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product11.jpg', '精装耐用男鞋', '335.00', '国内·广东'),
(12, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product12.jpg', '宗教圣地旅游纪念', '1668.00', '海外·印度'),
(13, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product13.jpg', '高品质原装泵', '2000.80', '国内·河北'),
(14, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product14.jpg', '金刚轱辘圈', '34.00', '国内·辽宁'),
(15, 'https://product-1256680925.cos.ap-chengdu.myqcloud.com/product15.jpg', '万圣节南瓜', '29.90', '海外·美国');

-- --------------------------------------------------------

--
-- 表的结构 `trolley_user`
--

CREATE TABLE `trolley_user` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `trolley_user`
--

INSERT INTO `trolley_user` (`id`, `user`, `count`) VALUES
(3, 'oZ9__0I0KqHHJsw19tLHoQNRyF78', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `cSessionInfo`
--
ALTER TABLE `cSessionInfo`
  ADD PRIMARY KEY (`open_id`),
  ADD KEY `openid` (`open_id`) USING BTREE,
  ADD KEY `skey` (`skey`) USING BTREE;

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`order_id`,`product_id`) USING BTREE,
  ADD KEY `product_link` (`product_id`);

--
-- Indexes for table `order_user`
--
ALTER TABLE `order_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user-order` (`user`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trolley_user`
--
ALTER TABLE `trolley_user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `order_user`
--
ALTER TABLE `order_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- 使用表AUTO_INCREMENT `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id', AUTO_INCREMENT=16;
--
-- 限制导出的表
--

--
-- 限制表 `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_link` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- 限制表 `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `order_link` FOREIGN KEY (`order_id`) REFERENCES `order_user` (`id`),
  ADD CONSTRAINT `product_link` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- 限制表 `trolley_user`
--
ALTER TABLE `trolley_user`
  ADD CONSTRAINT `trolley_link` FOREIGN KEY (`id`) REFERENCES `product` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
