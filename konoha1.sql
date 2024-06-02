-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               8.0.33 - MySQL Community Server - GPL
-- Операционная система:         Win64
-- HeidiSQL Версия:              12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Дамп структуры базы данных konoha
CREATE DATABASE IF NOT EXISTS `konoha` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `konoha`;

-- Дамп структуры для таблица konoha.chatlist_history
CREATE TABLE IF NOT EXISTS `chatlist_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cHash` varchar(500) DEFAULT NULL,
  `owner` varchar(500) DEFAULT NULL,
  `chatWith` varchar(500) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Дамп данных таблицы konoha.chatlist_history: ~0 rows (приблизительно)

-- Дамп структуры для таблица konoha.chat_u2u
CREATE TABLE IF NOT EXISTS `chat_u2u` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender` varchar(200) DEFAULT NULL,
  `companion` varchar(200) NOT NULL,
  `created_at` bigint DEFAULT NULL,
  `plain_message` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'CURDATE()',
  `status` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  `message_hash` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

-- Дамп данных таблицы konoha.chat_u2u: ~16 rows (приблизительно)
INSERT INTO `chat_u2u` (`id`, `sender`, `companion`, `created_at`, `plain_message`, `status`, `type`, `message_hash`) VALUES
	(1, 'jujutsu_kaisen', 'bleach_fandom', 1717108182259, 'Bababoi', 2, 0, 'eyJkYXRlIjoxNzE3MTA4MTgyMjU4LCJzdHIiOiI0ZWJjbyIsImRhdGEiOnsidGV4dCI6MC42NDUyMDU1MzQ2Mjc1MjAxLCJjb21wYW5pb24iOiJibGVhY2hfZmFuZG9tIiwiZGF0ZSI6MTcxNzEwODE4MjI1OH19'),
	(2, 'bleach_fandom', 'jujutsu_kaisen', 1717108196673, 'zxc', 3, 0, 'eyJkYXRlIjoxNzE3MTA4MTk2NjczLCJzdHIiOiI1OGhkcSIsImRhdGEiOnsidGV4dCI6MC41MDUyODc2NzgzMjQ3NjEzLCJjb21wYW5pb24iOiJqdWp1dHN1X2thaXNlbiIsImRhdGUiOjE3MTcxMDgxOTY2NzN9fQ=='),
	(3, 'bleach_fandom', 'jujutsu_kaisen', 1717108206212, 'zxczxc\nzx\nzxc\nzx\nzxc', 3, 0, 'eyJkYXRlIjoxNzE3MTA4MjA2MjEyLCJzdHIiOiI1OGhkcSIsImRhdGEiOnsidGV4dCI6MC40MTg2ODQzNDc2MTIyMDE1LCJjb21wYW5pb24iOiJqdWp1dHN1X2thaXNlbiIsImRhdGUiOjE3MTcxMDgyMDYyMTJ9fQ=='),
	(4, 'jujutsu_kaisen', 'bleach_fandom', 1717108210035, 'zxczxczxcz', 2, 0, 'eyJkYXRlIjoxNzE3MTA4MjEwMDM0LCJzdHIiOiI0ZWJjbyIsImRhdGEiOnsidGV4dCI6MC4wNDI2MDUyMDY5Nzk0MjIwNSwiY29tcGFuaW9uIjoiYmxlYWNoX2ZhbmRvbSIsImRhdGUiOjE3MTcxMDgyMTAwMzR9fQ=='),
	(5, 'jujutsu_kaisen', 'bleach_fandom', 1717108213122, 'zxczxczx', 2, 0, 'eyJkYXRlIjoxNzE3MTA4MjEzMTIyLCJzdHIiOiI0ZWJjbyIsImRhdGEiOnsidGV4dCI6MC43MTc5OTEyNDQwNjYxNjYyLCJjb21wYW5pb24iOiJibGVhY2hfZmFuZG9tIiwiZGF0ZSI6MTcxNzEwODIxMzEyMn19'),
	(6, 'bleach_fandom', 'jujutsu_kaisen', 1717108364060, 'asdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasda', 3, 0, 'eyJkYXRlIjoxNzE3MTA4MzY0MDYwLCJzdHIiOiI1OGhkcSIsImRhdGEiOnsidGV4dCI6MC4yNTgzMDM5NTkwNzU3NDE0NCwiY29tcGFuaW9uIjoianVqdXRzdV9rYWlzZW4iLCJkYXRlIjoxNzE3MTA4MzY0MDYwfX0='),
	(7, 'jujutsu_kaisen', 'bleach_fandom', 1717108375317, 'asdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasda', 2, 0, 'eyJkYXRlIjoxNzE3MTA4Mzc1MzE2LCJzdHIiOiI0ZWJjbyIsImRhdGEiOnsidGV4dCI6MC44MTQ4NzU4OTIyNDI1Mjk5LCJjb21wYW5pb24iOiJibGVhY2hfZmFuZG9tIiwiZGF0ZSI6MTcxNzEwODM3NTMxNn19'),
	(8, 'jujutsu_kaisen', 'bleach_fandom', 1717108379216, 'bleach_fandom at 01:32: asdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassada', 2, 0, 'eyJkYXRlIjoxNzE3MTA4Mzc5MjE1LCJzdHIiOiI0ZWJjbyIsImRhdGEiOnsidGV4dCI6MC42NTg5MzQwOTQwMDExNDYxLCJjb21wYW5pb24iOiJibGVhY2hfZmFuZG9tIiwiZGF0ZSI6MTcxNzEwODM3OTIxNX19'),
	(9, 'jujutsu_kaisen', 'bleach_fandom', 1717108380713, 'bleach_fandom at 01:32: asdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassada', 2, 0, 'eyJkYXRlIjoxNzE3MTA4MzgwNzEyLCJzdHIiOiI0ZWJjbyIsImRhdGEiOnsidGV4dCI6MC4wOTA4MjY1NjMyODI1MTY3LCJjb21wYW5pb24iOiJibGVhY2hfZmFuZG9tIiwiZGF0ZSI6MTcxNzEwODM4MDcxMn19'),
	(10, 'jujutsu_kaisen', 'bleach_fandom', 1717108382078, 'bleach_fandom at 01:32: asdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassada', 2, 0, 'eyJkYXRlIjoxNzE3MTA4MzgyMDc3LCJzdHIiOiI0ZWJjbyIsImRhdGEiOnsidGV4dCI6MC42ODM1OTg1MjYyNTc4MTQ2LCJjb21wYW5pb24iOiJibGVhY2hfZmFuZG9tIiwiZGF0ZSI6MTcxNzEwODM4MjA3N319'),
	(11, 'jujutsu_kaisen', 'bleach_fandom', 1717108383735, 'bleach_fandom at 01:32: asdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassada', 2, 0, 'eyJkYXRlIjoxNzE3MTA4MzgzNzM1LCJzdHIiOiI0ZWJjbyIsImRhdGEiOnsidGV4dCI6MC43Njg4NDU4NTQ1OTUyNzAxLCJjb21wYW5pb24iOiJibGVhY2hfZmFuZG9tIiwiZGF0ZSI6MTcxNzEwODM4MzczNH19'),
	(12, 'jujutsu_kaisen', 'bleach_fandom', 1717108386480, 'bleach_fandom at 01:32: asdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassada', 2, 0, 'eyJkYXRlIjoxNzE3MTA4Mzg2NDgwLCJzdHIiOiI0ZWJjbyIsImRhdGEiOnsidGV4dCI6MC44OTU1NTU2ODE4MTE1MzA0LCJjb21wYW5pb24iOiJibGVhY2hfZmFuZG9tIiwiZGF0ZSI6MTcxNzEwODM4NjQ4MH19'),
	(13, 'jujutsu_kaisen', 'bleach_fandom', 1717108392583, 'bleach_fandom at 01:32: asdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassadaasdasdasdasassada', 2, 0, 'eyJkYXRlIjoxNzE3MTA4MzkyNTgzLCJzdHIiOiI0ZWJjbyIsImRhdGEiOnsidGV4dCI6MC4yMjY5NzY2NDU4OTc2MTU5LCJjb21wYW5pb24iOiJibGVhY2hfZmFuZG9tIiwiZGF0ZSI6MTcxNzEwODM5MjU4M319'),
	(14, 'tokyo_ghoul', 'bleach_fandom', 1717342869567, 'abababa', 2, 0, 'eyJkYXRlIjoxNzE3MzQyODY5NTY2LCJzdHIiOiIzcmg3cCIsImRhdGEiOnsidGV4dCI6MC4xNTk3OTEwMzY0NjM3Mjk2LCJjb21wYW5pb24iOiJibGVhY2hfZmFuZG9tIiwiZGF0ZSI6MTcxNzM0Mjg2OTU2Nn19'),
	(15, 'tokyo_ghoul', 'bleach_fandom', 1717342871769, 'ababbaabababababa', 2, 0, 'eyJkYXRlIjoxNzE3MzQyODcxNzY4LCJzdHIiOiIzcmg3cCIsImRhdGEiOnsidGV4dCI6MC45NDQzNTcxMTMzOTkzNTA3LCJjb21wYW5pb24iOiJibGVhY2hfZmFuZG9tIiwiZGF0ZSI6MTcxNzM0Mjg3MTc2OH19'),
	(16, 'tokyo_ghoul', 'bleach_fandom', 1717342875373, 'badczdcsdcdbadczdcsdcdbadczdcsdcdbadczdcsdcdbadczdcsdcdbadczdcsdcdbadczdcsdcdbadczdcsdcd', 2, 0, 'eyJkYXRlIjoxNzE3MzQyODc1MzczLCJzdHIiOiIzcmg3cCIsImRhdGEiOnsidGV4dCI6MC4yNzcxMzY4NzcxMTI2Mjc3LCJjb21wYW5pb24iOiJibGVhY2hfZmFuZG9tIiwiZGF0ZSI6MTcxNzM0Mjg3NTM3M319');

-- Дамп структуры для таблица konoha.chat_urls
CREATE TABLE IF NOT EXISTS `chat_urls` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_1` varchar(500) NOT NULL,
  `user_2` varchar(500) NOT NULL,
  `socket_URL` varchar(500) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Дамп данных таблицы konoha.chat_urls: ~0 rows (приблизительно)

