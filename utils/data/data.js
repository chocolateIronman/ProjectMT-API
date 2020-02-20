/**
 * Thanks to the Open-Source community for providing this project structure.
**/
"use strict";

var Sql = require("../SQL/sql");
var errorApi = require("../error");

//Getting projects allocated to a specific tutor based on their tutor ID

var doGetProjectsForTutor = async (tutor_id) => {
    var result = null;
    result = await Sql.getProjectsForTutor(tutor_id);
    return result;
}
var getProjectsForTutor = async (tutor_id) => {
    var result = null;



    if (tutor_id === null) throw errorApi.create400Error("Parameter 'tutor_id' is null.");

    try {
        result = await doGetProjectsForTutor(tutor_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
};

//function to check if a parameter is either undefined or null
function isEmpty(param) {
    return param === undefined || param === null;
}

//Creating new projects
var doPostProject = async (ProjectName, ProjectYear, StartDate, EndDate, GroupName, Notes, ProjectCategory, tutor_id) => {
    var result = [];
    result = await Sql.postProject(ProjectName, ProjectYear, StartDate, EndDate, GroupName, Notes, ProjectCategory, tutor_id);
    return result;
}
//checking if all the required parameters are valid
var postProject = async (ProjectName, ProjectYear, StartDate, EndDate, GroupName, Notes, ProjectCategory, tutor_id) => {
    var result = [];
    if (isEmpty(ProjectName)) throw errorApi.create400Error("Parameter 'ProjectName' is null.");
    if (isEmpty(ProjectYear)) throw errorApi.create400Error("Parameter 'ProjectYear' is null.");
    if (isEmpty(StartDate)) throw errorApi.create400Error("Parameter 'StartDate' is null.");
    if (isEmpty(EndDate)) throw errorApi.create400Error("Parameter 'EndDate' is null.");
    if (isEmpty(GroupName)) throw errorApi.create400Error("Parameter 'GroupName' is null.");
    if (isEmpty(Notes)) throw errorApi.create400Error("Parameter 'Notes' is null.");
    if (isEmpty(ProjectCategory)) throw errorApi.create400Error("Parameter 'ProjectCategory' is null.");
    if (isEmpty(tutor_id)) throw errorApi.create400Error("Parameter 'tutor_id' is null.");

    try {
        result = await doPostProject(ProjectName, ProjectYear, StartDate, EndDate, GroupName, Notes, ProjectCategory, tutor_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

//Getting a specific project based on their project ID
var doGetProject = async (project_id) => {
    var result = null;
    result = await Sql.getProject(project_id);
    return result;
}
var getProject = async (project_id) => {
    var result = null;

    //verification of the required parameter
    if (isEmpty(project_id)) throw errorApi.create400Error("Parameter 'project_id' is null.");

    try {
        result = await doGetProject(project_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

//Updating an existing project
var doPutProject = async (project_id, ProjectName, ProjectCategory, ProjectYear, StartDate, EndDate, GroupName, Notes) => {
    var result = null;
    result = await Sql.putProject(project_id, ProjectName, ProjectCategory, ProjectYear, StartDate, EndDate, GroupName, Notes);
    return result;
}
//verification of all the required parameters
var putProject = async (project_id, ProjectName, ProjectCategory, ProjectYear, StartDate, EndDate, GroupName, Notes) => {
    var result = null;
    if (isEmpty(project_id)) throw errorApi.create400Error("Parameter 'project_id' is null.");
    if (isEmpty(ProjectName)) throw errorApi.create400Error("Parameter 'ProjectName' is null.");
    if (isEmpty(ProjectCategory)) throw errorApi.create400Error("Parameter 'ProjectCategory' is null.");
    if (isEmpty(ProjectYear)) throw errorApi.create400Error("Parameter 'ProjectYear' is null.");
    if (isEmpty(StartDate)) throw errorApi.create400Error("Parameter 'StartDate' is null.");
    if (isEmpty(EndDate)) throw errorApi.create400Error("Parameter 'EndDate' is null.");
    if (isEmpty(GroupName)) throw errorApi.create400Error("Parameter 'GroupName' is null.");
    if (isEmpty(Notes)) throw errorApi.create400Error("Parameter 'Notes' is null.");

    try {
        result = await doPutProject(project_id, ProjectName, ProjectCategory, ProjectYear, StartDate, EndDate, GroupName, Notes);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

//Deleting a project based on its ID
var doDeleteProject = async (project_id) => {
    var result = null;
    result = await Sql.deleteProject(project_id);
    return result;
}
//verification of the requested parameter
var deleteProject = async (project_id) => {
    var result = null;

    if (isEmpty(project_id)) throw errorApi.create400Error("Parameter 'project_id' is null.");

    try {
        result = await doDeleteProject(project_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

//-------------------TUTOR---------------------
//Getting a list of all tutors
var doGetTutors = async () => {
    var result = null;
    result = await Sql.getTutors();
    return result;
}
var getTutors = async () => {
    var result = null;

    try {
        result = await doGetTutors();
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

//Getting a specific tutor based on their tutor ID
var doGetTutor = async (tutor_id) => {
    var result = null;
    result = await Sql.getTutor(tutor_id);
    return result;
}
var getTutor = async (tutor_id) => {
    var result = null;


//verification of the required parameter
    if (tutor_id === null) throw errorApi.create400Error("Parameter 'tutor_id' is null.");

    try {
        result = await doGetTutor(tutor_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

//Creating new tutor account only saving a tutor ID
var doPostTutor = async (id) => {
    var result = [];
    result = await Sql.postTutor(id);
    return result;
}
//verification of the required parameter
var postTutor = async (id) => {
    var result = [];
    if (id === null) throw ("Parameter 'id' is null.");


    result = await doPostTutor(id);

    return result;
}


//deleting an account of tutor
var doDeleteTutor = async (tutor_id) => {
    var result = null;
    result = await Sql.deleteTutor(tutor_id);
    return result;
}
var deleteTutor = async (tutor_id) => {
    var result = null;
//verification of required parameter
    if (tutor_id === null) throw errorApi.create400Error("Parameter 'tutor_id' is null.");

    try {
        result = await doDeleteTutor(tutor_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

//--------------CATEGORY---------------------
//Getting all categories
var doGetCategories = async (name) => {
    var result = null;
    result = await Sql.getCategories(name);
    return result;
}
var getCategories = async (name) => {
    var result = null;
    //TODO: Authentication check. Throw error ig not authorized.
    try {
        result = await doGetCategories(name);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}
//Getting a specific category
var doGetCategory = async (category_id) => {
    var result = null;
    result = await Sql.getCategory(category_id);
    return result;
}
var getCategory = async (category_id) => {
    var result = null;

    if (category_id === null) throw errorApi.create400Error("Parameter 'category_id' is null.");

    try {
        result = await doGetCategory(category_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}
//creating new category
var doPostCategory = async (name) => {
    var result = [];
    result = await Sql.postCategory(name);
    return result;
}
var postCategory = async (name) => {
    var result = [];
    if (name === null) throw errorApi.create400Error("Parameter 'name' is null.");

    try {
        result = await doPostCategory(name);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}
//deleting an existing vcategory
var doDeleteCategory = async (category_id) => {
    var result = null;
    result = await Sql.deleteCategory(category_id);
    return result;
}
var deleteCategory = async (category_id) => {
    var result = null;

    if (category_id === null) throw errorApi.create400Error("Parameter 'category_id' is null.");

    try {
        result = await doDeleteCategory(category_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");

    }

    return result;
}

//----------------TASKS-------------------------
//Getting a list of tasks associated with a specific project
var doGetTasks = async (project_id) => {
    var result = null;
    result = await Sql.getTasks(project_id);
    return result;
}
var getTasks = async (project_id) => {
    var result = null;

    if (project_id === null) throw errorApi.create400Error("Parameter 'project_id' is null.");

    try {
        result = await doGetTasks(project_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

//getting a specific task based on its ID
var doGetTask = async (task_id) => {
    var result = null;
    result = await Sql.getTask(task_id);
    return result;
}
var getTask = async (task_id) => {
    var result = null;

    if (task_id === null) throw errorApi.create400Error("Parameter 'task_id' is null.");

    try {
        result = await doGetTask(task_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

//creating a new task for a specific project
var doPostTask = async (TaskName, StartDate, DueDate, EndDate, Notes, ProjectID) => {
    var result = [];
    result = await Sql.postTask(TaskName, StartDate, DueDate, EndDate, Notes, ProjectID);
    return result;
}
var postTask = async (TaskName, StartDate, EndDate, DueDate, Notes, ProjectID) => {
    var result = [];
    if (isEmpty(TaskName)) throw errorApi.create400Error("Parameter 'TaskName' is null.");
    if (isEmpty(StartDate)) throw errorApi.create400Error("Parameter 'StartDate' is null.");
    if (isEmpty(DueDate)) throw errorApi.create400Error("Parameter 'DueDate' is null.");
    if (isEmpty(EndDate)) throw errorApi.create400Error("Parameter 'EndDate' is null.");
    if (isEmpty(Notes)) throw errorApi.create400Error("Parameter 'Notes' is null.");
    if (isEmpty(ProjectID)) throw errorApi.create400Error("Parameter 'ProjectID' is null.");

    try {
        result = await doPostTask(TaskName, StartDate, EndDate, DueDate, Notes, ProjectID);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

//updating an existing task based on its ID
var doPutTask = async (task_id, TaskName, StartDate, EndDate, DueDate, Notes) => {
    var result = null;
    result = await Sql.putTask(task_id, TaskName, StartDate, EndDate, DueDate, Notes);
    return result;
}
var putTask = async (task_id, TaskName, StartDate, EndDate, DueDate, Notes) => {
    var result = null;
    if (task_id === null) throw errorApi.create400Error("Parameter 'task_id' is null.");
    if (TaskName === null) throw errorApi.create400Error("Parameter 'TaskName' is null.");
    if (StartDate === null) throw errorApi.create400Error("Parameter 'StartDate' is null.");
    if (DueDate === null) throw errorApi.create400Error("Parameter 'DueDate' is null.");
    if (EndDate === null) throw errorApi.create400Error("Parameter 'EndDate' is null.");
    if (Notes === null) throw errorApi.create400Error("Parameter 'Notes' is null.");

    try {
        result = await doPutTask(task_id, TaskName, StartDate, EndDate, DueDate, Notes);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }
    return result;
}

//deleting an existing task
var doDeleteTask = async (task_id) => {
    var result = null;
    result = await Sql.deleteTask(task_id);
    return result;
}
var deleteTask = async (task_id) => {
    var result = null;

    if (task_id === null) throw errorApi.create400Error("Parameter 'task_id' is null.");

    try {
        result = await doDeleteTask(task_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

module.exports = {

    getTutors: getTutors,
    getTutor: getTutor,
    postTutor: postTutor,
    deleteTutor: deleteTutor,
    getCategories: getCategories,
    getCategory: getCategory,
    postCategory: postCategory,
    deleteCategory: deleteCategory,
    getTasks: getTasks,
    getTask: getTask,
    postTask: postTask,
    putTask: putTask,
    deleteTask: deleteTask,
    getProjectsForTutor: getProjectsForTutor,
    postProject: postProject,
    getProject: getProject,
    putProject: putProject,
    deleteProject: deleteProject
}