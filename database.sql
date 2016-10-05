-- MySQL dump 10.13  Distrib 5.7.12, for osx10.11 (x86_64)
--
-- Host: localhost    Database: bookmark
-- ------------------------------------------------------
-- Server version	5.7.12

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
-- Table structure for table `joiningOrgs`
--

DROP TABLE IF EXISTS `joiningOrgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `joiningOrgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(255) DEFAULT NULL,
  `orgId` int(255) DEFAULT NULL,
  `permission` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joiningOrgs`
--

LOCK TABLES `joiningOrgs` WRITE;
/*!40000 ALTER TABLE `joiningOrgs` DISABLE KEYS */;
INSERT INTO `joiningOrgs` VALUES (1,1,1,2),(2,1,2,2),(3,1,3,2),(4,1,4,2),(5,1,5,2),(6,2,1,1),(7,8,1,1),(8,3,1,1),(9,4,1,1);
/*!40000 ALTER TABLE `joiningOrgs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orgComments`
--

DROP TABLE IF EXISTS `orgComments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orgComments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orgId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `urlId` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `time_updated` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orgComments`
--

LOCK TABLES `orgComments` WRITE;
/*!40000 ALTER TABLE `orgComments` DISABLE KEYS */;
INSERT INTO `orgComments` VALUES (2,'1','1','2','N高等学校のページ',1474961021268),(3,'1','1','3','みんなPHH入ろうぜ！',1474961590629),(4,'1','1','4','',1474961184641),(5,'1','1','5','おすすめ',1474961210617),(6,'1','1','6','',1474961237635),(7,'1','2','3','いいね！',1474962199197);
/*!40000 ALTER TABLE `orgComments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orgs`
--

DROP TABLE IF EXISTS `orgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orgs`
--

LOCK TABLES `orgs` WRITE;
/*!40000 ALTER TABLE `orgs` DISABLE KEYS */;
INSERT INTO `orgs` VALUES (1,'PHHツール開発1','ツール開発用のグループです',NULL),(2,'PHHメンバー','PHHのみんなのグループ',NULL),(3,'N高等学校生あつまれ','N高の生徒が集まるところです。',NULL),(4,'バンタン生のグループ','グループです',NULL),(5,'音楽グループ','音楽のURLを集めましょう',NULL);
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
  `url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `urls`
--

LOCK TABLES `urls` WRITE;
/*!40000 ALTER TABLE `urls` DISABLE KEYS */;
INSERT INTO `urls` VALUES (1,'https://google.com/','Google','Google 創立 18 周年 #GoogleDoodle','http://www.google.com/logos/doodles/2016/googles-18th-birthday-5661535679545344.2-thp.png'),(2,'https://nnn.ed.jp/','N高等学校 | カドカワが創るネットの高校 （通信制高校 広域・単位制）','学校法人角川ドワンゴ学園 N高等学校のページです。N高はネットで学べる通信制高校です。全日制高校と同じ卒業資格を取得することができます。','http://nnn.ed.jp/img/logo_ogp.png'),(3,'https://nnn.ed.jp/commute/phh/','プロから学んで即戦力プログラマーを育成','バンタン プログラマーズ・ハイレベル・ハイスクールは現役高校生プログラマー育成を目指す1年間のプログラミングスクール。現役プロ講師による短期集中型のハイレベルなカリキュラムを通じて即戦力プログラマーを養成します。','http://nnn.ed.jp/commute/phh/assets/img/common/phh_ogp.png'),(4,'http://qiita.com/','Qiita - プログラマの技術情報共有サービス - Qiita','Qiitaは、プログラマのための技術情報共有サービスです。 プログラミングに関するTips、ノウハウ、メモを簡単に記録 &amp; 公開することができます。','https://cdn.qiita.com/assets/qiita-fb-f1d6559f13f7e8de7260c6cec4d3b8f9c2eab8322a69fd786baea877d220278b.png'),(5,'https://www.youtube.com/watch?v=800Ugz5fBZQ','Getter & Ghastly - 666!','666! from Getter & Ghastly is straight up vicious. Grab the full OWSLA Worldwide Broadcast compilation below: Support the Worldwide Broadcast Compilation: ✚ ...','https://i.ytimg.com/vi/800Ugz5fBZQ/maxresdefault.jpg'),(6,'https://www.youtube.com/watch?v=zNsb4_Wnqbk','私立恵比寿中学 『面皰』','「面皰」RBジャパンTVCMタイアップ曲 作詞・作曲:吉澤嘉代子 編曲:石崎光[cafelon] 私立恵比寿中学 3rd full Album「穴空」 2016年4月20日(水)発売！ http://www.sonymusic.co.jp/Music/Info/ebichu/anarchy/ 収録曲 1. 埋めて...','https://i.ytimg.com/vi/zNsb4_Wnqbk/maxresdefault.jpg');
/*!40000 ALTER TABLE `urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userComments`
--

DROP TABLE IF EXISTS `userComments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userComments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `urlId` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `time_updated` bigint(13) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userComments`
--

LOCK TABLES `userComments` WRITE;
/*!40000 ALTER TABLE `userComments` DISABLE KEYS */;
/*!40000 ALTER TABLE `userComments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `time_updated` bigint(13) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ohtasoji','おおたそうじ','ohtasoji@gmail.com','34a1c8e39063db52cfe7d5c76a1636d64f004cb4ba10b8ea7d042655d4eb6d5c','947ac66b88170fd07aac1f184c9e7ff2-1474961487566',1474961487568),(2,'soneyu','そねゆ','soneyu@gmail.com','34a1c8e39063db52cfe7d5c76a1636d64f004cb4ba10b8ea7d042655d4eb6d5c','num.png',1474960192734),(3,'deletend','まつき','deletend@gmail.com','34a1c8e39063db52cfe7d5c76a1636d64f004cb4ba10b8ea7d042655d4eb6d5c','thunders.png',1474960221091),(4,'numao','ぬまお','numao@gmail.com','34a1c8e39063db52cfe7d5c76a1636d64f004cb4ba10b8ea7d042655d4eb6d5c','ookami.png',1474960256233),(5,'tanaka','田中','tanaka@gmail.com','34a1c8e39063db52cfe7d5c76a1636d64f004cb4ba10b8ea7d042655d4eb6d5c','sample.png',1474960348160),(6,'satou','佐藤','satou@gmail.com','34a1c8e39063db52cfe7d5c76a1636d64f004cb4ba10b8ea7d042655d4eb6d5c','sample.png',1474960399728),(7,'takahashi','高橋','takahashi@gmail.com','34a1c8e39063db52cfe7d5c76a1636d64f004cb4ba10b8ea7d042655d4eb6d5c','sample.png',1474960448737),(8,'suzuki','すずきすずお','suzuki@gmail.com','34a1c8e39063db52cfe7d5c76a1636d64f004cb4ba10b8ea7d042655d4eb6d5c','sample.png',1474960501475),(9,'itou','伊藤いとじ','itou@gmail.com','34a1c8e39063db52cfe7d5c76a1636d64f004cb4ba10b8ea7d042655d4eb6d5c','sample.png',1474960520726),(10,'watanave','ワタナベ','watanave@gmail.com','34a1c8e39063db52cfe7d5c76a1636d64f004cb4ba10b8ea7d042655d4eb6d5c','sample.png',1474960544878);
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

-- Dump completed on 2016-09-28 14:10:46
