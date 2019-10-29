'use strict';

var database = require("../utils/data/data");
var httpUtil = require("../utils/http/http")

/**
 * Adds a project task
 *
 * no response value expected for this operation
 **/
exports.postTask = function(args,res,next) {
  var TaskName=args.body.value.TaskName || null; //match whats in the swagger file
  var StartDate=args.body.value.StartDate || null;
  var EndDate=args.body.value.EndDate || null;
  var DueDate=args.body.value.DueDate || null;
  var Notes=args.body.value.Notes || null;
  var ProjectID=args.body.value.ProjectID || null;

  database.postTask(
    TaskName,
    StartDate,
    DueDate,
    EndDate,
    Notes,
    ProjectID
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
 * Deletes a task
 *
 * taskID String 
 * no response value expected for this operation
 **/
exports.deleteTask = function(args,res,next) {
  var task_id=args.TaskID.value || null;//match whats in the swagger file

  database.deleteTask(
    task_id
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
 * Stores a task
 *
 * taskID String 
 * no response value expected for this operation
 **/
exports.putTask = function(args,res,next) {
  
  var task_id=args.TaskID.value || null; //match whats in the swagger file
  var TaskName=args.body.value.TaskName || null; //match whats in the swagger file
  var StartDate=args.body.value.StartDate || null;
  var EndDate=args.body.value.EndDate || null;
  var DueDate=args.body.value.DueDate || null;
  var Notes=args.body.value.Notes || null;

  database.putTask(
    task_id,
    TaskName,
    StartDate,
    DueDate,
    EndDate,
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
 * Loads a task
 *
 * taskID String 
 * no response value expected for this operation
 **/
exports.getTask = function(args,res,next) {
  var task_id=args.TaskID.value || null;//match whats in the swagger file
  database.getTask(
    task_id
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
 * Loads a list of project tasks
 *
 * no response value expected for this operation
 **/
exports.getTasks = function(args,res,next) {

  var project_id=args.projectID.value || null;//match whats in the swagger file

  database.getTasks(
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

