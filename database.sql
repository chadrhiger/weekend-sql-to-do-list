CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(200) NOT NULL,
    "pending" BOOLEAN DEFAULT false
);