var genApi = require("../queryGeneration/gen")(__dirname + "/Scripts");
var dbApi = require("../database/databaseService");

class Sql {
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

        // TODO: pagination

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

}

module.exports = Sql;