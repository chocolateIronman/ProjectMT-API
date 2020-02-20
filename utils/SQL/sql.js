var genApi = require("../queryGeneration/gen")(__dirname + "/Scripts");
var dbApi = require("../database/databaseService");

class Sql {

    //------------PROJECT----------------
    static async getProjectsForTutor(tutor_id, page, size, sort, filters) {
        var result = null;

        // TODO: pagination

        var parameters = [tutor_id];

        // single query wrapped in multi query stuff
        //SQL query to get all projects for a specific tutor
        var query = genApi.gen("getProjectsForTutor", parameters);
        var responses = await dbApi.multiQuery([query]);

        if (responses[0].rows.length > 0) {
            result = responses[0].rows;
        }

        return result;
    }

    
    static async postProject(ProjectName,ProjectYear,StartDate,EndDate,GroupName,Notes,ProjectCategory,tutor_id){
        var result=[];
        //SQL query for creating a new project
        var createProjectQuery = genApi.gen("postProject", [ProjectName,ProjectYear,StartDate,EndDate,GroupName,Notes]);
        var responses = await dbApi.multiQuery([createProjectQuery]);

        if (responses.length > 0) {
            var createProjectResponse = responses[0];
            if (createProjectResponse.rows.length > 0) {
                result = createProjectResponse.rows[0];
                //creating a project to category mapping so project has a specific category associated with it
                var query1 = genApi.gen("createProjectToCategoryMapping", [result.id, ProjectCategory]);

                var response1 = await dbApi.multiQuery([query1]);
                //creating a project to tutor mapping so a project has a specific tutor
                var query2 = genApi.gen("createProjectToTutorMapping", [result.id,tutor_id]);

                var response2 = await dbApi.multiQuery([query2]);

                if (response1.length > 0) {
                    if (response1[0].rows.length > 0) {
                        result.ProjectCategory = response1[0].rows[0].id;
                    }
                }
                if (response2.length > 0) {
                    if (response2[0].rows.length > 0) {
                        result.ProjectCategory = response2[0].rows[0].id;
                    }
                }
            }
        }

        return result;
    }

    static async getProject(project_id){
        var result = null;
        var parameters=[project_id];

        //single query wrapped in multi query stuff
        //gettting a project including it's category from the mapping table
        var query = genApi.gen("getProjectInclCategory",parameters);
        var responses = await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result = responses[0].rows;
        }
        else{ //getting a project excluding the category if a mapping doesn't exist
            var queryy=genApi.gen("getProject",parameters);
            var response = await dbApi.multiQuery([queryy]);

            if(response[0].rows.length>0){
                result = response[0].rows;
            }
        }

        return result;
    }

    static async putProject(project_id,ProjectName,ProjectCategory,ProjectYear,StartDate,EndDate,GroupName,Notes){
        var result=[];
        //updatinng a project
        var updateProjectQuery = genApi.gen("putProject",[project_id,ProjectName,ProjectYear,StartDate,EndDate,GroupName,Notes]);
        var responses = await dbApi.multiQuery([updateProjectQuery]);

        if(responses.length>0){
            var putProjectResponse = responses[0];
            if(putProjectResponse.rows.length>0){
                result=putProjectResponse.rows[0];

                var queries = [];
                //deleting the project to category mapping and creating a new one if category is updated
                queries.push(genApi.gen("deleteProjectToCategoryMapping",[project_id]));
                queries.push(genApi.gen("createProjectToCategoryMapping",[project_id,ProjectCategory]));

                var responses = await dbApi.multiQuery(queries);

                
            }
        }

        return result;
    }

    static async deleteProject(project_id){
        var result = null;
        var parameters = [project_id];

        //single query wrapped in multi query stuff
        //deleting an existing project
        var query = genApi.gen("deleteProject",parameters);
        var responses = await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result = responses[0].rows;
        }

        return result;
    }

    //--------------TUTOR---------------------
    static async getTutors(){
        var result=null;
        //TODO: pagination
        var parameters=[];
        //single query wrapped in multi query stuff
        //getting all tutors
        var query=genApi.gen("getTutors",parameters);
        var responses=await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result=responses[0].rows;
        }
        return result;
    }

    
    static async getTutor(tutor_id){
        var result=null;
        var parameters=[tutor_id];

        //single query wrapped in multi query stuff
        //getting the id of a specific tutor
        var query=genApi.gen("getTutor",parameters);
        var responses=await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result=responses[0].rows;
        } else{
           //checking if the tutor id already exists if not create a new tutor
                var query=genApi.gen("postTutor",parameters);
                var responses=await dbApi.multiQuery([query]);
        
                if(responses[0].rows.length>0){
                    result=responses[0].rows;
                }
        
                return result;
            
        }

        return result;
    }

    static async postTutor(tutor_id){
        var result=[];
        var parameters=[tutor_id];

        //single query wrapped in multi query stuff
        //creating a new tutor account
        var query=genApi.gen("postTutor",parameters);
        var responses=null;
        try{
            responses=await dbApi.multiQuery([query]);
        } catch(e){
            throw("User exists!");
        }
       

       
        result=responses[0].rows[0];
        
        

        return result;
    }

    
