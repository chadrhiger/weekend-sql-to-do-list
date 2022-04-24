CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR (250) NOT NULL,
  "isDone" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks" 
	("id", "description", "isDone") 


SELECT * FROM "tasks"




-- useful renaming tool (i am not new to this, YOU are new to this)
-- ALTER TABLE tasks 
-- RENAME COLUMN task TO description;