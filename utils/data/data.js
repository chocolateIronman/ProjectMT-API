"use strict";

var Sql = require("../SQL/sql");
var errorApi = require("../error");

var doGetProjectsForTutor = async (tutor_id) => {
    var result = null;
    result = await Sql.getProjectsForTutor(tutor_id);
    return result;
}

var getProjectsForTutor = async (tutor_id) => {
    var result = null;

    // TODO: Authentication check. Throw error if not authorized.

    if (tutor_id === null) throw errorApi.create400Error("Parameter 'tutor_id' is null.");

    try {
        result = await doGetProjectsForTutor(tutor_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
};

module.exports = {
    getProjectsForTutor: getProjectsForTutor
}