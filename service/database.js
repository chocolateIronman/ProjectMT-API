'use strict';

var { Pool } = require('pg');

var createError = require('../utils/error').createError; 
var stall = require('../utils/stall').stall;

var thePool = null;
var theConfig = null;


const errors = {//an object which defines all errors which are supported
  PARAMETER_ERROR:-1,
  DATABASE_ERROR:-2,
  INTERNAL_ERROR:-3
}

var initialise = function (url, needsSSL) { //initialises the database connection
    if (needsSSL == true) {
      url += "?sslmode=require"
    }
  
    if (thePool) { //a pool of cliemts
      thePool.end();
    };
  
    theConfig = null;
  
    theConfig = {
      connectionString: url,
      ssl: needsSSL
    };
  
    thePool = new Pool(theConfig);
};

  var types = require('pg').types;

    // see https://github.com/brianc/node-pg-types#pg-types
    // pg is returning our bigint date type as a string instead of a number.
    types.setTypeParser(20, function(val) {
        return parseInt(val);
    });


  var test = async function(arg){

    await stall(500, createError(errors.PARAMETER_ERROR,"bad parameter!"));
    
  }


var getTutors = async function(tutorID){
  var result = null;

var query = "SELECT * FROM \"public\".\"Tutor\"";

var parameters = [];
  try{
      var response = await thePool.query(query,parameters);
      result=response.rows;
  }catch(e){
      console.log(e);
      throw(createError(errors.DATABASE_ERROR,e.message));
  }
  return result;
}

var getTutor = async function(TutorID)
{
    var result=null;
    
var query = "SELECT * FROM \"public\".\"Tutor\" WHERE \"Tutor\".\"id\"=$1;";

var parameters = [TutorID];
   try{
      var response = await thePool.query(query,parameters);
        result=response.rows;
    }catch(e){
        console.log(e);
        throw(createError(errors.PARAMETER_ERROR,e.message));
    }

    return result;
}
//-------------------------------TUTOR---------------------------------------
var postTutor = async function(name){
  var result = [];
  
  var parameters=[name];

  var query = "INSERT INTO \"public\".\"Tutor\" (\"name\") VALUES($1) RETURNING \"id\",\"name\";";
  try{
    var response = await thePool.query(query,parameters);
    result=response.rows;
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }

  return result;
}

var putTutor = async function(TutorID,name){
  var result=null;
  var parameters=[TutorID,name];
  var query = 'UPDATE \"public\".\"Tutor\" SET \"name\" = $2::text WHERE \"id\"=$1::text RETURNING \"id\",\"name\";';
  try{
    var response=await thePool.query(query,parameters);
    result = response.rows;
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }
  if(!result){
    throw(createError(errors.PARAMETER_ERROR,"No result! Perhaps the id was incorrect."));
  }
  return result;
}

var deleteTutor = async function(TutorID){
  var result=null;
  var parameters=[TutorID];
  var query='DELETE FROM \"public\".\"Tutor\" WHERE \"id\" = $1 ;';
  try{
    var response = await thePool.query(query,parameters);
    result = response.rowCount;
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }
  return result;
}

//-------------------------CATEGORY-----------------------------------
var getCategories=async function(){
  var result=null;
  var query='SELECT * FROM \"public\".\"ProjectCategories\";';
  var parameters=[];
  try{
    var response=await thePool.query(query,parameters);
    result=response.rows;
  }catch(e){
    console.log(e);
    throw(createError(errors.DATABASE_ERROR,e.message));
  }
  return result;
}

var getCategory=async function(categoryID){
  var result=null;
  var query='SELECT * FROM \"public\".\"ProjectCategories\" WHERE \"ProjectCategories\".\"id\"=$1;';
  var parameters=[categoryID];
  try{
    var response=await thePool.query(query,parameters);
    result=response.rows;
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }
  return result;
}

var postCategory=async function(name){
  var result=[];
  var parameters=[name];
  var query='INSERT INTO \"public\".\"ProjectCategories\" (\"name\") VALUES($1) RETURNING \"id\",\"name\";';
  try{
    var response=await thePool.query(query,parameters);
    result=response.rows;
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }
  return result;
}

var deleteCategory=async function(categoryID){
  var result=null;
  var parameters=[categoryID];
  var query='DELETE FROM \"public\".\"ProjectCategories\" WHERE \"id\" = $1 ;';
  try{
    var response=await thePool.query(query,parameters);
    result=response.rowCount;
  }catch(e){
    throw(createError(errors.PARAMETER_ERROR,e.message));
  }
  return result;
}

module.exports = {
    errors:errors,
    initialise: initialise,
    getTutors:getTutors,
    getTutor:getTutor,
    postTutor:postTutor,
    putTutor:putTutor,
    deleteTutor:deleteTutor,
    getCategories:getCategories,
    getCategory:getCategory,
    postCategory:postCategory,
    deleteCategory:deleteCategory
};