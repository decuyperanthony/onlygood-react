-- Deploy onlyg:updateTableMessage to pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE IF EXISTS "likes";
DROP TABLE IF EXISTS "messages";

CREATE TABLE "post" (
  "id" SERIAL PRIMARY KEY,
  "content" TEXT NOT NULL,
  "picture" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NULL,
  "app_users_id" INT NOT NULL REFERENCES "app_users"("id")
);

CREATE TABLE "user_likes_post"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "app_users_id" INT NOT NULL REFERENCES "app_users"("id") ON DELETE CASCADE,
    "post_id" INT NOT NULL REFERENCES "post"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    UNIQUE ("app_users_id", "post_id")
);

INSERT INTO "post" ("content", "app_users_id") VALUES
('super ville', 1),
('merveilleux restaurant', 2),
('Boutique formidable', 3),
('Je poste ceci ici', 4),
('Cet endroit est fabuleux', 8);

COMMIT;
