-- Revert onlygood:firstmigration from pg

BEGIN;

-- XXX Add DDLs here.

DROP TABLE "likes";

DROP TABLE "messages";

DROP TABLE "likes";

COMMIT;
