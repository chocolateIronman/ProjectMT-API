'use strict';

var utils = require('../utils/writer.js');
var Task = require('../service/TaskService');

module.exports.createTask = function createTask (req, res, next) {
  Task.createTask()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteTask = function deleteTask (req, res, next) {
  var taskID = req.swagger.params['TaskID'].value;
  Task.deleteTask(taskID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editTask = function editTask (req, res, next) {
  var taskID = req.swagger.params['TaskID'].value;
  Task.editTask(taskID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTask = function getTask (req, res, next) {
  var taskID = req.swagger.params['TaskID'].value;
  Task.getTask(taskID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTasks = function getTasks (req, res, next) {
  Task.getTasks()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
