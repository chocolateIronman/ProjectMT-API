with 
get_tutor as (
	select * from "Tutor" where "Tutor".id = $1
),
get_ref as (
	select  "Tutor".id, "ProjectToTutorMapping".project from get_tutor "Tutor" join "ProjectToTutorMapping"  on "Tutor".id = "ProjectToTutorMapping".tutor
),
get_project as (
	select "Project".* from get_ref "Tutor" join "Project"  on "Tutor".project = "Project".id
)

select * from get_project