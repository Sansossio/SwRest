/* eslint-disable no-console */

import { print } from './Utils';

class MiddleWare {
  constructor(config = {}) {
    // Configuration default
    this.consolePrint = false;
    this.configureConfig(config);
    // Bind
    this.run = this.run.bind(this);
    this.ErrorHandler = this.ErrorHandler.bind(this);
    this.bodyParser = this.bodyParser.bind(this);
  }
  configureConfig(config) {
    Object.keys(config).forEach(key => {
      this[key] = config[key];
    });
  }
  ErrorHandler(error, req, res, next) {
    if (this.consolePrint) {
      print('error', `Error ${error.statusCode} in: ${req.originalUrl}`);
    }
    const err = {
      error: error.type || `Boundary not set in header. Error code (${error.statusCode})`
    };
    res.status(error.statusCode).json(err);
    next();
  }
  print(type, message) {
    if (this.consolePrint) {
      print(type, message);
    }
  }
  bodyParser(req, res, next) {
    req.ibody = req.body;
    req.files = req.files || {};
    req.on('data', chunk => {
      try {
        req.ibody = JSON.parse(chunk);
        this.print('info', '\tContent Type: Json');
      } catch (e) {
        req.ibody = { error: 'Shooowit Api need data in json format' };
        this.print('info', '\tContent Type: Forms');
      }
    });
    next();
  }
  run(req, res, next) {
    // Vals
    const requestTime = Date.now();
    const {
      originalUrl,
      ip,
      method
    } = req;
    // Print console
    this.print('info', `Resquest ${method} at ${originalUrl} (${ip})`);

    req.requestTime = requestTime;
    next();
  }
}

export default MiddleWare;