INSERT INTO "ProjectTasks" ("TaskName","StartDate","DueDate","EndDate","Notes") VALUES($1,$2,$3,$4,$5) RETURNING *