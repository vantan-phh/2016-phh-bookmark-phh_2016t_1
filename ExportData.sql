-- MySQL dump 10.13  Distrib 5.7.13, for osx10.11 (x86_64)
--
-- Host: localhost    Database: tool
-- ------------------------------------------------------
-- Server version	5.7.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orgs`
--

DROP TABLE IF EXISTS `orgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orgs`
--

LOCK TABLES `orgs` WRITE;
/*!40000 ALTER TABLE `orgs` DISABLE KEYS */;
/*!40000 ALTER TABLE `orgs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `urls`
--

DROP TABLE IF EXISTS `urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `urls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL DEFAULT '',
  `title` varchar(255) DEFAULT '',
  `description` varchar(255) DEFAULT '',
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `urls`
--

LOCK TABLES `urls` WRITE;
/*!40000 ALTER TABLE `urls` DISABLE KEYS */;
INSERT INTO `urls` VALUES (39,'http://www.y-adagio.com/public/standards/tr_javalang/9.doc.htm','Java言語規定 インタフェース','No description','No image'),(40,'https://github.com/vantan-phh/2016-phh-bookmark-phh_2016t_1/branches','Page not found · GitHub','No description','No image'),(41,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(42,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(43,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(44,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(45,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(46,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(47,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(48,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(49,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(50,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(51,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(52,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(53,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(54,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(55,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(56,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(57,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(58,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(59,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png'),(60,'http://www.backlog.jp/git-guide/stepup/stepup2_3.html','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | サルでもわかるGit入門 〜バージョン管理を使いこなそう〜 | どこでもプロジェクト管理バックログ','2. ブランチを切り替える【チュートリアル1 ブランチを使ってみよう】 | ようこそ、サルでもわかるGit入門へ。Gitをつかってバージョン管理ができるようになるために一緒に勉強していきましょう！','http://www.backlog.jp/git-guide/ogp_dft.png');
/*!40000 ALTER TABLE `urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_org`
--

DROP TABLE IF EXISTS `user_org`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_org` (
  `user_id` int(11) NOT NULL,
  `org_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_org`
--

LOCK TABLES `user_org` WRITE;
/*!40000 ALTER TABLE `user_org` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_org` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_url`
--

DROP TABLE IF EXISTS `user_url`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_url` (
  `user_id` int(11) NOT NULL,
  `url_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_url`
--

LOCK TABLES `user_url` WRITE;
/*!40000 ALTER TABLE `user_url` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_url` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-28 21:54:01
