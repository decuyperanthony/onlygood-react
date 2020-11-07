-- Revert onlyg:updateTableMessage from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE IF EXISTS "user_likes_post";
DROP TABLE IF EXISTS "post";



COMMIT;
