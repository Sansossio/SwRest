/* eslint-disable class-methods-use-this */
/* Import library */
import SwRest from '../index';

// Options for router
const options = {
  consolePrint: true, // Default: false
  port: 8080, // Default: 8080
  jsonParse: true, // Default: true
  allowForms: true, // Default: true
  basePath: '/v1',
};
// Init router
const Router = new SwRest.Router(options);

// Set routes
/* Syntax: Router.addRouter({path})
  .{method}({callback}, {requiereParas}, {filter})
*/
Router.addRoute('/api/:id')
  .get(params => params)
  .post(params => params);
/* Other methods
  .patch(callback)
  .delete(callback)
  .options(callback) */
