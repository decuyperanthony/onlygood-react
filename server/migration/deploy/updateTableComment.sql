-- Deploy onlyg:updateTableComment to pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE IF EXISTS "user_comments_post";

-- COMMENTS
CREATE TABLE "user_comments_post"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "app_users_id" INT NOT NULL REFERENCES "app_users"("id") ON DELETE CASCADE,
    "post_id" INT NOT NULL REFERENCES "post"("id") ON DELETE CASCADE,
    "content" TEXT,
    "picture" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP
);

INSERT INTO "user_comments_post" ("app_users_id", "post_id", "content") VALUES
(1, 1, 'merci pour ce post'),
(2, 2, 'bonne nouvelle'),
(1, 3, 'c est noté'),
(3, 1, 'Trop bien');


COMMIT;
