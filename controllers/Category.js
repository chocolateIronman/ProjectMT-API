'use strict';

var utils = require('../utils/writer.js');
var Category = require('../service/CategoryService');

module.exports.postCategory = function createCategory (req, res, next) {
  var body=req.swagger.params['body'].value;
  var name=body.name;
  Category.postCategory(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode,response));
    });
};

module.exports.deleteCategory = function deleteCategory (req, res, next) {
  var categoryID = req.swagger.params['categoryID'].value;
  Category.deleteCategory(categoryID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.statusCode,response));
    });
};

module.exports.getCategories = function getCategories (req, res, next) {

  var response=Category.getCategories()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCategory = function getCategory (req, res, next) {
  var categoryID = req.swagger.params['categoryID'].value;
  var response=Category.getCategory(categoryID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
