'use strict';

var database=require("./database");
var errorApi=require("../utils/error");

/**
 * Adds a project category
 *
 * no response value expected for this operation
 **/
exports.postCategory = function(name) {
  return new Promise(function(resolve, reject) {
    database.postCategory(name)
    .then(resolve)
    .catch(function(e){
      switch(e.statusCode){
        case database.errors.DATABASE_ERROR:
        //remove database specific error - will leak information
        reject(errorApi.create500Error("Something terrible happened to the database. Sorry..."));
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
 * Deletes a category
 *
 * categoryID String 
 * no response value expected for this operation
 **/
exports.deleteCategory = function(categoryID) {
  return new Promise(function(resolve, reject) {
    database.deleteCategory(categoryID)
    .then(function (result){
      if(result){//row count>0
        resolve(result);
      } else {
        reject(errorApi.create404Error("Couldn't find anything matching the request URI."));
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
 * Loads a list of project categories
 *
 * no response value expected for this operation
 **/
exports.getCategories = function() {
  return new Promise(function(resolve, reject) {
    database.getCategories()
    .then(resolve)
    .catch(function(e){
      switch(e.statusCode){
        case database.errors.DATABASE_ERROR:
        //remove specific database error - will leak information
        reject(errorApi.create500Error("Something terrible happened with the database. Sorry..."));
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


/**
 * Loads a project category
 *
 * categoryID String 
 * no response value expected for this operation
 **/
exports.getCategory = function(categoryID) {
  return new Promise(function(resolve, reject) {
    database.getCategory(categoryID)
    .then(function(result){
      if(result && result.length>0){
        resolve(result);
      } else{
        reject(errorApi.create404Error("Couldn't find anything matching the requested URI."));
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