//deleting an existing tutor from DB
    static async deleteTutor(tutor_id){
        var result=null;
        var parameters =[tutor_id];

        //single query wrapped in multi query stuff
        var query=genApi.gen("deleteTutor",parameters);
        var responses = await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0) {
            result=responses[0].rows;
        }

        return result;
    }

    //-----------------CATEGORY---------------------
    
    static async getCategories(name){
        var result=null;
        //TODO: pagination
        
        
        
        //getting all categories
        if(name==null){
            var query=genApi.gen("getAllCategories",[]);
            var responses=await dbApi.multiQuery([query]);
        }
        else{
            //getting specific categories based on a search of their name
            name = "%" + name + "%";
            var parameters=[name];
            var query=genApi.gen("getCategories",parameters);
            var responses=await dbApi.multiQuery([query]);
        }
        
        

        if(responses[0].rows.length>0){
            result=responses[0].rows;
        }

        return result;
    }
    //getting a category based on its id
    static async getCategory(category_id){
        var result=null;
        var parameters=[category_id];

        //single query wrapped in multi query stuff
        var query=genApi.gen("getCategory",parameters);
        var responses=await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result=responses[0].rows;
        }

        return result;
    }

    static async postCategory(name) {
        var result = [];
        var parameters=[name];

        //single query wrapped in multi query stuff
        //creating new project category
        var query = genApi.gen("postCategory",parameters);
        var responses = await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result = responses[0].rows;
        }
        
        return result;
    }

    static async deleteCategory(category_id){
        var result = null;
        var parameters = [category_id];

        //single query wrapped in multi query stuff
        //deleting an existing category
        var query = genApi.gen("deleteCategory",parameters);
        var responses = await dbApi.multiQuery([query]);

        if (responses[0].rows.length>0) {
            result = responses[0].rows;
        }

        return result;
    }

    //-------------TASKS---------------
    static async getTasks(project_id){
        var result=[];
        //TODO: pagination
        var parameters=[project_id];
        //single query wrapped in multi query stuff
        //getting all tasks associated to a specific project
        var query=genApi.gen("getTasks",parameters);
        var responses=await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result=responses[0].rows;
        }
        return result;
    }

    static async getTask(task_id){
        var result=null;
        var parameters=[task_id];

        //single query wrapped in multi query stuff
        //getting a specific task
        var query=genApi.gen("getTask",parameters);
        var responses=await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result = responses[0].rows;
        }

        return result;
    }

    static async postTask(TaskName,StartDate,DueDate,EndDate,Notes,ProjectID){
        var result=[];
        //creating a new taks
        var createTaskQuery = genApi.gen("postTask",[TaskName,StartDate,DueDate,EndDate,Notes]);
        var responses = await dbApi.multiQuery([createTaskQuery]);

        if(responses.length>0) {
            var createTaskResponse = responses[0];
            if(createTaskResponse.rows.length>0){
                result = createTaskResponse.rows[0];
                //associating the task with a specific project through project to task mapping
                var query = genApi.gen("createProjectToTaskMapping", [result.id, ProjectID]);

                var responses = await dbApi.multiQuery([query]);

                if(responses.length>0){
                    if(responses[0].rows.length>0){
                        result.ProjectID = responses[0].rows[0].id;
                    }
                }
            }
        }

        return result;
    }

    static async putTask(task_id,TaskName,StartDate,DueDate,EndDate,Notes){
        var result=null;
        var parameters=[task_id,TaskName,StartDate,DueDate,EndDate,Notes];

        //single query wrapped in multi query stuff
        //updating an existing task
        var query=genApi.gen("putTask",parameters);
        var responses = await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result=responses[0].rows;
        }

        return result;
    }

    static async deleteTask(task_id){
        var result=null;
        var parameters=[task_id];

        //single query wrapped in multi query stuff
        //deleting an existing task
        var query=genApi.gen("deleteTask",parameters);
        var responses=await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result=responses[0].rows;
        }

        return result;
    }
}

module.exports = Sql;