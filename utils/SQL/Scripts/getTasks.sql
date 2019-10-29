with
get_project as (
    select * from "Project" where "Project".id = $1
),
get_ref as (
    select "Project"."ProjectName", "Project".id, "ProjectToTaskMapping".task from get_project "Project" join "ProjectToTaskMapping" on "Project".id = "ProjectToTaskMapping".project
),
get_task as (
    select "ProjectTasks".* from get_ref "Project" join "ProjectTasks" on "Project".task = "ProjectTasks".id
)

select * from get_task 
