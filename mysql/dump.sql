-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: db-canchu.cd9wh8yqpsr7.ap-southeast-2.rds.amazonaws.com    Database: Canchu
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `fk_receiver_id` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (4,114,114,'安安~','2023-07-28 09:52:46'),(5,114,114,'安安~','2023-07-28 09:52:48'),(6,114,114,'考試要截止了阿RRRR','2023-07-28 09:53:02'),(7,114,114,'考試要截止了阿RRRR','2023-07-28 09:53:03'),(8,114,114,'考試要截止了阿RRRR','2023-07-28 09:53:03'),(9,114,114,'考試要截止了阿RRRR','2023-07-28 09:53:04'),(10,114,114,'考試要截止了阿RRRR','2023-07-28 09:53:05'),(11,114,114,'考試要截止了阿RRRR','2023-07-28 09:54:58'),(12,114,114,'考試要截止了阿RRRR','2023-07-28 09:55:00'),(13,114,114,'考試要截止了阿RRRR','2023-07-28 09:55:01'),(14,114,114,'考試要截止了阿RRRR','2023-07-28 09:55:02'),(15,114,114,'考試要截止了阿RRRR','2023-07-28 09:55:03'),(16,114,114,'考試要截止了阿RRRR','2023-07-28 09:55:04'),(17,114,114,'考試要截止了阿RRRR','2023-07-28 09:55:04'),(18,114,114,'考試要截止了阿RRRR','2023-07-28 09:55:05'),(19,114,114,'考試要截止了阿RRRR','2023-07-28 09:55:07'),(20,114,114,'考試要截止了阿RRRR','2023-07-28 09:59:18'),(21,124,125,'user1 -> user2 訊息 1','2023-07-29 14:41:23'),(22,125,124,'user2 -> user1 訊息 1','2023-07-29 14:41:24'),(23,125,124,'user2 -> user1 訊息 2','2023-07-29 14:41:26'),(24,125,124,'user2 -> user1 訊息 3','2023-07-29 14:41:26'),(25,125,124,'user2 -> user1 訊息 4','2023-07-29 14:41:27'),(26,125,124,'user2 -> user1 訊息 5','2023-07-29 14:41:27'),(27,125,124,'user2 -> user1 訊息 6','2023-07-29 14:41:28'),(28,125,124,'user2 -> user1 訊息 7','2023-07-29 14:41:29'),(29,125,124,'user2 -> user1 訊息 8','2023-07-29 14:41:29'),(30,125,124,'user2 -> user1 訊息 9','2023-07-29 14:41:30'),(31,125,124,'user2 -> user1 訊息 10','2023-07-29 14:41:31'),(32,124,125,'user1 -> user2 訊息 1','2023-07-29 14:51:07'),(33,125,124,'user2 -> user1 訊息 1','2023-07-29 14:51:08'),(34,125,124,'user2 -> user1 訊息 2','2023-07-29 14:51:10'),(35,125,124,'user2 -> user1 訊息 3','2023-07-29 14:51:10'),(36,125,124,'user2 -> user1 訊息 4','2023-07-29 14:51:11'),(37,125,124,'user2 -> user1 訊息 5','2023-07-29 14:51:11'),(38,125,124,'user2 -> user1 訊息 6','2023-07-29 14:51:12'),(39,125,124,'user2 -> user1 訊息 7','2023-07-29 14:51:13'),(40,125,124,'user2 -> user1 訊息 8','2023-07-29 14:51:13'),(41,125,124,'user2 -> user1 訊息 9','2023-07-29 14:51:14'),(42,125,124,'user2 -> user1 訊息 10','2023-07-29 14:51:15'),(43,127,128,'user1 -> user2 訊息 1','2023-07-29 14:56:06'),(44,128,127,'user2 -> user1 訊息 1','2023-07-29 14:56:07'),(45,128,127,'user2 -> user1 訊息 2','2023-07-29 14:56:08'),(46,128,127,'user2 -> user1 訊息 3','2023-07-29 14:56:09'),(47,128,127,'user2 -> user1 訊息 4','2023-07-29 14:56:10'),(48,128,127,'user2 -> user1 訊息 5','2023-07-29 14:56:10'),(49,128,127,'user2 -> user1 訊息 6','2023-07-29 14:56:11'),(50,128,127,'user2 -> user1 訊息 7','2023-07-29 14:56:11'),(51,128,127,'user2 -> user1 訊息 8','2023-07-29 14:56:12'),(52,128,127,'user2 -> user1 訊息 9','2023-07-29 14:56:13'),(53,128,127,'user2 -> user1 訊息 10','2023-07-29 14:56:13');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (4,6,95,'test comment','2023-07-14 09:16:08'),(5,7,96,'test comment','2023-07-18 02:30:29'),(6,8,97,'test comment','2023-07-18 02:45:08'),(7,49,114,'留言','2023-07-20 07:00:32'),(8,49,114,'酷歐','2023-07-20 07:00:50'),(11,66,118,'留言','2023-07-24 05:42:59');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `summary` varchar(255) NOT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (7,'friend_request',0,'2023-07-13 07:21:12','user-1sxQajiT invited you to be friends.',79,80),(8,'friend_request',0,'2023-07-13 07:21:12','user-zIiWO4kW has accepted your friend request.',80,79),(9,'friend_request',0,'2023-07-13 07:36:37','user-ONgc76dT invited you to be friends.',82,83),(10,'friend_request',0,'2023-07-13 07:36:38','user-RfV8zE5S has accepted your friend request.',83,82),(11,'friend_request',0,'2023-07-13 07:36:40','user-Nh6BUWsa invited you to be friends.',85,86),(12,'friend_request',0,'2023-07-13 07:36:40','user-VR7rZYLZ has accepted your friend request.',86,85),(13,'friend_request',0,'2023-07-19 03:18:15','user-BNrYMuXh invited you to be friends.',99,100),(14,'friend_request',0,'2023-07-19 03:18:15','user-tDlqyaoG has accepted your friend request.',100,99),(15,'friend_request',0,'2023-07-19 06:29:01','user-id6E1Lmf invited you to be friends.',102,103),(16,'friend_request',0,'2023-07-19 06:29:01','user-KnDBh5x4 has accepted your friend request.',103,102),(17,'friend_request',0,'2023-07-19 06:29:37','user-FH62DPqm invited you to be friends.',105,106),(18,'friend_request',0,'2023-07-19 06:29:37','user-pwxLRU3j has accepted your friend request.',106,105),(19,'friend_request',0,'2023-07-19 06:37:15','user-7CHwWkug invited you to be friends.',108,109),(20,'friend_request',0,'2023-07-19 06:37:16','user-n1efZNgi has accepted your friend request.',109,108),(21,'friend_request',0,'2023-07-19 06:37:22','user-gmUD891B invited you to be friends.',111,112),(22,'friend_request',0,'2023-07-19 06:37:22','user-WIOuw1kc has accepted your friend request.',112,111),(23,'friend_request',1,'2023-07-20 03:45:30','test1 已接受好友邀請',89,114),(24,'friend_request',1,'2023-07-20 05:55:07','test3 邀請你成為好友',115,114),(25,'friend_request',1,'2023-07-20 05:56:10','test3 邀請你成為好友',115,114),(26,'friend_request',1,'2023-07-20 05:58:59','test3 邀請你成為好友',115,114),(27,'friend_request',1,'2023-07-20 06:01:08','gahwa 已接受好友邀請',114,115),(28,'friend_request',1,'2023-07-20 06:45:36','test4 邀請你成為好友',116,114),(29,'friend_request',1,'2023-07-20 06:49:40','test5 邀請你成為好友',117,114),(30,'friend_request',1,'2023-07-20 06:50:04','gahwa 已接受好友邀請',114,117),(31,'friend_request',1,'2023-07-20 06:50:12','gahwa 已接受好友邀請',114,116),(32,'friend_request',1,'2023-07-20 09:50:23','test5 邀請你成為好友',117,114),(33,'friend_request',0,'2023-07-24 05:45:10','pj 邀請你成為好友',118,119),(34,'friend_request',0,'2023-07-24 05:45:49','pj 邀請你成為好友',118,119),(35,'friend_request',0,'2023-07-24 05:46:09','pj2 已接受好友邀請',119,118),(36,'friend_request',1,'2023-07-24 10:37:17','user-WKB0bxOx 邀請你成為好友',113,114),(37,'friend_request',1,'2023-07-24 10:37:37','user-WIOuw1kc 邀請你成為好友',112,114),(38,'friend_request',0,'2023-07-25 05:30:24','gahwa17 已接受好友邀請',114,117),(39,'friend_request',0,'2023-07-25 09:56:18','gahwa17 邀請你成為好友',114,109),(40,'friend_request',0,'2023-07-25 10:17:51','gahwa17 邀請你成為好友',114,109),(41,'friend_request',0,'2023-07-25 11:03:13','gahwa17 邀請你成為好友',114,112),(42,'friend_request',0,'2023-07-25 11:04:57','user-WIOuw1kc 已接受好友邀請',112,114),(43,'friend_request',0,'2023-07-25 11:06:15','user-1sxQajiT 邀請你成為好友',79,112),(44,'friend_request',0,'2023-07-25 11:08:01','user-WIOuw1kc 已接受好友邀請',112,79),(45,'friend_request',0,'2023-07-25 11:17:58','user-zIiWO4kW 邀請你成為好友',80,112),(46,'friend_request',0,'2023-07-25 11:18:45','快取測試 已接受好友邀請',112,80),(47,'friend_request',0,'2023-07-25 11:26:01','快取測試 邀請你成為好友',115,112),(48,'friend_request',0,'2023-07-25 11:26:16','test4 邀請你成為好友',116,112),(49,'friend_request',0,'2023-07-25 11:26:29','test5 邀請你成為好友',117,112),(50,'friend_request',0,'2023-07-25 11:28:31','快取測試 已接受好友邀請',112,115),(51,'friend_request',0,'2023-07-25 11:37:44','快取測試 已接受好友邀請',112,116),(52,'friend_request',0,'2023-07-25 12:10:22','test1 邀請你成為好友',89,114),(53,'friend_request',0,'2023-07-25 12:11:28','user-1sxQajiT 邀請你成為好友',79,114),(54,'friend_request',0,'2023-07-25 12:11:47','gahwa17 已接受好友邀請',114,79),(55,'friend_request',0,'2023-07-25 12:12:52','test1 邀請你成為好友',90,114),(56,'friend_request',0,'2023-07-25 12:13:29','gahwa17 已接受好友邀請',114,90),(57,'friend_request',0,'2023-07-25 17:29:21','test1 邀請你成為好友',90,114),(58,'friend_request',0,'2023-07-25 17:30:40','gahwa17 已接受好友邀請',114,90),(59,'friend_request',0,'2023-07-26 03:00:44','gahwa17 邀請你成為好友',114,115),(60,'friend_request',0,'2023-07-26 03:00:47','gahwa17 邀請你成為好友',114,116),(61,'friend_request',0,'2023-07-26 03:00:50','gahwa17 邀請你成為好友',114,117),(62,'friend_request',0,'2023-07-26 03:05:55','test4 已接受好友邀請',116,114),(63,'friend_request',0,'2023-07-26 03:08:26','test5 已接受好友邀請',117,114),(64,'friend_request',0,'2023-07-26 03:20:01','test5 邀請你成為好友',117,114),(65,'friend_request',0,'2023-07-26 03:20:19','gahwa17 已接受好友邀請',114,117),(66,'friend_request',0,'2023-07-26 06:07:40','user-ONgc76dT 邀請你成為好友',82,114),(67,'friend_request',0,'2023-07-26 06:08:09','gahwa17 已接受好友邀請',114,82),(68,'friend_request',0,'2023-07-26 06:34:30','user-Nh6BUWsa 邀請你成為好友',85,114),(69,'friend_request',0,'2023-07-26 06:35:06','gahwa17 已接受好友邀請',114,85);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendship`
--

DROP TABLE IF EXISTS `friendship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_friendship` (`sender_id`,`receiver_id`),
  KEY `index_user1_id` (`sender_id`),
  KEY `index_user2_id` (`receiver_id`),
  CONSTRAINT `fk_user1_id` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_user2_id` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendship`
--

LOCK TABLES `friendship` WRITE;
/*!40000 ALTER TABLE `friendship` DISABLE KEYS */;
INSERT INTO `friendship` VALUES (18,99,100,'friend'),(19,102,103,'friend'),(20,105,106,'friend'),(32,118,119,'friend'),(52,85,114,'friend');
/*!40000 ALTER TABLE `friendship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_relationship`
--

DROP TABLE IF EXISTS `group_relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_relationship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk_group_id` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_relationship`
--

