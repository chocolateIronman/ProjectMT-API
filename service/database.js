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
  
//   var stem='select * from Tutors where';
//   var tutorID_comp='(&=$1::text is null or TutorID)';

//   var query=
//     stem+
//     tutorID_comp+ ";";

var query = "SELECT * FROM \"public\".\"Tutor\"";

//   var parameters = [tutorID];
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


  module.exports = {
    errors:errors,
    initialise: initialise,
    getTutors:getTutors
  };