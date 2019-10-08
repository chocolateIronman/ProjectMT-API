'use strict';

var utils = require('../utils/writer.js');
var Tutor = require('../service/TutorService');

module.exports.postTutor = function addTutor (req, res, next) {
  var body = req.swagger.params['body'].value;

  var name=body.name;

  Tutor.postTutor(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode,response));
    });
};

module.exports.deleteTutor = function deleteTutor (req, res, next) {
  var tutorID = req.swagger.params['TutorID'].value;
  Tutor.deleteTutor(tutorID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode,response));
    });
};

module.exports.putTutor = function putTutor (req, res, next) {
  var tutorID = req.swagger.params['TutorID'].value;
  var body=req.swagger.params['body'].value;
  var name=body.name||null;

  Tutor.putTutor(tutorID,name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, rutils.respondWithCode(response.statusCode,response));
    });
};

module.exports.getTutor = function getTutor (req, res, next) {

  var tutorID = req.swagger.params['TutorID'].value;

  var response = Tutor.getTutor(tutorID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTutors = function getTutors (req, res, next) {

  var tutorID=req.swagger.params['tutorID'].value || null;

  var response = Tutor.getTutors(tutorID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
