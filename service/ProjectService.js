'use strict';

var database = require("../utils/data/data");
var errorApi = require("../utils/error");
var httpUtil = require("../utils/http/http");

/**
 * Adds a project
 *
 * no response value expected for this operation
 **/
exports.postProject = function(args,res,next) {

  var ProjectName=args.body.value.ProjectName || null;
  var ProjectYear=args.body.value.ProjectYear || null;
  var StartDate=args.body.value.StartDate || null;
  var EndDate=args.body.value.EndDate || null;
  var GroupName=args.body.value.GroupName || null;
  var Notes=args.body.value.Notes || null;
  var ProjectCategory=args.body.value.ProjectCategory || null;

  database.postProject(
    ProjectName,
    ProjectYear,
    StartDate,
    EndDate,
    GroupName,
    Notes,
    ProjectCategory
  ).then(
    (result)=>{
      httpUtil.endHttpOK(result,res);
    }
  ).catch(
    (error)=>{
      httpUtil.endHttpErr(error,res);
    }
  )
}


/**
 * Deletes a project
 *
 * projectID String 
 * no response value expected for this operation
 **/
exports.deleteProject = function(args,res,next) {
  var project_id=args.ProjectID.value || null; //match whats in the swagger file

  database.deleteProject(
    project_id
  ).then(
    (result)=>{
      httpUtil.endHttpOK(result,res);
    }
  ).catch(
    (error)=>{
      httpUtil.endHttpErr(error,res);
    }
  )
}


/**
 * Updates a project
 *
 * projectID String 
 * no response value expected for this operation
 **/
exports.putProject = function(args,res,next) {
  
  var project_id=args.ProjectID.value || null; //match whats in the swagger file
  var ProjectName = args.body.value.ProjectName|| null;
  var ProjectCategory = args.body.value.ProjectCategory || null;
  var ProjectYear = args.body.value.ProjectYear || null;
  var StartDate = args.body.value.StartDate || null;
  var EndDate = args.body.value.EndDate || null;
  var GroupName = args.body.value.GroupName || null;
  var Notes = args.body.value.Notes || null;

  database.putProject(
    project_id,
    ProjectName,
    ProjectCategory,
    ProjectYear,
    StartDate,
    EndDate,
    GroupName,
    Notes
  ).then(
    (result)=>{
      httpUtil.endHttpOK(result,res);
    }
  ).catch(
    (error)=>{
      httpUtil.endHttpErr(error,res);
    }
  )
}


/**
 * Loads a project
 *
 * projectID String 
 * no response value expected for this operation
 **/
exports.getProject = function(args,res,next) {
  var project_id=args.ProjectID.value || null; //match whats in the swagger file
  database.getProject(
    project_id
  ).then(
    (result)=>{
      httpUtil.endHttpOK(result,res);
    }
  ).catch(
    (error)=>{
      httpUtil.endHttpErr(error,res);
    }
  )
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
