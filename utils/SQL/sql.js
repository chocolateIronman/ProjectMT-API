var genApi = require("../queryGeneration/gen")(__dirname + "/Scripts");
var dbApi = require("../database/databaseService");

class Sql {

    //------------PROJECT----------------
    static async getProjectsForTutor(tutor_id, page, size, sort, filters) {
        var result = null;

        // TODO: pagination

        var parameters = [tutor_id];

        // single query wrapped in multi query stuff
        var query = genApi.gen("getProjectsForTutor", parameters);
        var responses = await dbApi.multiQuery([query]);

        if (responses[0].rows.length > 0) {
            result = responses[0].rows;
        }

        return result;
    }

    static async postProject(ProjectName,ProjectYear,StartDate,EndDate,GroupName,Notes,ProjectCategory){
        var result=[];

        var createProjectQuery = genApi.gen("postProject", [ProjectName,ProjectYear,StartDate,EndDate,GroupName,Notes]);
        var responses = await dbApi.multiQuery([createProjectQuery]);

        if (responses.length > 0) {
            var createProjectResponse = responses[0];
            if (createProjectResponse.rows.length > 0) {
                result = createProjectResponse.rows[0];

                var query = genApi.gen("createProjectToCategoryMapping", [result.id, ProjectCategory]);

                var responses = await dbApi.multiQuery([query]);

                if (responses.length > 0) {
                    if (responses[0].rows.length > 0) {
                        result.ProjectCategory = responses[0].rows[0].id;
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
        var query = genApi.gen("getProject",parameters);
        var responses = await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result = responses[0].rows;
        }

        return result;
    }

    static async putProject(project_id,ProjectName,ProjectCategory,ProjectYear,StartDate,EndDate,GroupName,Notes){
        var result=[];

        var updateProjectQuery = genApi.gen("putProject",[project_id,ProjectName,ProjectYear,StartDate,EndDate,GroupName,Notes]);
        var responses = await dbApi.multiQuery([updateProjectQuery]);

        if(responses.length>0){
            var putProjectResponse = responses[0];
            if(putProjectResponse.rows.length>0){
                result=putProjectResponse.rows[0];

                var queries = [];
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
        var query=genApi.gen("getTutor",parameters);
        var responses=await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result=responses[0].rows;
        }

        return result;
    }

    static async postTutor(name){
        var result=[];
        var parameters=[name];

        //single query wrapped in multi query stuff
        var query=genApi.gen("postTutor",parameters);
        var responses=await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result=responses[0].rows;
        }

        return result;
    }

    static async putTutor(tutor_id,name) {
        var result=null;
        var parameters = [tutor_id, name];

        //single query wrapped in multi query stuff
        var query=genApi.gen("putTutor",parameters);
        var responses= await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0) {
            result =responses[0].rows;
        }

        return result;
    }

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
    static async getCategories(){
        var result=null;
        //TODO: pagination
        var parameters=[];
        //single query wrapped in multi query stuff
        var query=genApi.gen("getCategories",parameters);
        var responses=await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result=responses[0].rows;
        }

        return result;
    }

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
        var query = genApi.gen("deleteCategory",parameters);
        var responses = await dbApi.multiQuery([query]);

        if (responses[0].rows.length>0) {
            result = responses[0].rows;
        }

        return result;
    }

    //-------------TASKS---------------
    static async getTasks(project_id){
        var result=null;
        //TODO: pagination
        var parameters=[project_id];
        //single query wrapped in multi query stuff
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
        var query=genApi.gen("getTask",parameters);
        var responses=await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result = responses[0].rows;
        }

        return result;
    }

    static async postTask(TaskName,StartDate,DueDate,EndDate,Notes,ProjectID){
        var result=[];
        
        var createTaskQuery = genApi.gen("postTask",[TaskName,StartDate,DueDate,EndDate,Notes]);
        var responses = await dbApi.multiQuery([createTaskQuery]);

        if(responses.length>0) {
            var createTaskResponse = responses[0];
            if(createTaskResponse.rows.length>0){
                result = createTaskResponse.rows[0];

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
        var query=genApi.gen("deleteTask",parameters);
        var responses=await dbApi.multiQuery([query]);

        if(responses[0].rows.length>0){
            result=responses[0].rows;
        }

        return result;
    }
}

module.exports = Sql;