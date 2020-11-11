-- Revert onlyg:pictureHeader from pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "app_users"
DROP COLUMN IF EXISTS "picture_header";

COMMIT;
