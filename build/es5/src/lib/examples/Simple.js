'use strict';

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Options for router
var options = {
  consolePrint: true, // Default: false
  port: 8080, // Default: 8080
  jsonParse: true, // Default: true
  allowForms: true, // Default: true
  basePath: '/v1'
};
// Init router
/* eslint-disable class-methods-use-this */
/* Import library */
var Router = new _index2.default.Router(options);
// Set routes
/* Syntax: Router.addRouter({path})
  .{method}({callback}, {requiereParams}, {filter})
*/
Router.addRoute('/api/:id').get(function (params) {
  return params;
}, ['i']).post(function (params) {
  return params;
}, ['i'], { authRequired: true });
/* Other methods
  .patch(callback)
  .delete(callback)
  .options(callback) */