-- Дамп структуры для таблица konoha.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `creator` longtext,
  `comment_hash` longtext,
  `post_hash` longtext,
  `comment_string` longtext,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Дамп данных таблицы konoha.comments: ~1 rows (приблизительно)
INSERT INTO `comments` (`id`, `creator`, `comment_hash`, `post_hash`, `comment_string`, `created_at`, `updated_at`) VALUES
	(2, 'tokyo_ghoul', '$2a$08$jrX59Cu.tUWOlUt0awEy7eG.P6XaGHxzxaDVVqkgo2M1.5TVS3Aei', '$2a$08$Yhj.toVBTyS80B6XBBwEw.J7DXj.JRLSIghK7M5T2oiD1mJITqaBC', 'bababoi', '2024-06-02 18:30:54.097', '2024-06-02 18:30:54.097');

-- Дамп структуры для таблица konoha.likes
CREATE TABLE IF NOT EXISTS `likes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `creator` longtext,
  `post_hash` longtext,
  `initiator` longtext,
  `created_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

-- Дамп данных таблицы konoha.likes: ~16 rows (приблизительно)
INSERT INTO `likes` (`id`, `creator`, `post_hash`, `initiator`, `created_at`) VALUES
	(1, 'naruto_fandom', '$2a$08$wm7zbGuDqHyuUJKj9xuq1uqfxojYyqO.fApxdI2d4HJpqhdKhtK6K', 'naruto_fandom', '2024-05-31 01:03:30.992'),
	(2, 'naruto_fandom', '$2a$08$wm7zbGuDqHyuUJKj9xuq1uqfxojYyqO.fApxdI2d4HJpqhdKhtK6K', 'bleach_fandom', '2024-05-31 01:25:23.050'),
	(3, 'attack_on_titan_fandom', '$2a$08$sYDZSAEOz91zCeKf.HnNCOGNsv93JcAIlRhGd931iqed98.2rwWpy', 'bleach_fandom', '2024-05-31 01:28:42.198'),
	(4, 'attack_on_titan_fandom', '$2a$08$jKFtlubn.osfl0EHJPtpP.kYU2rvdhJechkBfCT8QGrjJb1XaCuqW', 'bleach_fandom', '2024-05-31 01:28:44.638'),
	(5, 'attack_on_titan_fandom', '$2a$08$Y8uLqhkNX5N3uzfiuAS...eqiEMP4bzvDlW0W2TzGQiB.3m.VZBve', 'bleach_fandom', '2024-05-31 01:28:45.924'),
	(6, 'jujutsu_kaisen', '$2a$08$zICIiVhWnBqYOPB8umGWjeQ.sh5FmOZKKWzSeCzZ6TLPhDho6TyHa', 'bleach_fandom', '2024-05-31 01:28:47.081'),
	(7, 'jujutsu_kaisen', '$2a$08$e0iIJHWO1fXaKhoMgqlADevsBJv0KpUpkGSFwKGA1GH9VNSAwjDbC', 'bleach_fandom', '2024-05-31 01:28:48.279'),
	(8, 'bleach_fandom', '$2a$08$J2sPfJcATuNjS4etCtEVvOD5HIz4hAmBtifu.6ngGj6alQsDtfXg.', 'bleach_fandom', '2024-05-31 01:33:44.621'),
	(9, 'bleach_fandom', '$2a$08$UZ8IQRWiA00ZBP.4vIa3M.TP.PBowFtmPjN4FFhfGYbiu5L3wWhKi', 'bleach_fandom', '2024-05-31 01:33:47.187'),
	(10, 'bleach_fandom', '$2a$08$g7730S8V6wKW05ea8Re2aODy0U4xYoEGMh.KErt.FB.Zg8.WDBMXi', 'bleach_fandom', '2024-05-31 01:33:50.107'),
	(11, 'bleach_fandom', '$2a$08$3rbrFM04VGXf6.Bk3VSO6.H9jlcCMUxWZeRYcFCBo9naCx437RmcO', 'bleach_fandom', '2024-05-31 01:33:52.371'),
	(12, 'tokyo_ghoul', '$2a$08$Yhj.toVBTyS80B6XBBwEw.J7DXj.JRLSIghK7M5T2oiD1mJITqaBC', 'tokyo_ghoul', '2024-06-02 18:21:52.451'),
	(13, 'bleach_fandom', '$2a$08$3rbrFM04VGXf6.Bk3VSO6.H9jlcCMUxWZeRYcFCBo9naCx437RmcO', 'tokyo_ghoul', '2024-06-02 18:42:16.514'),
	(14, 'bleach_fandom', '$2a$08$g7730S8V6wKW05ea8Re2aODy0U4xYoEGMh.KErt.FB.Zg8.WDBMXi', 'tokyo_ghoul', '2024-06-02 18:42:18.394'),
	(15, 'bleach_fandom', '$2a$08$UZ8IQRWiA00ZBP.4vIa3M.TP.PBowFtmPjN4FFhfGYbiu5L3wWhKi', 'tokyo_ghoul', '2024-06-02 18:42:19.496'),
	(16, 'bleach_fandom', '$2a$08$J2sPfJcATuNjS4etCtEVvOD5HIz4hAmBtifu.6ngGj6alQsDtfXg.', 'tokyo_ghoul', '2024-06-02 18:42:21.323');

