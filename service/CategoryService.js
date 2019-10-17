'use strict';

var database=require("../utils/data/data");
var errorApi=require("../utils/error");
var httpUtil = require("../utils/http/http");

/**
 * Adds a project category
 *
 * no response value expected for this operation
 **/
exports.postCategory = function(args,res,next) {
  
  var name=args.body.value.name || null; //match whats in the swagger file

  database.postCategory(
    name
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
 * Deletes a category
 *
 * categoryID String 
 * no response value expected for this operation
 **/
exports.deleteCategory = function(args,res,next) {
  var category_id=args.categoryID.value || null; //matches whats in the swagger file

  database.deleteCategory(
    category_id
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
 * Loads a list of project categories
 *
 * no response value expected for this operation
 **/
exports.getCategories = function(args,res,next) {
  
  database.getCategories().then(
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
 * Loads a project category
 *
 * categoryID String 
 * no response value expected for this operation
 **/
exports.getCategory = function(args,res,next) {
  var category_id=args.categoryID.value || null; //match whats in the swagger file
  database.getCategory(
    category_id
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

