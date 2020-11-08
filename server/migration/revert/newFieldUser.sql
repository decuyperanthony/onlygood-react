-- Revert onlyg:newFieldUser from pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "app_users"
DROP COLUMN "description";

COMMIT;
