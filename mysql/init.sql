-- 將 DATABASE 改成 Canchu
CREATE DATABASE IF NOT EXISTS Canchu;

USE Canchu;

-- 建立 user 表格
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
);

-- 建立 post 表格
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `context` text NOT NULL,
  `author_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
);

-- 建立 comments 表格
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

-- 建立 likes 表格
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

-- 建立 event 表格
CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `summary` varchar(255) NOT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  PRIMARY KEY (`id`)
);

-- 建立 friendship 表格
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
  CONSTRAINT `fk_user2_id` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`)
);


-- 插入假資料
INSERT INTO `user` (`name`, `email`, `password`) VALUES
('user-abc', 'user-abc@test.com', '$2b$10$EhJTcVcrIMotEQJKfmf5VeTQYcB9JEXJRmf0EwMnNL2qmjOLS4Qmy'),
('user-def', 'user-deaf@test.com', '$2b$10$EhJTcVcrIMotEQJKfmf5VeTQYcB9JEXJRmf0EwMnNL2qmjOLS4Qmy'),
('user-ghi', 'user-ghi@test.com', '$2b$10$EhJTcVcrIMotEQJKfmf5VeTQYcB9JEXJRmf0EwMnNL2qmjOLS4Qmy'),
('user-jkl', 'user-jkl@test.com', '$2b$10$EhJTcVcrIMotEQJKfmf5VeTQYcB9JEXJRmf0EwMnNL2qmjOLS4Qmy'),
('user-mno', 'user-mno@test.com', '$2b$10$EhJTcVcrIMotEQJKfmf5VeTQYcB9JEXJRmf0EwMnNL2qmjOLS4Qmy');
