CREATE TABLE `users` (
  `id` int,
  `name` varchar,
  `email` varchar,
  `password` varchar,
  `time_updated` datetime
);

CREATE TABLE `orgs` (
  `id` int,
  `name` varchar,
  `description` varchar,
  `time_updated` datetime
);

CREATE TABLE `urls` (
  `id` int,
  `url` varchar,
  `title` varchar,
  `description` varchar,
  `thumbnail` varchar,
  `time_updated` datetime
);

CREATE TABLE `joiningOrgs` ( -- user_org
  `userId` int,
  `orgId` int,
  `time_updated` datetime
);

CREATE TABLE `userComments` (
  `id` int,
  `userId` int,
  `urlId` int,
  `comment` varchar,
  `time_updated` datetime
);

CREATE TABLE `orgComments` (
  `id` int,
  `userId` int,
  `orgId` int,
  `urlId` int,
  `comment` varchar,
  `time_updated` datetime
);
