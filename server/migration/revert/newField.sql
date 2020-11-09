-- Revert onlyg:newField from pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "app_users"
DROP COLUMN "picture_header";

COMMIT;
