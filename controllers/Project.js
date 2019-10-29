'use strict';

var utils = require('../utils/writer.js');
var Project = require('../service/ProjectService');

module.exports.postProject = function (req, res, next) {
  Project.postProject(req.swagger.params,res,next);
};

module.exports.deleteProject = function deleteProject (req, res, next) {
  Project.deleteProject(req.swagger.params,res,next);
};

module.exports.putProject = function putProject (req, res, next) {
  Project.putProject(req.swagger.params,res,next);
};

module.exports.getProject = function getProject (req, res, next) {
  Project.getProject(req.swagger.params,res,next);
};

module.exports.getProjects = function getProjects (req, res, next) {
  Project.getProjects(req.swagger.params, res, next);
};
