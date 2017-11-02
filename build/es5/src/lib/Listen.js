'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('./Utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listen = function () {
  function Listen() {
    _classCallCheck(this, Listen);

    Listen.jsonParse = true;
  }

  _createClass(Listen, null, [{
    key: 'jsonParse',
    value: function jsonParse(val) {
      Listen.jsonParse = val;
    }
  }, {
    key: 'generateResponse',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callback, res, params, method) {
        var paramsUrl, paramsFixed, response, status, send;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof callback !== 'function')) {
                  _context.next = 3;
                  break;
                }

                res.status(500).json((0, _Utils.setError)('Invalid Callback'));
                return _context.abrupt('return');

              case 3:
                // Creamos el response
                paramsUrl = params.query || {};
                paramsFixed = params;

                delete paramsFixed.query;
                _context.next = 8;
                return callback.apply(undefined, [paramsFixed, method].concat(_toConsumableArray(Object.values(paramsUrl))));

              case 8:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 11;
                  break;
                }

                _context.t0 = (0, _Utils.setError)('Callback need a return');

              case 11:
                response = _context.t0;

                // Enviamos
                status = response.status || 200;
                send = Object.assign(response, (0, _Utils.errorResponse)(paramsFixed));
                // Eliminamos lo innecesario

                delete response.status;
                // Respondemos
                if (Listen.jsonParse) res.status(status).json(send);else res.send(send);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function generateResponse(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return generateResponse;
    }()
  }, {
    key: 'Params',
    value: function Params(method, req) {
      // Obtenemos los parametros obtenidos
      var query = req.query,
          files = req.files;

      var params = (0, _Utils.getParams)(method, req);
      var response = Object.assign(Object.keys(query).length > 0 ? { url: query } : {}, req.params, params, Object.keys(files).length > 0 ? { files: files } : {});
      return response;
    }
  }, {
    key: 'Request',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(authLogin, tokenHeader, method, callback, req, res) {
        var requiereParams = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
        var login = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : function () {
          return false;
        };
        var params, validate, missingargs, auth;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = Listen.Params(method, req);
                // Validamos

                validate = (0, _Utils.validateParams)(params, requiereParams, authLogin && !tokenHeader);

                if (!(validate.length > 0)) {
                  _context2.next = 6;
                  break;
                }

                missingargs = Object.assign({ 'Missing Arguments': validate }, (0, _Utils.errorResponse)(params));

                res.status(404).json(missingargs);
                return _context2.abrupt('return');

              case 6:
                if (!authLogin) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 9;
                return login(tokenHeader || params.token || params.url.token);

              case 9:
                auth = _context2.sent;

                if (auth) {
                  _context2.next = 13;
                  break;
                }

                res.status(500).json((0, _Utils.setError)('Login fail'));
                return _context2.abrupt('return');

              case 13:
                params.user = auth;
                if (params.token || params.url && params.url.token) params.warning = 'Token must be sent by header (X-Auth-Token)';

              case 15:
                // Devolvemos
                Listen.generateResponse(callback, res, params, method);

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function Request(_x7, _x8, _x9, _x10, _x11, _x12) {
        return _ref2.apply(this, arguments);
      }

      return Request;
    }()
  }]);

  return Listen;
}();

exports.default = Listen;