-- Дамп структуры для таблица konoha.notifications
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `holder` longtext,
  `text` longtext,
  `author` longtext,
  `created_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Дамп данных таблицы konoha.notifications: ~0 rows (приблизительно)

-- Дамп структуры для таблица konoha.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `owner` longtext,
  `type` bigint unsigned DEFAULT NULL,
  `image` longtext,
  `video` longtext,
  `text` longtext,
  `caption` longtext,
  `like_id` longtext,
  `date_of_creation` datetime(3) DEFAULT NULL,
  `data_count` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;

-- Дамп данных таблицы konoha.posts: ~17 rows (приблизительно)
INSERT INTO `posts` (`id`, `owner`, `type`, `image`, `video`, `text`, `caption`, `like_id`, `date_of_creation`, `data_count`) VALUES
	(1, 'naruto_fandom', 2, '$2a$08$wm7zbGuDqHyuUJKj9xuq1uqfxojYyqO.fApxdI2d4HJpqhdKhtK6K', NULL, NULL, 'Naruto Uzumaki (Japanese: うずまき ナルト, Hepburn: Uzumaki Naruto) (/ˈnɑːrutoʊ/) is the titular protagonist of the manga Naruto, created by Masashi Kishimoto. He is a ninja from the fictional Hidden Leaf Village (Japanese: 木ノ葉隠れ, Hepburn: konohagakure). As a boy, Naruto is ridiculed and ostracized on account of the Nine-Tailed Demon Fox—a malevolent creature that attacked Konohagakure—that was sealed away in his body. Despite this, he aspires to become his village\'s leader, the Hokage, in order to receive their approval. His carefree, optimistic, and boisterous personality enables him to befriend other Konohagakure ninja, as well as ninja from other villages. Naruto appears in the series\' films and in other media related to the franchise, including video games and original video animations (OVA), as well as the sequel Boruto: Naruto Next Generations, where he is the Hokage, and his son, Boruto Uzumaki, is the protagonist.', 'naruto_fandom', '2024-05-31 01:01:46.947', 3),
	(2, 'naruto_fandom', 2, '$2a$08$FIHwd4Q5l8aAjZwzIb6P6.JNHnlnBDN8RwvRZt2qmnMpts7PQeTZu', NULL, NULL, 'Sakura Haruno (Japanese: 春野 サクラ, Hepburn: Haruno Sakura) is a fictional character in the Naruto manga and anime series created by Masashi Kishimoto. Sakura is depicted as a kunoichi affiliated with Konohagakure (木ノ葉隠れの里, English version: "Hidden Leaf Village") and a part of Team 7, which consists of herself, Naruto Uzumaki, Sasuke Uchiha, and their sensei Kakashi Hatake. Besides the main series, Sakura has appeared in several pieces of the Naruto media, most notably the spin-off Naruto: The Seventh Hokage and the Scarlet Spring (2015) and the sequel Boruto: Naruto Next Generations (2016) where she married Sasuke Uchiha taking name of Sakura Uchiha (Japanese: うちは サクラ, Hepburn: Uchiha Sakura) and is the mother of their daughter, Sarada Uchiha.', 'naruto_fandom', '2024-05-31 01:02:21.451', 3),
	(3, 'naruto_fandom', 2, '$2a$08$C.AuKTblG8OU1vIr7lelYeYvhVLpCSzyDlWZ4ZvPXodpOx1AB8joi', NULL, NULL, 'Boruto, naruto, and sasuke', 'naruto_fandom', '2024-05-31 01:02:44.734', 2),
	(4, 'jujutsu_kaisen', 2, '$2a$08$BBGcxEoezcudzt4dwS.uruR9goQlingw1oBQm8x22fqf.dEpW45nG', NULL, NULL, 'Tom 21 soon', 'jujutsu_kaisen', '2024-05-31 01:15:39.796', 2),
	(5, 'jujutsu_kaisen', 2, '$2a$08$e0iIJHWO1fXaKhoMgqlADevsBJv0KpUpkGSFwKGA1GH9VNSAwjDbC', NULL, NULL, 'Shibuya arc', 'jujutsu_kaisen', '2024-05-31 01:15:54.479', 3),
	(6, 'jujutsu_kaisen', 2, '$2a$08$zICIiVhWnBqYOPB8umGWjeQ.sh5FmOZKKWzSeCzZ6TLPhDho6TyHa', NULL, NULL, 'Gojo Satoru :)', 'jujutsu_kaisen', '2024-05-31 01:16:05.375', 1),
	(7, 'attack_on_titan_fandom', 2, '$2a$08$Y8uLqhkNX5N3uzfiuAS...eqiEMP4bzvDlW0W2TzGQiB.3m.VZBve', NULL, NULL, 'Fourth, first, and second season', 'attack_on_titan_fandom', '2024-05-31 01:19:05.227', 3),
	(8, 'attack_on_titan_fandom', 2, '$2a$08$jKFtlubn.osfl0EHJPtpP.kYU2rvdhJechkBfCT8QGrjJb1XaCuqW', NULL, NULL, 'First, and last season', 'attack_on_titan_fandom', '2024-05-31 01:19:16.733', 2),
	(9, 'attack_on_titan_fandom', 2, '$2a$08$sYDZSAEOz91zCeKf.HnNCOGNsv93JcAIlRhGd931iqed98.2rwWpy', NULL, NULL, '', 'attack_on_titan_fandom', '2024-05-31 01:19:22.402', 1),
	(10, 'bleach_fandom', 2, '$2a$08$J2sPfJcATuNjS4etCtEVvOD5HIz4hAmBtifu.6ngGj6alQsDtfXg.', NULL, NULL, 'https://www.youtube.com/watch?v=r-MEKwXFF-s', 'bleach_fandom', '2024-05-31 01:22:42.918', 2),
	(11, 'bleach_fandom', 2, '$2a$08$UZ8IQRWiA00ZBP.4vIa3M.TP.PBowFtmPjN4FFhfGYbiu5L3wWhKi', NULL, NULL, '', 'bleach_fandom', '2024-05-31 01:22:46.995', 2),
	(12, 'bleach_fandom', 2, '$2a$08$g7730S8V6wKW05ea8Re2aODy0U4xYoEGMh.KErt.FB.Zg8.WDBMXi', NULL, NULL, '', 'bleach_fandom', '2024-05-31 01:22:55.845', 6),
	(13, 'bleach_fandom', 2, '$2a$08$3rbrFM04VGXf6.Bk3VSO6.H9jlcCMUxWZeRYcFCBo9naCx437RmcO', NULL, NULL, '', 'bleach_fandom', '2024-05-31 01:23:03.943', 8),
	(14, 'tokyo_ghoul', 2, '$2a$08$JRAMQd6dZ4YoxUPCUu2Li..hmge3bvXVL520VwEJOe3Ja.u5pckmW', NULL, NULL, '', 'tokyo_ghoul', '2024-06-02 18:20:53.781', 1),
	(15, 'tokyo_ghoul', 2, '$2a$08$RubMpPxNeFav2kT34uJVa.F7xV42g67XX0T7eqsvxwt1DQx8ps82S', NULL, NULL, '', 'tokyo_ghoul', '2024-06-02 18:21:04.817', 4),
	(16, 'tokyo_ghoul', 2, '$2a$08$FZ.ywId1kXTSZ3M7nYEMR.uK.ltRjcDU42pw7Wh2CE07UgdhILRq6', NULL, NULL, '', 'tokyo_ghoul', '2024-06-02 18:21:08.225', 2),
	(17, 'tokyo_ghoul', 2, '$2a$08$Yhj.toVBTyS80B6XBBwEw.J7DXj.JRLSIghK7M5T2oiD1mJITqaBC', NULL, NULL, '', 'tokyo_ghoul', '2024-06-02 18:21:18.186', 5);

-- Дамп структуры для таблица konoha.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `token` varchar(300) DEFAULT NULL,
  `is_private` int DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `full_name` varchar(200) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `date_of_birth` bigint DEFAULT NULL,
  `personal_site` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- Дамп данных таблицы konoha.users: ~5 rows (приблизительно)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `token`, `is_private`, `avatar`, `gender`, `description`, `full_name`, `location`, `date_of_birth`, `personal_site`, `created_at`) VALUES
	(1, 'naruto_fandom', 'naruto_fandom@zxc.com', '$2a$08$fCfbCdhR5NLDudTPyjYIOePaMhBkaRp8cfVCEIDonJytsNo2lMrIa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6Im5hcnV0b19mYW5kb20iLCJQYXNzd29yZCI6IiIsIkVtYWlsIjoibmFydXRvX2ZhbmRvbUB6eGMuY29tIn0.wB4T6QH_FaiJFE-2Ejxpurzn22E7mwYGpSFwM_WRFKo', 0, '', 'Unrecognized', 'Fans of Naruto', 'Naruto', 'Konoha', 1717106177889, 'https://ru.wikipedia.org/wiki/%D0%9D%D0%B0%D1%80%D1%83%D1%82%D0%BE', '2024-05-31 00:57:19'),
	(2, 'jujutsu_kaisen', 'jujutsu_kaisen@zxc.zxc', '$2a$08$Bv6BYwsElyxqmUBYxf0NSe0KVaZkWvtJ6buaitkxRiKsOuZh0r3R.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6Imp1anV0c3Vfa2Fpc2VuIiwiUGFzc3dvcmQiOiIiLCJFbWFpbCI6Imp1anV0c3Vfa2Fpc2VuQHp4Yy56eGMifQ.uObGiTdphqzIn5DwmJaQsIM03bTP8qpU1yT-jyJ11f0', 0, '', 'Male', 'jujutsu_kaisen', 'Ababa Ababab', 'Locale', 1717107088273, 'https://www.youtube.com/', '2024-05-31 01:12:24'),
	(3, 'attack_on_titan_fandom', 'attack_on_titan_fandom@zxc.zxc', '$2a$08$WSqpaK7HReifHNF1Xo6LFOqbvLyubzpsiv.jXRMQV5XspKW8Gu0Xq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImF0dGFja19vbl90aXRhbl9mYW5kb20iLCJQYXNzd29yZCI6IiIsIkVtYWlsIjoiYXR0YWNrX29uX3RpdGFuX2ZhbmRvbUB6eGMuenhjIn0.rWB_bZ58Vr-W7Qlxw8uzUtnyZqYe-U1zX6XlRnxv64k', 0, '', 'Unrecognized', 'attack_on_titan_fandomattack_on_titan_fandomattack_on_titan_fandom', 'Eren Jaeger', 'Uzhgorod', 1717107427587, 'attack_on_titan_fandom', '2024-05-31 01:18:28'),
	(4, 'bleach_fandom', 'bleach_fandom@zxc.zxc', '$2a$08$PPeFZBgWePa5v4O3k6DboORqomZBiUvqmabDWsMxlfSvx2Hq3TGXi', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImJsZWFjaF9mYW5kb20iLCJQYXNzd29yZCI6IiIsIkVtYWlsIjoiYmxlYWNoX2ZhbmRvbUB6eGMuenhjIn0.9MgZYlpmG6dtHXaZUjIZBsRE4ToULnu_gW6_pzo9Z68', 0, '', 'Male', 'Bleach Fandom', 'Bleach Fandom', 'Bleach Fandom', 1717107606356, 'bleach.com', '2024-05-31 01:21:37'),
	(5, 'tokyo_ghoul', 'tokyo_ghoul@zxc.zxc', '$2a$08$Bad7SbZQ8.8E4Zx9iQcDq.TEQDQlnnulbr1RJmB1dY4HrN2TpcJtq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRva3lvX2dob3VsIiwiUGFzc3dvcmQiOiIiLCJFbWFpbCI6InRva3lvX2dob3VsQHp4Yy56eGMifQ.QCNUYeAwSLV0vBBbP6UJWUoydtrOWkgdyy8x15fphFE', 1, '', 'Male', 'tokyo_ghoultokyo_ghoultokyo_ghoultokyo_ghoul', 'Tokyo Ghoul', 'Detroit', 1717341510874, 'https://tokyo_ghoul.com', '2024-06-02 18:20:18');

-- Дамп структуры для таблица konoha.user_subscription
CREATE TABLE IF NOT EXISTS `user_subscription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `maker` varchar(500) DEFAULT NULL,
  `subscriber` varchar(500) DEFAULT NULL,
  `status` int DEFAULT '0' COMMENT '0 - unknown 1 - requested, 2 - accepted',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `socket_hash` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

