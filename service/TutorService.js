'use strict';

var database = require("./database");
var errorApi = require("../utils/error");

/**
 * Adds a tutor
 *
 * body Tutor 
 * returns Tutor
 **/
exports.postTutor = function(name) {
  return new Promise(function(resolve,reject){
    console.log(database.postTutor);
    database.postTutor(name)
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
    
  })
}


/**
 * Deletes a tutor
 *
 * tutorID String 
 * no response value expected for this operation
 **/
exports.deleteTutor = function(tutorID) {
  return new Promise(function(resolve, reject) {
    database.deleteTutor(tutorID)
      .then(function (result){
        if(result){ //row count>0
          resolve(result);
        } else{
          reject(errorApi.create404Error("Couldn't find anything matching the request URI."));
        }
      })
      .catch(function(e){
        switch(e.statusCode){
          case database.errors.DATABASE_ERROR:
          //remove database specific error - will leak information.
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
 * Stores a tutor
 *
 * tutorID String 
 * body Tutor
 * returns Tutor
 **/
exports.putTutor = function(tutorID,name) {
  return new Promise(function(resolve, reject) {
    database.putTutor(tutorID,name)
      .then(resolve)
      .catch(function(e){
        switch (e.statusCode){
          case database.errors.DATABASE_ERROR:
          //remove database specific error - will leak information.
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
 * Loads a tutor
 *
 * tutorID String 
 * no response value expected for this operation
 **/
exports.getTutor = function(tutorID) {
  return new Promise(function(resolve, reject) {
    database.getTutor(tutorID)
    .then(function(result){
      if(result && result.length>0){
        resolve(result);
      } else {
        reject(errorApi.create404Error("Couldn't find anything matching the request URI."));
      }
    })
    .catch(function (e){
      switch (e.statusCode){
        case database.errors.DATABASE_ERROR:
          //remove database specific error - will leak information.
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
        break;
      }
    })
  });
}

