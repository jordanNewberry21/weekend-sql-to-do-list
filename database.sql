-- CREATE TABLE command

CREATE TABLE tasks (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (200) NOT NULL,
	"task_completed" BOOLEAN NOT NULL
);

-- Example of task being inserted
INSERT INTO tasks (task, task_completed)
VALUES ('Get oil changed', FALSE);