-- Deploy onlyg:newField to pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "app_users"
ADD COLUMN "picture_header" TEXT;

COMMIT;
