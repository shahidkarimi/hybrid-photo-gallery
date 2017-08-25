/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.7.11 : Database - fpv
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `directory` */

DROP TABLE IF EXISTS `directory`;

CREATE TABLE `directory` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `creator` int(11) DEFAULT NULL,
  `group_id` varchar(20) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `directory` */

/*Table structure for table `file_stats` */

DROP TABLE IF EXISTS `file_stats`;

CREATE TABLE `file_stats` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `fgroup` varchar(20) DEFAULT NULL,
  `volume_consumed` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `file_stats` */

insert  into `file_stats`(`id`,`fgroup`,`volume_consumed`) values (2,'fgroup1',739.34445571902);

/*Table structure for table `media` */

DROP TABLE IF EXISTS `media`;

CREATE TABLE `media` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `file_type` varchar(10) DEFAULT NULL,
  `group_id` varchar(20) DEFAULT NULL,
  `is_dir` tinyint(1) DEFAULT '0',
  `parent_id` bigint(20) DEFAULT '0',
  `actual_file_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=262 DEFAULT CHARSET=latin1;

/*Data for the table `media` */

insert  into `media`(`id`,`user_id`,`file_name`,`created_at`,`updated_at`,`file_type`,`group_id`,`is_dir`,`parent_id`,`actual_file_name`) values (261,1,'1-20170825-101238-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(260,1,'1-20170825-100938-uploaded.jpeg',NULL,NULL,'image','fgroup1',0,0,NULL),(259,1,'1-20170825-100738-uploaded.jpeg',NULL,NULL,'image','fgroup1',0,0,NULL),(255,1,'1-20170627-121849-uploaded.png',NULL,NULL,'image','fgroup1',0,254,NULL),(254,1,'the best folder',NULL,NULL,'image','fgroup1',1,0,NULL),(253,1,'1-20170627-124544-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(252,1,'1-20170627-122744-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(258,1,'1-20170825-100438-uploaded.jpeg',NULL,NULL,'image','fgroup1',0,0,NULL),(257,1,'1-20170825-105937-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(249,1,'1-20170411-090403-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(248,1,'1-20170411-094402-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(247,1,'1-20170411-093702-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(246,1,'1-20170411-093102-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(245,1,'1-20170411-092402-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(243,1,'Hidden folder',NULL,NULL,'image','fgroup1',1,227,NULL),(244,1,'Super hidden folder',NULL,NULL,'image','fgroup1',1,243,NULL),(236,1,'1-20170406-035020-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(235,1,'1-20170406-034700-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(234,1,'1-20170402-094107-uploaded.jpg',NULL,NULL,'image','fgroup1',0,227,NULL),(233,1,'1-20170402-091707-uploaded.jpg',NULL,NULL,'image','fgroup1',0,227,NULL),(256,1,'1-20170825-102337-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(231,1,'1-20170401-042043-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(230,1,'1-20170401-041443-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(229,1,'1-20170401-041043-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(228,1,'1-20170401-120647-uploaded.jpg',NULL,NULL,'image','fgroup1',0,227,NULL),(227,1,'My Items',NULL,NULL,'image','fgroup1',1,0,NULL),(226,1,'ttttttttttttttt',NULL,NULL,'image','fgroup1',1,0,NULL),(225,1,'1-20170401-122131-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(224,1,'1-20170401-121527-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL),(223,1,'1-20170401-125126-uploaded.jpg',NULL,NULL,'image','fgroup1',0,0,NULL);

/*Table structure for table `migration` */

DROP TABLE IF EXISTS `migration`;

CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `migration` */

insert  into `migration`(`version`,`apply_time`) values ('m000000_000000_base',1487610087),('m130524_201442_init',1487610089),('m150812_015333_create_country_table',1487610089),('m150812_020403_populate_country',1487610089);

/*Table structure for table `settings` */

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `fgroup_name` varchar(20) DEFAULT NULL,
  `quota` double DEFAULT NULL,
  `photo_limit` double DEFAULT NULL,
  `video_limit` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `settings` */

insert  into `settings`(`id`,`fgroup_name`,`quota`,`photo_limit`,`video_limit`) values (1,'fgroup1',1000,100,1000),(2,'fgroup2',1000,10,1000);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `auth_key` varchar(32) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `role` smallint(6) NOT NULL DEFAULT '10',
  `status` smallint(6) NOT NULL DEFAULT '10',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `secret_key` varchar(100) DEFAULT NULL,
  `group` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`auth_key`,`password_hash`,`password_reset_token`,`email`,`role`,`status`,`created_at`,`updated_at`,`secret_key`,`group`) values (1,'pu1','j346363lk46j34baer34','123',NULL,'pu1@fpv.com',10,10,2147483647,2147483647,'kjl456j7l473l5k7j','fgroup1'),(2,'pu2','ljiID897Df','123',NULL,'pu2@fpv.com',10,10,2147483647,2147483647,'dfLKskf8oaf','fgroup2');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
