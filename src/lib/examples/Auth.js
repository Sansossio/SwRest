'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// Options for router
// checkLogin async
var checkLogin = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', token === '1234');

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function checkLogin(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */
/* Import library */


// Advance router with es6
var Example = function (_SwRest$RouterClass) {
  _inherits(Example, _SwRest$RouterClass);

  function Example(params) {
    _classCallCheck(this, Example);

    var _this = _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).call(this, params));

    _this.basePath = '/'; // Default: Class name
    return _this;
  }
  // Root method
  // Route url: /


  _createClass(Example, [{
    key: 'index',
    value: function index(params, method) {
      var response = params;
      response.method = method;
      response.status = 200; // Default: 200
      return response;
    }
    // Custom method
    // Route url: /api/:id

  }, {
    key: 'api',
    value: function api(params, method, id) {
      var response = params;
      response.method = method;
      response.id = id;
      response.status = 200; // Default: 200
      return params;
    }
  }]);

  return Example;
}(_index2.default.RouterClass);

var configuration = {
  requiereParams: [], // Parametters requiereds
  filter: { authRequired: true } // Filter: authRequiere (Default: false)
};
var example = new Example(configuration);
var options = {
  consolePrint: true, // Default: false
  port: 8080, // Default: 8080
  jsonParse: true, // Default: true
  allowForms: true, // Default: true
  checkLogin: checkLogin // Function of check login, default: true (insecure login)
};
// Init router
var Router = new _index2.default.Router(options);

// Set routes
Router.advanceRoute(example);
// Print generate routes
Router.testAdvanceRoute(example);