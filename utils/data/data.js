/**
 * Thanks to the Open-Source community for providing this project structure.
**/
"use strict";

var Sql = require("../SQL/sql");
var errorApi = require("../error");

var doGetProjectsForTutor = async (tutor_id) => {
    var result = null;
    result = await Sql.getProjectsForTutor(tutor_id);
    return result;
}
var getProjectsForTutor = async (tutor_id) => {
    var result = null;

    // TODO: Authentication check. Throw error if not authorized.

    if (tutor_id === null) throw errorApi.create400Error("Parameter 'tutor_id' is null.");

    try {
        result = await doGetProjectsForTutor(tutor_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
};
//-------------------TUTOR---------------------
var doGetTutors=async ()=>{
    var result=null;
    result=await Sql.getTutors();
    return result;
}
var getTutors=async () =>{
    var result=null;
    //TODO: Authentication check. Throw error if not authorized.
    try{
        result=await doGetTutors();
    }catch(error){
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

var doGetTutor = async (tutor_id) =>{ 
    var result=null;
    result=await Sql.getTutor(tutor_id);
    return result;
}
var getTutor=async (tutor_id) => {
    var result=null;

    // TODO: Authentication check. Throw error if not authorized.

    if(tutor_id===null)throw errorApi.create400Error("Parameter 'tutor_id' is null.");
    
    try{
        result = await doGetTutor(tutor_id);
    }catch(error){
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

var doPostTutor = async(name) => {
    var result=[];
    result=await Sql.postTutor(name);
    return result;
}
var postTutor = async (name) => {
    var result=[];
    if(name===null) throw errorApi.create400Error("Parameter 'name' is null.");

    try {
        result=await doPostTutor(name);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

var doPutTutor = async(tutor_id,name)=>{
    var result=null;
    result=await Sql.putTutor(tutor_id,name);
    return result;
}
var putTutor = async (tutor_id,name) => {
    var result=null;
    if(tutor_id===null) throw errorApi.create400Error("Parameter 'tutor_id' is null.");
    if(name===null) throw errorApi.create400Error("Parameter 'name' is null.");

    try{
        result=await doPutTutor(tutor_id,name);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

var doDeleteTutor = async (tutor_id) => {
    var result = null;
    result = await Sql.deleteTutor(tutor_id);
    return result;
}
var deleteTutor = async (tutor_id) => {
    var result = null;

    if(tutor_id===null) throw errorApi.create400Error("Parameter 'tutor_id' is null.");

    try{
        result = await doDeleteTutor(tutor_id);
    } catch(error){
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

//--------------CATEGORY---------------------
var doGetCategories=async () =>{
    var result=null;
    result=await Sql.getCategories();
    return result;
}
var getCategories=async()=>{
    var result=null;
    //TODO: Authentication check. Throw error ig not authorized.
    try{
        result = await doGetCategories();
    }catch(error){
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

var doGetCategory = async (category_id) =>{
    var result=null;
    result=await Sql.getCategory(category_id);
    return result;
}
var getCategory=async(category_id)=>{
    var result = null;

    if(category_id===null)throw errorApi.create400Error("Parameter 'category_id' is null.");

    try{
        result=await doGetCategory(category_id);
    }catch(error){
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

var doPostCategory = async(name) => {
    var result=[];
    result = await Sql.postCategory(name);
    return result;
}
var postCategory = async(name) => {
    var result = [];
    if(name===null) throw errorApi.create400Error("Parameter 'name' is null.");

    try{
        result = await doPostCategory(name);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");
    }

    return result;
}

var doDeleteCategory = async (category_id) => {
    var result=null;
    result = await Sql.deleteCategory(category_id);
    return result;
}
var deleteCategory = async (category_id) => {
    var result= null;

    if(category_id===null) throw errorApi.create400Error("Parameter 'category_id' is null.");

    try{
        result = await doDeleteCategory(category_id);
    } catch (error) {
        console.log(error.message);
        throw errorApi.create500Error("SQL Error");

    }

    return result;
}

module.exports = {
    getProjectsForTutor: getProjectsForTutor,
    getTutors:getTutors,
    getTutor:getTutor,
    postTutor:postTutor,
    putTutor:putTutor,
    deleteTutor:deleteTutor,
    getCategories:getCategories,
    getCategory:getCategory,
    postCategory:postCategory,
    deleteCategory:deleteCategory
}