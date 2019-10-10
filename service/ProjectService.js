'use strict';

var database = require("../utils/data/data");
var errorApi = require("../utils/error");
var httpUtil = require("../utils/http/http");

/**
 * Adds a project
 *
 * no response value expected for this operation
 **/
exports.postProject = function(TutorID,ProjectName,ProjectCategory,ProjectYear,StartDate,EndDate,GroupName,Notes) {
  return new Promise(function(resolve, reject) {
    database.postProject(TutorID,ProjectName,ProjectCategory,ProjectYear,StartDate,EndDate,GroupName,Notes)
    .then(resolve)
    .catch(function(e){
      switch(e.statusCode){
        case database.errors.DATABASE_ERROR:
        //remove database specific error - will leak information
        reject(errorApi.create500Error("Something terrible happened with the database. Sorry..."));
        break;
        case database.errors.INTERNAL_ERROR:
        reject(errorApi.create500Error(e.message));
        break;
        case database.errors.PARAMETER_ERROR:
        reject(errorApi.create400Error(e.message));
        break;
      }
    })
  });
}


/**
 * Deletes a project
 *
 * projectID String 
 * no response value expected for this operation
 **/
exports.deleteProject = function(projectID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Updates a project
 *
 * projectID String 
 * no response value expected for this operation
 **/
exports.editProject = function(projectID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Loads a project
 *
 * projectID String 
 * no response value expected for this operation
 **/
exports.getProject = function(projectID) {
  return new Promise(function(resolve, reject) {
    database.getProject(projectID)
    .then(function(result){
      if(result && result.length>0){
        resolve(result);
      } else {
        reject(errorApi.create404Error("Couldn't find anything matching the requested URI."));
      }
    })
    .catch(function(e){
      switch(e.statusCode){
        case database.errors.DATABASE_ERROR:
        //remove database specific error - will leak information
        reject(errorApi.create500Error("Something terrible happened with the database. Sorry..."));
        break;
        case database.errors.INTERNAL_ERROR:
        reject(errorApi.create500Error(e.message));
        break;
        case database.errors.PARAMETER_ERROR:
        reject(errorApi.create400Error(e.message));
        break;
      }
    })
  });
}


/**
 * Loads a list of projects
 *
 * no response value expected for this operation
 **/
exports.getProjects = function(args, res, next) {
  
  // TODO: Create authentication scope info object and pass to database API method below.

  var tutor_id = args.tutorID.value || null; // match whats in the swagger file

  database.getProjectsForTutor(
    tutor_id
  ).then(
    (result) => {
      httpUtil.endHttpOK(result, res);
    }
  ).catch(
    (error) => {
      httpUtil.endHttpErr(error, res);
    }
  );
};
