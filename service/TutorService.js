'use strict';

var database = require("./database");
var errorApi = require("../utils/error");

/**
 * Adds a tutor
 *
 * body Tutor 
 * returns Tutor
 **/
exports.addTutor = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "name"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes a tutor
 *
 * tutorID String 
 * no response value expected for this operation
 **/
exports.deleteTutor = function(tutorID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Stores a tutor
 *
 * tutorID String 
 * no response value expected for this operation
 **/
exports.editTutor = function(tutorID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Loads a tutor
 *
 * tutorID String 
 * no response value expected for this operation
 **/
exports.getTutor = function(tutorID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Loads a list of tutors
 *
 * no response value expected for this operation
 **/
exports.getTutors = function(tutorID) {
  return new Promise(function(resolve, reject) {
    database.getTutors(tutorID)
    .then(resolve)
    .catch(function(e){
      switch(e.statusCode){
        case database.errors.DATABASE_ERROR:
        //remove database specific errror - will leak information
        reject (errorApi.create500Error("Something terrible happened with the database. Sorry..."));
        break;
        case database.errors.INTERNAL_ERROR:
        reject(errorApi.create500Error(e.message));
        break;
        case database.errors.PARAMETER_ERROR:
        reject(errorApi.create400Error(e.message));
      }
    })
  });
}

