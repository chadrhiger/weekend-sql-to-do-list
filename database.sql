CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
  "isDone" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks" 
	("id", "task", "isDone") 


SELECT * FROM "tasks";