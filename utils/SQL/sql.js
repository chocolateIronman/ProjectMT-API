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
}

module.exports = Sql;