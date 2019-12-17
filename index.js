'use strict';

var fs = require('fs'),
  path = require('path'),
  http = require('http');
var cors = require('cors');
var auth = require('./utils/authentication');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var database = require('./utils/database/databaseService');

var dbUrl = process.env.DATABASE_URL;

// URL provided by the Auth0 authentication PaaS
if (!process.env.AUTH_URI) throw new Error("undefined in environment: AUTH_URI");
var authUri = process.env.AUTH_URI;


// RSA Authentication, supplied by Auth0 authentication PaaS.
if (!process.env.RSA_URI) throw new Error("undefined in environment: RSA_URI");
var rsaUri = process.env.RSA_URI;

// builds a configuration for the client app, from environment variables 
// so that the server can be deployed to multiple domains from the same source
var getAuthClientConfig = function () {
  var result = {};

  // Used in Auth0's authentication process to identify the client
  if (!process.env.AUTH_CLIENT_ID) throw new Error("undefined in environment: AUTH_CLIENT_ID");
  if (!process.env.AUTH_APP_NAME) throw new Error("undefined in environment: AUTH_APP_NAME");
  if (!process.env.AUTH_AUDIENCE) throw new Error("undefined in environment: AUTH_AUDIENCE");


  result.clientId = process.env.AUTH_CLIENT_ID;
  result.appName = process.env.AUTH_APP_NAME;
  result.clientSecret = "dummy";
  result.realm = "dummy";
  result.scopeSeparator = " ";
  result.additionalQueryStringParams = {};
  result.additionalQueryStringParams.audience = process.env.AUTH_AUDIENCE;
  result.additionalQueryStringParams.nonce = "123456";

  return result;
}


// client configuration file is written to the folder which gets downloaded to the SPWA in the browser.
var writeAuthClientConfig = function (config) {
  var authenticationClientConfig = config;
  var authenticationClientContent = "var auth_config = " + JSON.stringify(authenticationClientConfig);
  fs.writeFileSync('./swagger_spwa/authproviderconfig.js', authenticationClientContent);
}



// Cross Origin Requests - must have this, as we are an API.
// Without it, browsers running SPWAs from domains different to ours (e.g. github pages)
// will reject HTTP requests during pre-flight check.
app.use(cors());

// configure where the SwaggerUI looks for authentication
writeAuthClientConfig(getAuthClientConfig());



// database connection
database.initialise(dbUrl, true);

// initialise authentication
auth.initialise(rsaUri);

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

var secDefs = swaggerDoc.securityDefinitions;
for (var secDef in secDefs) {
    console.log("changing: " + secDefs[secDef].authorizationUrl + " : to : " + authUri);
    secDefs[secDef].authorizationUrl = authUri;
}


var getSwaggerUIConfig = function(){
  var result = {};

  result.scheme = process.env.API_SCHEME;
  result.domain = process.env.API_DOMAIN;
  result.port = process.env.API_PORT;
  result.existingPort = process.env.PORT; // assigned by Heroku if deployed.
  
  return result;

}

var writeSwaggerUIConfig = function(swaggerDoc, env){

  var doc = {};
  doc.scheme = swaggerDoc.schemes[0];  //WILL THROW IF SCHEMES NOT DEFINED IN DOC
  doc.domain = swaggerDoc.host.split(':')[0];  //WILL THROW IF HOST NOT DEFINED IN DOC 
  doc.port = swaggerDoc.host.split(':')[1];  //WILL THROW IF PORT NOT DEFINED IN DOC  
  
  if (env.existingPort){
    console.log("remote deployment has already defined port");
    if(env.port){
      
      doc.port = env.port; // override (useful for consistency, or if the remote service is not heroku, and listening on a different port.)
      console.log("external facing port env variable is set. Updating swagger.yaml with this value: %s", doc.port);
    }else{
      doc.port = 443; // override the setting with Heroku's default external facing port
      console.log("external facing port env variable is unset. Updating swagger.yaml with default value: %s", doc.port);
    }
  }else{
    console.log("local deployment.");
    if(env.port){
        doc.port = env.port; //override (useful if you have lots of servers running on local host)
        console.log("overriding swagger.yaml port to env variable: %s", doc.port);
    }else{
        env.port = doc.port;
        console.log("env varable not defined for port. Setting to default from swagger.yaml: %s ", env.port );
    }
  }
  if(env.domain){
    doc.domain = env.domain; //override (useful if you want to deploy to a different server than specified in the yaml)
    console.log("overriding swagger.yaml domain to env variable: %s", doc.domain);
  }
  if(env.scheme){
    doc.scheme = env.scheme; // override (useful if you want to deploy to a different comms scheme than that defined in the yaml.
    console.log("overriding swagger.yaml scheme to env variable: %s", doc.scheme);
  }
  
  var hostAddrPort = doc.domain + ":" + doc.port;
  var schemes = [doc.scheme];

  swaggerDoc.host = hostAddrPort;
  swaggerDoc.schemes = schemes;
  
  return swaggerDoc;
}

var swaggerUIConfig = getSwaggerUIConfig();
swaggerDoc = writeSwaggerUIConfig(swaggerDoc, swaggerUIConfig);
var serverPort = swaggerUIConfig.existingPort || swaggerUIConfig.port;


// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Provide the security handlers
  app.use(middleware.swaggerSecurity({
    projectmt_admin_auth: auth.authorisation_handler
  }));

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi(
    { swaggerUiDir: path.join(__dirname, './swagger_spwa') }
  ));

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server available at: %s://%s', swaggerDoc.schemes[0], swaggerDoc.host);
    console.log('The internal port assigned to your server  is: %d', serverPort );
    console.log('Your swaggerUI is available at: %s://%s/docs' , swaggerDoc.schemes[0], swaggerDoc.host);
  
  });

});