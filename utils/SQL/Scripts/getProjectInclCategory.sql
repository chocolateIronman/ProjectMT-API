SELECT "Project".*, "ProjectCategories".name
FROM "Project" JOIN "ProjectToCategoryMapping" ON "ProjectToCategoryMapping".project = "Project".id
				JOIN "ProjectCategories" ON "ProjectCategories".id = "ProjectToCategoryMapping".category
WHERE "Project".id= $1
