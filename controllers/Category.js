'use strict';

var utils = require('../utils/writer.js');
var Category = require('../service/CategoryService');

module.exports.createCategory = function createCategory (req, res, next) {
  Category.createCategory()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteCategory = function deleteCategory (req, res, next) {
  var categoryID = req.swagger.params['categoryID'].value;
  Category.deleteCategory(categoryID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCategories = function getCategories (req, res, next) {
  Category.getCategories()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCategory = function getCategory (req, res, next) {
  var categoryID = req.swagger.params['categoryID'].value;
  Category.getCategory(categoryID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