-- Дамп данных таблицы konoha.user_subscription: ~9 rows (приблизительно)
INSERT INTO `user_subscription` (`id`, `maker`, `subscriber`, `status`, `created_at`, `updated_at`, `socket_hash`) VALUES
	(1, 'naruto_fandom', 'jujutsu_kaisen', 2, '2024-05-31 01:16:24', '2024-05-31 01:16:24', ''),
	(2, 'naruto_fandom', 'attack_on_titan_fandom', 2, '2024-05-31 01:19:30', '2024-05-31 01:19:30', ''),
	(3, 'jujutsu_kaisen', 'attack_on_titan_fandom', 2, '2024-05-31 01:19:38', '2024-05-31 01:19:38', ''),
	(5, 'jujutsu_kaisen', 'bleach_fandom', 3, '2024-05-31 01:23:47', '2024-05-31 01:29:33', '$2a$08$DACwcwufluraVziFsWUzjeQ0w0qQ7tJfJMyeQQJaiCs4QhW55eSLu'),
	(6, 'naruto_fandom', 'bleach_fandom', 2, '2024-05-31 01:23:53', '2024-05-31 01:23:53', ''),
	(7, 'attack_on_titan_fandom', 'bleach_fandom', 2, '2024-05-31 01:28:33', '2024-05-31 01:28:33', ''),
	(8, 'bleach_fandom', 'jujutsu_kaisen', 3, '2024-05-31 01:29:33', '2024-05-31 01:29:33', '$2a$08$DACwcwufluraVziFsWUzjeQ0w0qQ7tJfJMyeQQJaiCs4QhW55eSLu'),
	(9, 'tokyo_ghoul', 'bleach_fandom', 3, '2024-06-02 18:35:36', '2024-06-02 18:41:03', '$2a$08$3XGrEOdVwbyco6.5rPev6uK.F6hLb0BxiMldMFNfBj7WQidWg0Dkm'),
	(10, 'bleach_fandom', 'tokyo_ghoul', 3, '2024-06-02 18:41:03', '2024-06-02 18:41:03', '$2a$08$3XGrEOdVwbyco6.5rPev6uK.F6hLb0BxiMldMFNfBj7WQidWg0Dkm');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
