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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var RouterClass = function () {
  function RouterClass() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, RouterClass);

    this.validation = true;
    this.requiereParams = params.requiereParams || [];
    this.filter = params.filter || {};
  }

  _createClass(RouterClass, [{
    key: 'check',
    value: function check() {
      return this.validation;
    }
  }, {
    key: 'getRequiereParams',
    value: function getRequiereParams() {
      return this.requiereParams;
    }
  }, {
    key: 'getFilter',
    value: function getFilter() {
      return this.filter;
    }
  }, {
    key: 'index',
    value: function index() {
      var response = {};
      response.state = 'Working';
      return response;
    }
  }]);

  return RouterClass;
}();

exports.default = RouterClass;