LOCK TABLES `group_relationship` WRITE;
/*!40000 ALTER TABLE `group_relationship` DISABLE KEYS */;
INSERT INTO `group_relationship` VALUES (6,6,114,'joined'),(15,10,124,'joined'),(16,10,125,'applying'),(18,12,124,'joined'),(19,12,125,'applying'),(21,14,127,'joined'),(22,14,128,'applying');
/*!40000 ALTER TABLE `group_relationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `owner_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `fk_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (6,'group_name',114,'2023-07-28 06:53:09'),(10,'世紀帝國同好會',124,'2023-07-29 14:41:06'),(12,'世紀帝國同好會',124,'2023-07-29 14:50:50'),(14,'世紀帝國同好會',127,'2023-07-29 14:55:49');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (5,2,95),(6,3,95),(7,3,94),(8,2,94),(10,7,96),(11,8,97),(20,48,114),(21,47,114),(22,46,114),(29,49,114),(30,57,118),(31,14,130);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `context` text NOT NULL,
  `author_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `group_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  KEY `fk_post_group_id` (`group_id`),
  CONSTRAINT `fk_post_group_id` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (2,'test post 01',92,'2023-07-14 03:26:54',NULL),(3,'edited test post 01',93,'2023-07-14 03:31:40',NULL),(4,'edited test post 01',94,'2023-07-14 03:31:41',NULL),(5,'這是user-bYMmsuRD更新的文！',94,'2023-07-14 09:06:13',NULL),(6,'test post 01',95,'2023-07-14 09:16:08',NULL),(7,'test post 01',96,'2023-07-18 02:30:28',NULL),(8,'test post 01',97,'2023-07-18 02:45:08',NULL),(9,'test post 01',99,'2023-07-19 03:18:16',NULL),(10,'test post 01',102,'2023-07-19 06:29:02',NULL),(11,'test post 01',105,'2023-07-19 06:29:38',NULL),(12,'test',105,'2023-07-19 06:32:44',NULL),(13,'test post 01',108,'2023-07-19 06:37:16',NULL),(14,'test post 02',108,'2023-07-19 06:37:17',NULL),(15,'test post 03',108,'2023-07-19 06:37:17',NULL),(16,'test post 04',108,'2023-07-19 06:37:17',NULL),(17,'test post 05',108,'2023-07-19 06:37:17',NULL),(18,'test post 06',108,'2023-07-19 06:37:18',NULL),(19,'test post 07',108,'2023-07-19 06:37:18',NULL),(20,'test post 08',108,'2023-07-19 06:37:18',NULL),(21,'test post 09',108,'2023-07-19 06:37:18',NULL),(22,'test post 10',108,'2023-07-19 06:37:19',NULL),(23,'test post 11',108,'2023-07-19 06:37:19',NULL),(24,'test post 01',111,'2023-07-19 06:37:22',NULL),(25,'test post 02',111,'2023-07-19 06:37:23',NULL),(26,'test post 03',111,'2023-07-19 06:37:23',NULL),(27,'test post 04',111,'2023-07-19 06:37:23',NULL),(28,'test post 05',111,'2023-07-19 06:37:24',NULL),(29,'test post 06',111,'2023-07-19 06:37:24',NULL),(30,'test post 07',111,'2023-07-19 06:37:24',NULL),(31,'test post 08',111,'2023-07-19 06:37:24',NULL),(32,'test post 09',111,'2023-07-19 06:37:25',NULL),(33,'test post 10',111,'2023-07-19 06:37:25',NULL),(34,'test post 11',111,'2023-07-19 06:37:25',NULL),(35,'發廢文 ....',114,'2023-07-20 03:15:29',NULL),(40,'測試發文字數極限\n廢文廢',114,'2023-07-20 06:53:01',NULL),(41,'第三篇廢文',114,'2023-07-20 06:54:49',NULL),(42,'第四篇廢文',114,'2023-07-20 06:54:55',NULL),(43,'第五篇廢文',114,'2023-07-20 06:55:00',NULL),(44,'第6篇廢文',114,'2023-07-20 06:55:05',NULL),(45,'第7篇廢文',114,'2023-07-20 06:55:09',NULL),(46,'第8篇廢文',114,'2023-07-20 06:55:13',NULL),(47,'第9篇廢文',114,'2023-07-20 06:55:18',NULL),(48,'第10篇廢文',114,'2023-07-20 06:55:22',NULL),(49,'再一篇廢文',114,'2023-07-20 06:55:53',NULL),(55,'要下雨了~~~',114,'2023-07-20 09:10:35',NULL),(56,'貼文 1',118,'2023-07-24 05:41:37',NULL),(57,'貼文 2 edited',118,'2023-07-24 05:41:42',NULL),(58,'貼文 3',118,'2023-07-24 05:41:46',NULL),(59,'貼文 4',118,'2023-07-24 05:41:51',NULL),(60,'貼文 5',118,'2023-07-24 05:41:54',NULL),(61,'貼文 6',118,'2023-07-24 05:41:58',NULL),(62,'貼文 7',118,'2023-07-24 05:42:02',NULL),(63,'貼文 8',118,'2023-07-24 05:42:06',NULL),(64,'貼文 9',118,'2023-07-24 05:42:10',NULL),(65,'貼文 10',118,'2023-07-24 05:42:14',NULL),(66,'貼文 11',118,'2023-07-24 05:42:18',NULL),(67,'測試\n',119,'2023-07-24 05:46:19',NULL),(68,'...',114,'2023-07-27 09:52:58',NULL),(69,'社團發廢文',114,'2023-07-28 08:06:28',6),(70,'社團發廢文',114,'2023-07-28 08:08:50',6),(73,'社團發廢文',114,'2023-07-28 08:23:18',6),(74,'user1 貼文 1',124,'2023-07-29 14:41:18',10),(75,'user2 貼文 1',125,'2023-07-29 14:41:19',10),(76,'user1 貼文 1',124,'2023-07-29 14:51:02',12),(77,'user2 貼文 1',125,'2023-07-29 14:51:03',12),(78,'user1 貼文 1',127,'2023-07-29 14:56:01',14),(79,'user2 貼文 1',128,'2023-07-29 14:56:02',14);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL DEFAULT 'native',
  `picture` varchar(255) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (79,'user-1sxQajiT','user-1sxQajiT@test.com','$2b$10$ZudlWRAimk7VxarUp6Vba.dtwtlALsbQoC04pR7WgskiOo1RJ.mQO','native',NULL,NULL,NULL),(80,'user-zIiWO4kW','user-zIiWO4kW@test.com','$2b$10$ERfzlcceuoSSsD8HfdyW0OVnzY2PR2.Ac09js60sdkHowJUGAsJdS','native',NULL,NULL,NULL),(81,'user-cDU9C9h4','user-cDU9C9h4@test.com','$2b$10$EkfQIrjTybqXHSRbWaaoqeSvOPsHDqwpa9hE5fYMagG1tlA6K8fiK','native',NULL,NULL,NULL),(82,'user-ONgc76dT','user-ONgc76dT@test.com','$2b$10$8fk9m6VQ36Pm46WcI3Xf3eUzdQdHDqsTERDmdnZ5GSZQxhkwXQJ3q','native',NULL,NULL,NULL),(83,'user-RfV8zE5S','user-RfV8zE5S@test.com','$2b$10$BIhm7ge8hjpMCpp/P1H/1OoQLjoim.cd9PsvsGvcB4hacLOfWsaCW','native',NULL,NULL,NULL),(84,'user-IKsgS3cS','user-IKsgS3cS@test.com','$2b$10$hQMbOBi3cQEu.axm9lSAEeFeD9RCX/7EcU2V.qDZU/yRd3Iu0yvqu','native',NULL,NULL,NULL),(85,'user-Nh6BUWsa','user-Nh6BUWsa@test.com','$2b$10$gldMde78yDSy96YgCIH82exwD.ALeuAyCl5Q7YAmqHKXziO4kEDg.','native',NULL,NULL,NULL),(86,'user-VR7rZYLZ','user-VR7rZYLZ@test.com','$2b$10$/W9hPT342Keg8MRsmTG22.ujPtUedtloHHDS2NAVgp1Sr2H8S5n6u','native',NULL,NULL,NULL),(87,'user-DHbG5GeX','user-DHbG5GeX@test.com','$2b$10$yiNKGTuj3CyS3JlmlvrfyOyM8Bv1CMAD19usHQZd176RjHAFHEtqW','native',NULL,NULL,NULL),(92,'user-09Ra1Xc1','user-09Ra1Xc1@test.com','$2b$10$bVr0LzZwnU4l5HAyyXb2duc.defVR2B6GL28ACKtg6dKurMnzbUqK','native',NULL,NULL,NULL),(93,'user-Tiv2RMvj','user-Tiv2RMvj@test.com','$2b$10$/6KGOfH1PR/gZsVZ7J/kwOPtIZOA.bIBZovVyKwctUsyb8UJ5V432','native',NULL,NULL,NULL),(94,'user-bYMmsuRD','user-bYMmsuRD@test.com','$2b$10$V689UJMykrEQWLzhe5xlgu4BtYeisgkA2cHaj7bo12xT1oZhCyk5W','native',NULL,NULL,NULL),(95,'user-mgWZqsge','user-mgWZqsge@test.com','$2b$10$RSAUgsyeys1dDxKBKWCs6u07J4tKpHLvJ03hT8.oYsoVDzUaCly.O','native',NULL,NULL,NULL),(96,'user-kXC6OuXg','user-kXC6OuXg@test.com','$2b$10$9OuTOictBckWAYa5/ehkSOBVIpMa11sELE5.KShWknNeYiFHrLkYy','native',NULL,NULL,NULL),(97,'user-fNABqIbQ','user-fNABqIbQ@test.com','$2b$10$zqZaLSbVDn/2pieA2DpBNOD0GSMK8GAlyy2c0JtOXs.kIx6of/f3C','native',NULL,NULL,NULL),(98,'user-iZO7T9MJ','user-iZO7T9MJ@test.com','$2b$10$nt8AxCWDgH7o/8Nwof8acO/aKEzRgkVsVURqHNX52.NWygvKXhH0K','native',NULL,NULL,NULL),(99,'user-BNrYMuXh','user-BNrYMuXh@test.com','$2b$10$OzhDbmm/M9zpWhMOg.AYZOMNhHIgz.rGseK5peTl63qVPB.T8rltS','native',NULL,NULL,NULL),(100,'user-tDlqyaoG','user-tDlqyaoG@test.com','$2b$10$ayqoFf0ZVSwqOApOa1CP5ORSIzAlOGOrn//Mg7r.IC5P7Qj0jeMJC','native',NULL,NULL,NULL),(101,'user-xeasl83n','user-xeasl83n@test.com','$2b$10$FA4iP8MSy8b7lGsvNBGJmOFYg.C3vJKUmCl9jTVizeBTaz0BTc0Ty','native',NULL,NULL,NULL),(102,'user-id6E1Lmf','user-id6E1Lmf@test.com','$2b$10$DwtuapVgmqP.s/4K0.bgQ.dZhigWOm72ySAmBCq6uHH7En3okwO9y','native',NULL,NULL,NULL),(103,'user-KnDBh5x4','user-KnDBh5x4@test.com','$2b$10$B3g6qUKatAsBJ2cqzTYDR.LWmCIaqigluu0ZIaywOMKMH.KPCjZsa','native',NULL,NULL,NULL),(104,'user-54jQldGp','user-54jQldGp@test.com','$2b$10$VbTo86l9wTfp9UWCdwxt4edmg3ri62m0P/O1zaXXf7rpXnhkUvoWS','native',NULL,NULL,NULL),(105,'user-FH62DPqm','user-FH62DPqm@test.com','$2b$10$Dbh9dXGIt71RZ0WVeOLCrOtmUeQoZ36sHfg1Lk32gCTltb9fVebau','native','https://52.65.80.187/public/images/1689823441997-Rowle_sitt.png',NULL,NULL),(106,'user-pwxLRU3j','user-pwxLRU3j@test.com','$2b$10$ctcRhxlihK2p4xDG3bMo/OfSry5HlYkmwyJMPHFQS7DaY6q3u5cW6','native',NULL,NULL,NULL),(107,'user-hd6rIByD','user-hd6rIByD@test.com','$2b$10$nJppnbl49blZXtvfWRO.MeY6nu71SM.c58cuJfUh9gd3fYjD8KaU6','native',NULL,NULL,NULL),(108,'user-7CHwWkug','user-7CHwWkug@test.com','$2b$10$3pU0p6lUpD6ZlagzGSIiJeWtnRXbKDMEv2d2hiszfDN1vVHFIcMD6','native',NULL,NULL,NULL),(110,'user-0kvkbrVG','user-0kvkbrVG@test.com','$2b$10$WiHhTbPSyEmkoBPILQPshuSdR6Nayi27O0a.ltmSuJ5ZW4ifYUCIO','native',NULL,NULL,NULL),(111,'user-gmUD891B','user-gmUD891B@test.com','$2b$10$i.03Ybg1IPz40lsojWcvGeAZjDWcJUVWtVF8VO9hTP88bHBA5Q6yK','native',NULL,NULL,NULL),(113,'user-WKB0bxOx','user-WKB0bxOx@test.com','$2b$10$50gUcT6po2DfX/.ev.9WWuxbUFDyDySPgCTDYtjRDll4lyzyHjhAy','native',NULL,NULL,NULL),(114,'gahwa17','gahwa17@test.com','$2b$10$V33rgicaJra3.gY1Hkq5renFFWTB7vzQfdyMujSbn2TIZm.iHHmGG','native','https://52.65.80.187/public/images/1689924643211-SimpleRowlet.png','快取測試','測試, 測試'),(118,'pj','pj@gmail.com','$2b$10$S0RKda1fZcXJTBeSxKtoZOfFaOTmA9KVwTkB/41T6mv95J.yRQ24i','native','https://52.65.80.187/public/images/1690177392392-æªå 2023-04-13 ä¸å8.27.18.png','123',NULL),(119,'pj2','pj2@gmail.com','$2b$10$bSPv6mEuk/D9ZsEk9BoVze.tpxUUq6/cdvvL856PlNj04irU1jyoi','native',NULL,NULL,NULL),(124,'pj-midterm-001','pj-midterm-001@gmail.com','$2b$10$0sQbVVM0IBOe4PbcPvZ4vOIIlbfpjp1YIVjFAkwDERHj92VIabRQK','native',NULL,NULL,NULL),(125,'pj-midterm-002','pj-midterm-002@gmail.com','$2b$10$OVJCcb2ROCIxgQwxW3EKdeDDpWp.WoJS1UgKPCPCJSl5x1GH5LQF6','native',NULL,NULL,NULL),(126,'pj-midterm-003','pj-midterm-003@gmail.com','$2b$10$wUFC.nnUY0Uzjmk65xPiHO/0Aq6qhGDCv6STwocnEzYUp/VgiSJWm','native',NULL,NULL,NULL),(127,'pj-midterm-9b117436','pj-midterm-9b117436@gmail.com','$2b$10$k9k458h75p3xCls7VoqKReWuN905oNG8KP430niSl..PGZsgjV7UK','native',NULL,NULL,NULL),(128,'pj-midterm-0ddac65f','pj-midterm-0ddac65f@gmail.com','$2b$10$iAg29Ca3.7572Ag4BHykkeVKXL.LLltLWwNB3jX45e9l/3C.qFI.K','native',NULL,NULL,NULL),(129,'pj-midterm-5c311730','pj-midterm-5c311730@gmail.com','$2b$10$8bqlj5bHKSNDcBWeRxWc9eM.cRKoGyz2ObyLTNUHEAsdEXNLOtPXu','native',NULL,NULL,NULL),(130,'修改測試','test@test.com','$2b$10$pB/uLYCoc6E5GB9iBbTwT.x3IcctxSKkerGuRjiMb.hK78kA2v/GS','native',NULL,'修改測試','測試, 測試');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'Canchu'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-07 16:18:18
