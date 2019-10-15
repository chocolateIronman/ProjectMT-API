'use strict';

var utils = require('../utils/writer.js');
var Tutor = require('../service/TutorService');

module.exports.postTutor = function postTutor (req, res, next) {
  Tutor.postTutor(req.swagger.params,res,next);
};

module.exports.deleteTutor = function deleteTutor (req, res, next) {
  Tutor.deleteTutor(req.swagger.params,res,next);
};

module.exports.putTutor = function putTutor (req, res, next) {
  Tutor.putTutor(req.swagger.params,res,next);
};

module.exports.getTutor = function getTutor (req, res, next) {

  Tutor.getTutor(req.swagger.params,res,next);
};

module.exports.getTutors = function getTutors (req, res, next) {

  Tutor.getTutors(req.swagger.params,res,next);
};
