-- Deploy onlyg:pictureHeader to pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "app_users"
DROP COLUMN IF EXISTS "picture_header";
ALTER TABLE "app_users"
ADD COLUMN "picture_header" TEXT default 'picture_header.jpg';

COMMIT;
