-- Deploy onlyg:updateAndAddAllTable to pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE "post"
ADD COLUMN "status" TEXT;


-- RETWEET
CREATE TABLE "user_retweet_post"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "app_users_id" INT NOT NULL REFERENCES "app_users"("id") ON DELETE CASCADE,
    "post_id" INT NOT NULL REFERENCES "post"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    UNIQUE ("app_users_id", "post_id")
);

-- SAVED
CREATE TABLE "user_saved_post"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "app_users_id" INT NOT NULL REFERENCES "app_users"("id") ON DELETE CASCADE,
    "post_id" INT NOT NULL REFERENCES "post"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    UNIQUE ("app_users_id", "post_id")
);

-- COMMENTS
CREATE TABLE "user_comments_post"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "app_users_id" INT NOT NULL REFERENCES "app_users"("id") ON DELETE CASCADE,
    "post_id" INT NOT NULL REFERENCES "post"("id") ON DELETE CASCADE,
    "content" TEXT,
    "picture" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    UNIQUE ("app_users_id", "post_id")
);

-- RELATIONSHIP
CREATE TABLE "relationship"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "follower_id" INT NOT NULL REFERENCES "app_users"("id"),
    "followed_id" INT NOT NULL REFERENCES "app_users"("id"),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP
);





COMMIT;
