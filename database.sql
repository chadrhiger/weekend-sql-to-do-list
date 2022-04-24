CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR (250) NOT NULL,
  "isDone" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks" 
	("id", "description", "isDone") 


SELECT * FROM "tasks"

`INSERT INTO "tasks" ("description")
                   VALUES ($1);`;

                   CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
  "isDone" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks" 
	("id", "description", "complete");
	
SELECT * FROM "tasks";	

DELETE FROM "tasks" WHERE id=8;


UPDATE "tasks"
      SET "complete"=true
      WHERE "id"=3;


	





-- useful renaming tool (i am not new to this, YOU are new to this)
-- ALTER TABLE tasks 
-- RENAME COLUMN task TO description;