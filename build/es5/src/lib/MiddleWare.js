'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-console */

var _Utils = require('./Utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MiddleWare = function () {
  function MiddleWare() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MiddleWare);

    // Configuration default
    this.consolePrint = false;
    this.configureConfig(config);
    // Bind
    this.run = this.run.bind(this);
    this.ErrorHandler = this.ErrorHandler.bind(this);
    this.bodyParser = this.bodyParser.bind(this);
  }

  _createClass(MiddleWare, [{
    key: 'configureConfig',
    value: function configureConfig(config) {
      var _this = this;

      Object.keys(config).forEach(function (key) {
        _this[key] = config[key];
      });
    }
  }, {
    key: 'ErrorHandler',
    value: function ErrorHandler(error, req, res, next) {
      if (this.consolePrint) {
        (0, _Utils.print)('error', 'Error ' + error.statusCode + ' in: ' + req.originalUrl);
      }
      var err = {
        error: error.type || 'Boundary not set in header. Error code (' + error.statusCode + ')'
      };
      res.status(error.statusCode).json(err);
      next();
    }
  }, {
    key: 'print',
    value: function print(type, message) {
      if (this.consolePrint) {
        (0, _Utils.print)(type, message);
      }
    }
  }, {
    key: 'bodyParser',
    value: function bodyParser(req, res, next) {
      var _this2 = this;

      req.ibody = req.body;
      req.files = req.files || {};
      req.on('data', function (chunk) {
        try {
          req.ibody = JSON.parse(chunk);
          _this2.print('info', '\tContent Type: Json');
        } catch (e) {
          req.ibody = { error: 'Shooowit Api need data in json format' };
          _this2.print('info', '\tContent Type: Forms');
        }
      });
      next();
    }
  }, {
    key: 'run',
    value: function run(req, res, next) {
      // Vals
      var requestTime = Date.now();
      var originalUrl = req.originalUrl,
          ip = req.ip,
          method = req.method;
      // Print console

      this.print('info', 'Resquest ' + method + ' at ' + originalUrl + ' (' + ip + ')');

      req.requestTime = requestTime;
      next();
    }
  }]);

  return MiddleWare;
}();

exports.default = MiddleWare;