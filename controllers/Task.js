'use strict';

var utils = require('../utils/writer.js');
var Task = require('../service/TaskService');

module.exports.postTask = function postTask (req, res, next) {
  Task.postTask(req.swagger.params,res,next);
};

module.exports.deleteTask = function deleteTask (req, res, next) {
  Task.deleteTask(req.swagger.params,res,next);
};

module.exports.putTask = function putTask (req, res, next) {
  Task.putTask(req.swagger.params,res,next);
};

module.exports.getTask = function getTask (req, res, next) {
  Task.getTask(req.swagger.params,res,next);
};

module.exports.getTasks = function getTasks (req, res, next) {
  Task.getTasks(req.swagger.params,res,next);
};
