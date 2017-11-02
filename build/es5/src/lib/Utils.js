'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-console */
/* Utils */

var slogan = '';
function isForm(headers) {
  switch (headers) {
    case 'application/x-www-form-urlencoded':
      return true;
    default:
      if (headers.indexOf('multipart/form-data') > -1) return true;
      return false;
  }
}
var avalaibleHeader = exports.avalaibleHeader = function avalaibleHeader(header, forms) {
  if (!header) return true;
  var response = true;
  if (!forms) {
    response = !isForm(header);
  }
  return response;
};
// Global methods
var setSlogan = exports.setSlogan = function setSlogan(val) {
  slogan = val;
};
var print = exports.print = function print(type, message) {
  console[type](slogan + ' ' + message);
};
var getParams = exports.getParams = function getParams(method, request) {
  var response = {};
  switch (method) {
    case 'post':
    case 'put':
    case 'patch':
    case 'delete':
    case 'options':
      response = isForm(request.headers['content-type']) ? request.body : request.ibody;
      break;
    default:
      response = false;
  }
  return response;
};
var validateParams = exports.validateParams = function validateParams(params, re, auth) {
  var response = [];
  var requiere = re.slice(0);
  if (auth && requiere.indexOf('token') === -1) requiere.push('token');
  requiere.forEach(function (key) {
    var keyInParams = !(key in params);
    var keyInUrl = !(params.url && key in params.url);
    var keyInQuery = !(params.query && key in params.query);
    if (keyInParams && keyInUrl && keyInQuery) response.push(key);
  });
  return response;
};

var errorResponse = exports.errorResponse = function errorResponse(params) {
  var response = {};
  if (params.warning) response.warning = params.warning;
  if (params.error) response.error = params.error;
  return response;
};

var setError = exports.setError = function setError(error) {
  return { error: error };
};

var createGlobalResponse = exports.createGlobalResponse = function createGlobalResponse(methods, logicFunction) {
  var response = {};
  methods.forEach(function (method) {
    response[method] = function (callback) {
      var requiereParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return logicFunction({
        method: method,
        callback: callback,
        requiereParams: requiereParams,
        filter: filter
      });
    };
  });
  return response;
};

var getProptypes = exports.getProptypes = function getProptypes(component) {
  var reservedMethods = ['constructor', 'check', 'getRequiereParams', 'getFilter'];
  var props = [];
  var obj = component;
  do {
    var l = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj).map(function (s) {
      return s.toString();
    })).sort().filter(function (p, i, arr) {
      return typeof obj[p] === 'function' && reservedMethods.indexOf(p) === -1 && (i == 0 || p !== arr[i - 1]) && props.indexOf(p) === -1;
    });
    props = props.concat(l);
  } while ((obj = Object.getPrototypeOf(obj)) && Object.getPrototypeOf(obj));

  return props;
};

var getProptypesParent = exports.getProptypesParent = function getProptypesParent(object) {
  return Object.getPrototypeOf(Object.getPrototypeOf(object));
};

var getParentName = exports.getParentName = function getParentName(object) {
  return getProptypesParent(object).constructor.name;
};

var getBasePath = exports.getBasePath = function getBasePath(basePath, name) {
  var response = basePath || '/' + name;
  var last = response.substr(-1);
  if (last === '/') response = response.slice(0, -1);

  return response;
};

var getFnParamNames = exports.getFnParamNames = function getFnParamNames(fn) {
  var fstr = fn.toString();
  var parametters = fstr.match(/\(.*?\)/)[0].replace(/[()]/gi, '').replace(/\s/gi, '').split(',');
  if (parametters.length < 2) return [];
  return parametters.slice(1);
};