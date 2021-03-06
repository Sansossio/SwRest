import express from 'express';
import bodyParser from 'body-parser';
import formData from 'express-form-data';
import detect from 'detect-port';

import MiddleWare from './lib/MiddleWare';
import Listen from './lib/Listen';

import {
  print,
  setError,
  setSlogan,
  createGlobalResponse,
  getProptypes,
  getParentName,
  getBasePath,
  getFnParamNames,
  avalaibleHeader,
} from './lib/Utils';

class Router {
  constructor(options = {}) {
    // Express
    this.server = express();
    // Global options defaults
    this.port = 8080;
    this.jsonParse = true;
    this.allowForms = true;
    this.consolePrint = false;
    this.insecureLogin = true;
    this.checkLogin = () => true;
    this.configureOptions(options);
    // Response global
    this.methods = this.methods.bind(this);
    this.all = this.all.bind(this);
    this.avalaibleMethods = [
      'get',
      'post',
      'put',
      'patch',
      'delete',
      'options',
      'all',
    ];
    this.response = createGlobalResponse(
      this.avalaibleMethods,
      this.methods,
    );
    // Path to use
    this.path = '';
    this.slogan = '[SWRest]';
    // Init
    setSlogan(this.slogan);
    Listen.jsonParse = this.jsonParse;
    this.initServer();
  }
  getMethods() {
    return this.avalaibleMethods;
  }
  /* eslint-disable no-else-return */
  configureOptions(options) {
    Object.keys(options).forEach((key) => {
      if (key === 'checkLogin') {
        if (typeof options[key] !== 'function') {
          print('error', 'Login function is a not function');
        } else {
          this.insecureLogin = false;
        }
      }
      this[key] = options[key];
    });
  }
  initMiddlewares() {
    // Set middlewares
    // Custom
    this.server.use(bodyParser.json());
    // Middles
    const middle = new MiddleWare({ consolePrint: this.consolePrint }, this.slogan);
    this.server.use(middle.bodyParser);
    this.server.use(middle.run);
    // Catch
    this.server.use(middle.ErrorHandler);
    // Bodyparser
    this.server.use(bodyParser.urlencoded({ extended: false }));
    // Parse forms
    if (this.allowForms) {
      // Forms
      this.server.use(formData.parse({}));
      this.server.use(formData.format());
      this.server.use(formData.stream());
      this.server.use(formData.union());
    }
    // Set ip
    this.server.enabled('trust proxy');
  }
  initServer() {
    this.initMiddlewares();
    // Listen server
    detect(this.port, (err, port) => {
      if (err) {
        print('error', setError(err));
        return;
      }
      if (port !== this.port) print('info', `Port ${this.port} in use, port changed automatic`);
      this.server.listen(port, () => {
        print('info', `ShoowitRest listen on port ${port}`);
      });
    });
  }
  advanceRoute(...args) {
    for (let i = 0; i < args.length; i += 1) {
      const comp = args[i];
      this.setAdvanceRoute(comp);
    }
  }
  testAdvanceRoute(...args) {
    for (let i = 0; i < args.length; i += 1) {
      const comp = args[i];
      this.setAdvanceRoute(comp, true);
    }
  }
  setAdvanceRoute(component, test = false) {
    // Verifications
    const parent = getParentName(component);
    const methods = getProptypes(component);
    if (parent !== 'RouterClass' || !component.check()) {
      print('error', 'AdvanceRoute is a not ShoowitRest Component= ');
      return;
    }
    // Basepath
    const name = component.constructor.name || '';
    const basePath = getBasePath(component.basePath, name);
    // Create rule
    methods.forEach((key) => {
      // Extra params
      let ext = '';
      let method = 'all';
      const parametters = getFnParamNames(component[key], this.getMethods());
      parametters.forEach((k, c) => {
        if (c === 0) {
          method = this.getMethods().indexOf(k) > -1 ? k : 'all';
          return;
        }
        const add = k.indexOf('_') > -1 ? k.substring(1) : `:${k}`;
        ext += `/${add}`;
      });
      // Url of route
      let parseUrl = key.split(/(?=[A-Z])/).join('/');
      parseUrl = parseUrl === 'index' ? '' : parseUrl;
      let url = `${basePath}/${parseUrl}`.toLowerCase();
      url += ext;
      url = url.replace('//', '/');
      // Write rule (or test mode)
      if (test) print('info', `Possible route: ${url} (Method: ${method})`);
      else {
        // Set route in all methods
        (method === 'all' ? this.all : this.methods)({
          callback: component[key],
          path: url,
          requiereParams: component.getRequiereParams(),
          filter: component.getFilter(),
          method,
        }
        );
      }
    });
  }
  addRoute(path) {
    this.path = path;
    return this.response;
  }
  notFound() {
    this.path = '*';
    return this.response;
  }
  all({ callback, path = null, requiereParams = [], filter = {} }) {
    this.getMethods().forEach((method) => {
      if (method === 'all') return;
      this.methods({
        method,
        callback,
        requiereParams,
        filter,
        path,
      });
    });
  }
  methods({
    method,
    callback,
    requiereParams = [],
    filter = {},
    path = null,
  }) {
    // Login
    // Secure login
    if (this.insecureLogin && filter.authRequired) {
      print('error', `Filter 'authRequired' need a function in constructor 'checklogin'`);
    }
    // Verificamos callback
    if (typeof callback !== 'function') {
      print('error', `Api methods need callback: ${path || this.path} (${method})`);
      return this.response;
    }
    // Iniciamos la nueva tura
    this.server[method](
      path || this.path,
      async (req, res) => {
        // Verificamos header
        if (!avalaibleHeader(req.headers['content-type'], this.allowForms)) {
          const response = {};
          response.error = 'Forms disabled';
          res.status(500).json(response);
          return;
        }
        // Realizamos la accion
        await Listen.Request(
          filter.authRequired,
          req.get('X-Auth-Token'),
          method,
          callback,
          req,
          res,
          requiereParams,
          // Login callback
          this.checkLogin,
        );
      },
    );
    // Respondemos object
    return this.response;
  }
}

export default Router;
