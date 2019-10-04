'use strict';

var utils = require('../utils/writer.js');
var Tutor = require('../service/TutorService');

module.exports.addTutor = function addTutor (req, res, next) {
  var body = req.swagger.params['body'].value;
  Tutor.addTutor(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteTutor = function deleteTutor (req, res, next) {
  var tutorID = req.swagger.params['TutorID'].value;
  Tutor.deleteTutor(tutorID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editTutor = function editTutor (req, res, next) {
  var tutorID = req.swagger.params['TutorID'].value;
  Tutor.editTutor(tutorID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTutor = function getTutor (req, res, next) {
  var tutorID = req.swagger.params['TutorID'].value;
  Tutor.getTutor(tutorID)
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
