'use strict';

var utils = require('../utils/writer.js');
var Project = require('../service/ProjectService');

module.exports.createProject = function createProject (req, res, next) {
  Project.createProject()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteProject = function deleteProject (req, res, next) {
  var projectID = req.swagger.params['ProjectID'].value;
  Project.deleteProject(projectID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editProject = function editProject (req, res, next) {
  var projectID = req.swagger.params['ProjectID'].value;
  Project.editProject(projectID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProject = function getProject (req, res, next) {
  var projectID = req.swagger.params['ProjectID'].value;
  Project.getProject(projectID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProjects = function getProjects (req, res, next) {
  Project.getProjects()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
