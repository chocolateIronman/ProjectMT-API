'use strict';

var libjwt = require('jsonwebtoken');
var libjwks = require('jwks-rsa');
var authParser = require('auth-header');
var error = require('./error');

const supported_algorithms = {
    rsa: "RS256"
};

const supportedScopes = {
    admin: "admin" // can alter and delete existing data
}


const NOT_FOUND = -1;

var jwks_client = null;


var initialise = function (rsa_uri) {

    jwks_client = libjwks({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5, // Default value
        jwksUri: rsa_uri
    });


};


var get_access_token = function (req) {
    var authHeader = req.headers.authorization;
    var auth = authParser.parse(authHeader);
    var token = null;
    if (auth.scheme == "Bearer") {
        token = auth.token;
    }
    return token;
}



// attempt to verify the RSA signature of the access token, and then decode it.
var validate_RSA_access_token = function (token, kid, callback) {
    jwks_client.getSigningKey(kid, (err, key) => {
        if (!err) {
            const signingKey = key.publicKey || key.rsaPublicKey;
            libjwt.verify(
                token,
                signingKey,
                function (err, decoded) {
                    callback(err, decoded);
                }
            );
        } else {
            callback(err, null);
        }
    });
}



var hasAuthorisedScope = function (scopeString, authorisedScopes) {
    var result = true;
    if (scopeString && scopeString.length > 0) {
        result = false;
        var scopes = Object.keys(authorisedScopes);
 
        for (var index = 0; index < scopes.length; index++) {
            var scope = scopes[index];
            if (scopeString.indexOf(scope) != NOT_FOUND) {
                result = true;
                break;
            }
        }
    }
    return result;
}




var authorisation_handler = function (req, def, scopes, callback) {

    var err = null;

    // get the access token from the incoming request
    var access_token = get_access_token(req);

    if (access_token) {
        // the access token is JWT - Base64 encoded, with signature
        var decoded_token = libjwt.decode(access_token, { complete: true });
        
        if (decoded_token) {
            if (decoded_token.header.alg == supported_algorithms.rsa) {
                // the authorizing authority has defined the API as requiring RSA security

                // get the key id to pass to the RSA endpoint during validation
                var kid = decoded_token.header.kid;

                validate_RSA_access_token(
                    access_token,
                    kid,
                    function (err, valid_token) {
                        if (!err) {
                            if (hasAuthorisedScope(valid_token.scope, supportedScopes)) {
                                callback(null, valid_token);
                            } else {
                                callback(error.create401Error("admin scope is required for this service."));
                            }
                        } else {
                            callback(error.create401Error(err.message));
                        }
                    });

            } else {
                callback(error.create401Error("unsupported JWT algorithm"));
            }

           

        } else {
            callback(error.create401Error("could not decode token"));
        }
    } else {
        callback(error.create401Error("token not found"));
    }
}

var getHeaderInfo = function(req){
    var tutorid=null;
    var access_token=get_access_token(req);
    if(access_token){
        var decoded_token=libjwt.decode(access_token, {complete : true});
        if(decoded_token){
            tutorid=decoded_token.payload.sub;
        }
    }
    return tutorid;
}


module.exports = {
    SUPPORTED_SCOPES: supportedScopes,
    initialise: initialise,
    authorisation_handler: authorisation_handler,
    getHeaderInfo:getHeaderInfo
};