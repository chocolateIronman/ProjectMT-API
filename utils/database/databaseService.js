"use strict";

var {Pool} = require("pg");
var errorApi = require("../error");

var thePool = null;
var theConfig = null;

module.exports.initialise = function initialise(url, needsSSL) {
    if (needsSSL === true) {
        url += "?sslmode=require";
    }

    if (thePool) {
        thePool.end();
    }

    theConfig = null;

    theConfig = {
        connectionString: url,
        ssl: needsSSL
    };

    console.log("DB : " + url);
    thePool = new Pool(theConfig);
};

module.exports.multiQuery = async function multiQuery(queries) {
    var results = [];
    const client = await thePool.connect();
    try {
        await client.query("BEGIN");
        for (var index = 0; index < queries.length; index++) {
            var query = queries[index];
            var text = query.text;
            var values = query.values;
            results.push( await client.query(text, values));
        }
        await client.query("COMMIT");
    } catch (err) {
        await client.query("ROLLBACK");
        console.log(err);
        throw errorApi.create500Error("SQL Error");
    } finally {
        client.release();
    }
    return results;
};