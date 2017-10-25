/* eslint-disable class-methods-use-this */
/* Import library */
import SwRest from '../index';

// Options for router
const options = {
  consolePrint: true, // Default: false
  port: 8080, // Default: 8080
  jsonParse: true, // Default: true
  allowForms: true, // Default: true
};
// Advance router with es6
class Example extends SwRest.ShooowitRoute {
  constructor(params) {
    super(params);
    this.basePath = '/'; // Default: Class name
  }
  // Root method
  // Route url: /
  index(params, method) {
    const response = params;
    response.method = method;
    response.status = 200; // Default: 200
    return response;
  }
  // Custom method
  // Route url: /api/:id
  api(params, method, id) {
    const response = params;
    response.method = method;
    response.id = id;
    response.status = 200; // Default: 200
    return params;
  }
}
const example = new Example();
// Init router
const Router = new SwRest.Router(options);

// Set routes
Router.advanceRoute(example);
// Print generate routes
Router.testAdvanceRoute(example);
