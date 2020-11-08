-- Revert onlyg:updateAndAddAllTable from pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "post"
DROP COLUMN "status";

DROP TABLE IF EXISTS "user_retweet_post";
DROP TABLE IF EXISTS "user_saved_post";
DROP TABLE IF EXISTS "user_comments_post";
DROP TABLE IF EXISTS "relationship";


COMMIT;
