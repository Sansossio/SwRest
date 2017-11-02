'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressFormData = require('express-form-data');

var _expressFormData2 = _interopRequireDefault(_expressFormData);

var _detectPort = require('detect-port');

var _detectPort2 = _interopRequireDefault(_detectPort);

var _MiddleWare = require('./lib/MiddleWare');

var _MiddleWare2 = _interopRequireDefault(_MiddleWare);

var _Listen = require('./lib/Listen');

var _Listen2 = _interopRequireDefault(_Listen);

var _Utils = require('./lib/Utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Router = function () {
  function Router() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Router);

    // Express
    this.server = (0, _express2.default)();
    // Global options defaults
    this.port = 8080;
    this.jsonParse = true;
    this.allowForms = true;
    this.consolePrint = false;
    this.insecureLogin = true;
    this.checkLogin = function () {
      return true;
    };
    this.configureOptions(options);
    // Response global
    this.methods = this.methods.bind(this);
    this.all = this.all.bind(this);
    this.avalaibleMethods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'all'];
    this.response = (0, _Utils.createGlobalResponse)(this.avalaibleMethods, this.methods);
    // Path to use
    this.path = '';
    this.slogan = '[SWRest]';
    // Init
    (0, _Utils.setSlogan)(this.slogan);
    _Listen2.default.jsonParse = this.jsonParse;
    this.initServer();
  }

  _createClass(Router, [{
    key: 'getMethods',
    value: function getMethods() {
      return this.avalaibleMethods;
    }
    /* eslint-disable no-else-return */

  }, {
    key: 'configureOptions',
    value: function configureOptions(options) {
      var _this = this;

      Object.keys(options).forEach(function (key) {
        if (key === 'checkLogin') {
          if (typeof options[key] !== 'function') {
            (0, _Utils.print)('error', 'Login function is a not function');
          } else {
            _this.insecureLogin = false;
          }
        }
        _this[key] = options[key];
      });
    }
  }, {
    key: 'initMiddlewares',
    value: function initMiddlewares() {
      // Set middlewares
      // Custom
      this.server.use(_bodyParser2.default.json());
      // Middles
      var middle = new _MiddleWare2.default({ consolePrint: this.consolePrint }, this.slogan);
      this.server.use(middle.bodyParser);
      this.server.use(middle.run);
      // Catch
      this.server.use(middle.ErrorHandler);
      // Bodyparser
      this.server.use(_bodyParser2.default.urlencoded({ extended: false }));
      // Parse forms
      if (this.allowForms) {
        // Forms
        this.server.use(_expressFormData2.default.parse({}));
        this.server.use(_expressFormData2.default.format());
        this.server.use(_expressFormData2.default.stream());
        this.server.use(_expressFormData2.default.union());
      }
      // Set ip
      this.server.enabled('trust proxy');
    }
  }, {
    key: 'initServer',
    value: function initServer() {
      var _this2 = this;

      this.initMiddlewares();
      // Listen server
      (0, _detectPort2.default)(this.port, function (err, port) {
        if (err) {
          (0, _Utils.print)('error', (0, _Utils.setError)(err));
          return;
        }
        if (port !== _this2.port) (0, _Utils.print)('info', 'Port ' + _this2.port + ' in use, port changed automatic');
        _this2.server.listen(port, function () {
          (0, _Utils.print)('info', 'ShoowitRest listen on port ' + port);
        });
      });
    }
  }, {
    key: 'advanceRoute',
    value: function advanceRoute() {
      for (var i = 0; i < arguments.length; i += 1) {
        var comp = arguments.length <= i ? undefined : arguments[i];
        this.setAdvanceRoute(comp);
      }
    }
  }, {
    key: 'testAdvanceRoute',
    value: function testAdvanceRoute() {
      for (var i = 0; i < arguments.length; i += 1) {
        var comp = arguments.length <= i ? undefined : arguments[i];
        this.setAdvanceRoute(comp, true);
      }
    }
  }, {
    key: 'setAdvanceRoute',
    value: function setAdvanceRoute(component) {
      var _this3 = this;

      var test = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // Verifications
      var parent = (0, _Utils.getParentName)(component);
      var methods = (0, _Utils.getProptypes)(component);
      if (parent !== 'RouterClass' || !component.check()) {
        (0, _Utils.print)('error', 'AdvanceRoute is a not ShoowitRest Component= ');
        return;
      }
      // Basepath
      var name = component.constructor.name || '';
      var basePath = (0, _Utils.getBasePath)(component.basePath, name);
      // Create rule
      methods.forEach(function (key) {
        // Extra params
        var ext = '';
        var method = 'all';
        var parametters = (0, _Utils.getFnParamNames)(component[key], _this3.getMethods());
        parametters.forEach(function (k, c) {
          if (c === 0) {
            method = _this3.getMethods().indexOf(k) > -1 ? k : 'all';
            return;
          }
          var add = k.indexOf('_') > -1 ? k.substring(1) : ':' + k;
          ext += '/' + add;
        });
        // Url of route
        var parseUrl = key.split(/(?=[A-Z])/).join('/');
        parseUrl = parseUrl === 'index' ? '' : parseUrl;
        var url = (basePath + '/' + parseUrl).toLowerCase();
        url += ext;
        url = url.replace('//', '/');
        // Write rule (or test mode)
        if (test) (0, _Utils.print)('info', 'Possible route: ' + url + ' (Method: ' + method + ')');else {
          // Set route in all methods
          (method === 'all' ? _this3.all : _this3.methods)({
            callback: component[key],
            path: url,
            requiereParams: component.getRequiereParams(),
            filter: component.getFilter(),
            method: method
          });
        }
      });
    }
  }, {
    key: 'addRoute',
    value: function addRoute(path) {
      this.path = path;
      return this.response;
    }
  }, {
    key: 'notFound',
    value: function notFound() {
      this.path = '*';
      return this.response;
    }
  }, {
    key: 'all',
    value: function all(_ref) {
      var _this4 = this;

      var callback = _ref.callback,
          _ref$path = _ref.path,
          path = _ref$path === undefined ? null : _ref$path,
          _ref$requiereParams = _ref.requiereParams,
          requiereParams = _ref$requiereParams === undefined ? [] : _ref$requiereParams,
          _ref$filter = _ref.filter,
          filter = _ref$filter === undefined ? {} : _ref$filter;

      this.getMethods().forEach(function (method) {
        if (method === 'all') return;
        _this4.methods({
          method: method,
          callback: callback,
          requiereParams: requiereParams,
          filter: filter,
          path: path
        });
      });
    }
  }, {
    key: 'methods',
    value: function methods(_ref2) {
      var _this5 = this;

      var method = _ref2.method,
          callback = _ref2.callback,
          _ref2$requiereParams = _ref2.requiereParams,
          requiereParams = _ref2$requiereParams === undefined ? [] : _ref2$requiereParams,
          _ref2$filter = _ref2.filter,
          filter = _ref2$filter === undefined ? {} : _ref2$filter,
          _ref2$path = _ref2.path,
          path = _ref2$path === undefined ? null : _ref2$path;

      // Login
      // Secure login
      if (this.insecureLogin && filter.authRequired) {
        (0, _Utils.print)('error', 'Filter \'authRequired\' need a function in constructor \'checklogin\'');
      }
      // Verificamos callback
      if (typeof callback !== 'function') {
        (0, _Utils.print)('error', 'Api methods need callback: ' + (path || this.path) + ' (' + method + ')');
        return this.response;
      }
      // Iniciamos la nueva tura
      this.server[method](path || this.path, function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
          var response;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if ((0, _Utils.avalaibleHeader)(req.headers['content-type'], _this5.allowForms)) {
                    _context.next = 5;
                    break;
                  }

                  response = {};

                  response.error = 'Forms disabled';
                  res.status(500).json(response);
                  return _context.abrupt('return');

                case 5:
                  _context.next = 7;
                  return _Listen2.default.Request(filter.authRequired, req.get('X-Auth-Token'), method, callback, req, res, requiereParams,
                  // Login callback
                  _this5.checkLogin);

                case 7:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this5);
        }));

        return function (_x3, _x4) {
          return _ref3.apply(this, arguments);
        };
      }());
      // Respondemos object
      return this.response;
    }
  }]);

  return Router;
}();

exports.default = Router;