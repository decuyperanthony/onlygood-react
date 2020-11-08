-- Revert onlyg:fakeData from pg

BEGIN;

-- XXX Add DDLs here.
DELETE FROM "user_retweet_post";
DELETE FROM "user_saved_post";
DELETE FROM "user_likes_post";
DELETE FROM "user_comments_post";
DELETE FROM "relationship";

COMMIT;
