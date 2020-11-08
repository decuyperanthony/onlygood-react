-- Deploy onlyg:newFieldUser to pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "app_users"
ADD COLUMN "description" TEXT default 'my description';


COMMIT;
