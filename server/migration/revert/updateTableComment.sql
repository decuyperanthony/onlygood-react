-- Revert onlyg:updateTableComment from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE IF EXISTS "user_comments_post";

COMMIT;
