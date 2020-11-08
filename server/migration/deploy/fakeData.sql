-- Deploy onlyg:fakeData to pg

BEGIN;

-- XXX Add DDLs here.
-- RETWEET
INSERT INTO "user_retweet_post" ("app_users_id", "post_id") VALUES
(1, 1),
(2, 2),
(2, 3),
(4, 4),
(8, 4),
(3, 1);

-- SAVED
INSERT INTO "user_saved_post" ("app_users_id", "post_id") VALUES
(1, 1),
(2, 2),
(2, 3),
(4, 4),
(8, 4),
(3, 1);

INSERT INTO "user_likes_post" ("app_users_id", "post_id") VALUES
(1, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 4),
(8, 4),
(3, 1);

-- COMMENT
INSERT INTO "user_comments_post" ("app_users_id", "post_id", "content") VALUES
(1, 1, 'merci pour ce post'),
(2, 2, 'bonne nouvelle'),
(1, 3, 'c est noté'),
(8, 4, 'Yes!!'),
(3, 1, 'Trop bien');

-- RELATION SHIP
INSERT INTO "relationship" ("follower_id", "followed_id") VALUES
(1, 2),
(2, 1),
(2, 3),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(8, 2),
(7, 2);

COMMIT;
