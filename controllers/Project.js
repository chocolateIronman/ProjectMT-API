'use strict';

var utils = require('../utils/writer.js');
var Project = require('../service/ProjectService');

module.exports.postProject = function (req, res, next) {
  var body=req.swagger.params['body'].value;
  var TutorID=body.TutorID;
  var ProjectName=body.ProjectName;
  var ProjectCategory=body.ProjectCategory;
  var ProjectYear=body.ProjectYear;
  var StartDate=body.StartDate;
  var EndDate=body.EndDate;
  var GroupName=body.GroupName;
  var Notes=body.Notes;

  Project.postProject(TutorID,ProjectName,ProjectCategory,ProjectYear,StartDate,EndDate,GroupName,Notes)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode,response));
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
  var response = Project.getProject(projectID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProjects = function getProjects (req, res, next) {
  Project.getProjects(req.swagger.params, res, next);
};
