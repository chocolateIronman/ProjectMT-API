'use strict';

var database = require("../utils/data/data");
var errorApi = require("../utils/error");
var httpUtil = require("../utils/http/http");
var auth=require("../utils/authentication");

/**
 * Adds a tutor
 *
 * body Tutor 
 * returns Tutor
 **/
exports.postTutor = function(args,res,next) {
  
  var tutorid=auth.getHeaderInfo(res.socket.parser.incoming);
  

  database.postTutor(
    tutorid
  ).then(
    (result) => {
      httpUtil.endHttpOK(result,res);
    }
  ).catch(
    (error) => {
      httpUtil.endHttpErr(error,res);
    }
  )
}


/**
 * Deletes a tutor
 *
 * tutorID String 
 * no response value expected for this operation
 **/
exports.deleteTutor = function(args,res,next) {
  var tutor_id=args.TutorID.value || null; //match whats in the swagger file

  database.deleteTutor(
    tutor_id
  ).then(
    (result) => {
      httpUtil.endHttpOK(result,res);
    }
  ).catch(
    (error) => {
      httpUtil.endHttpErr(error,res);
    }
  )
}


/**
 * Stores a tutor
 *
 * tutorID String 
 * body Tutor
 * returns Tutor
 **/
exports.putTutor = function(args,res,next) {

  var tutor_id=args.TutorID.value || null; //match whats in the swagger file
  var name=args.body.value.name || null;
  database.putTutor(
    tutor_id,
    name
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
 * Loads a tutor
 *
 * tutorID String 
 * no response value expected for this operation
 **/
exports.getTutor = function(args,res,next) {
  // TODO: Create authentication scope into object and pass to database API method below.
  var tutor_id=args.TutorID.value || null; //match whats in the swagger file
  database.getTutor(
    tutor_id
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
 * Loads a list of tutors
 *
 * no response value expected for this operation
 **/
exports.getTutors = function(args,res,next) {
  // TODO: Create authentication scopeinfo object and pass to database API method below.
  database.getTutors().then(
    (result)=>{
      httpUtil.endHttpOK(result,res);
    }
  ).catch(
    (error)=>{
      httpUtil.endHttpErr(error,res);
    }
  );
};

