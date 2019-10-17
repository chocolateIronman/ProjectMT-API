'use strict';

var utils = require('../utils/writer.js');
var Category = require('../service/CategoryService');

module.exports.postCategory = function postCategory (req, res, next) {
  Category.postCategory(req.swagger.params,res,next);
};

module.exports.deleteCategory = function deleteCategory (req, res, next) {
  Category.deleteCategory(req.swagger.params,res,next);
};

module.exports.getCategories = function getCategories (req, res, next) {

  Category.getCategories(req.swagger.params,res,next);
};

module.exports.getCategory = function getCategory (req, res, next) {
  Category.getCategory(req.swagger.params,res,next);
};
