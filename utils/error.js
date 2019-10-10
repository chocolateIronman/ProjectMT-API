'use strict'

module.exports = {

    createError: (code, message) => {
        var result = {};
        result.statusCode = code;
        result.message = message;
        return result;  
    },

    create500Error: (message) => {
        var result = {};
        result.statusCode = 500;
        result.message = message;
        return result;
    },
    create400Error:(message) => {
        var result ={};
        result.statusCode = 400;
        result.message = "Bad Request: " + message;
        return result;
    },

    createNotYetImplemented: (message) => {
        var result = {};
        result.statusCode = 500;
        result.message = "Not yet implemented: " + message;
        return result;
    },

    stringifyError: (error) => {
        var plainObject = {};
        Object.getOwnPropertyNames(error).forEach(function (key) {
            plainObject[key] = error[key];
        });
        return JSON.stringify(plainObject, null, "\t");
    }

}