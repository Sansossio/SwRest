"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShooowitRoute = function () {
  function ShooowitRoute(_ref) {
    var _ref$requiereParams = _ref.requiereParams,
        requiereParams = _ref$requiereParams === undefined ? [] : _ref$requiereParams,
        _ref$filter = _ref.filter,
        filter = _ref$filter === undefined ? {} : _ref$filter;

    _classCallCheck(this, ShooowitRoute);

    this.validation = true;
    this.requiereParams = requiereParams;
    this.filter = filter;
  }

  _createClass(ShooowitRoute, [{
    key: "check",
    value: function check() {
      return this.validation;
    }
  }, {
    key: "getRequiereParams",
    value: function getRequiereParams() {
      return this.requiereParams;
    }
  }, {
    key: "getFilter",
    value: function getFilter() {
      return this.filter;
    }
  }]);

  return ShooowitRoute;
}();

exports.default = ShooowitRoute;