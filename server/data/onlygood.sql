--
-- Structure de la table 'users'
--
BEGIN;

DROP TABLE IF EXISTS "app_users", "messages", "likes" ;

CREATE TABLE "app_users" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "picture_road" TEXT NULL DEFAULT 'avatar.png',
  "role" TEXT NOT NULL DEFAULT 'user',
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP
  );

--
-- Contenu de la table 'users'
--

CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "content" TEXT NOT NULL,
  "attachment" TEXT NULL,
  "likes" INT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NULL,
  "app_users_id" INT NOT NULL REFERENCES "app_users"
("id"));

--
-- table de liaison "likes"
--
CREATE TABLE "likes" (
  "messages_id" INT NOT NULL REFERENCES "messages"("id") ON DELETE CASCADE,
  "app_users_id" INT NOT NULL REFERENCES "app_users"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("messages_id", "app_users_id")
);



INSERT INTO "app_users" ("firstname", "lastname", "email", "password", "picture_road", "role") VALUES
('Philippe', 'Candille', 'philippe@oclock.io', '$2b$10$7vwYGrz2TGeyG4X8YnD9BOag9I.YKGUTJELs64qGmcK/syHu2BzTG', 'avatar.png', 'user'),
('Anthony', 'de Cuyper', 'decuyperanthony@hotmail.com', '$2b$10$kMAra/erHvPq.cjkmawpCOTqcTIj9yr.A83gfv1q0iTJvjKF5Xrqy', 'avatar.png', 'admin'),
('Aruna', 'Gayo', 'gayo.aruna@gmail.com', '$2b$10$362DDLIKa/r.q5tsrGjKd.UIaHPZrVap15Y6HE.v6Fxv6/yxjaW4m', 'aruna.JPG', 'admin'),
('Leonard', 'de Cuyper', 'decuyperleonard@gmail.com', '$2b$10$Gbsal8Ti2kqXZyif8CTfLuINlhWvYUCmkIst7BMj84p.Vh.JC5JfW', 'leonard.jpg', 'user');


INSERT INTO "messages" ("content", "app_users_id") VALUES
('super site', 1);




-- Contenu de la table 'message'

-- INSERT INTO "messages"("id", "content", "created_at", "updated_at", "app_users_id") VALUES
-- (1, "Super site!", "2020-02-26 19:58:49.961", "2020-02-26 19:58:49.961", 2);

-- simple quote obligé dans les INSERT INTO ac postgres
COMMIT;