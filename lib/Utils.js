/* eslint-disable no-console */
/* Utils */


let slogan = '';
function isForm(headers) {
  switch (headers) {
    case 'application/x-www-form-urlencoded':
      return true;
    default:
      if (headers.indexOf('multipart/form-data') > -1) return true;
      return false;
  }
}
export const avalaibleHeader = (header, forms) => {
  if (!header) return true;
  let response = true;
  if (!forms) {
    response = !isForm(header);
  }
  return response;
};
// Global methods
export const setSlogan = (val) => {
  slogan = val;
};
export const print = (type, message) => {
  console[type](`${slogan} ${message}`);
};
export const getParams = (method, request) => {
  let response = {};
  switch (method) {
    case 'gets':
      response = request.query;
      break;
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
export const validateParams = (params, re, auth) => {
  const response = [];
  const requiere = re.slice(0);
  if (auth && requiere.indexOf('token') === -1) requiere.push('token');
  requiere.forEach((key) => {
    const keyInParams = !(key in params);
    const keyInUrl = !(params.url && (key in params.url));
    const keyInQuery = !(params.query && (key in params.query));
    if (keyInParams && keyInUrl && keyInQuery) response.push(key);
  });
  return response;
};

export const errorResponse = (params) => {
  const response = {};
  if (params.warning) response.warning = params.warning;
  if (params.error) response.error = params.error;
  return response;
};

export const setError = error => ({ error });

export const createGlobalResponse = (methods, logicFunction) => {
  const response = {};
  methods.forEach((method) => {
    response[method] = (callback, requiereParams = [], filter = {}) =>
      logicFunction({
        method,
        callback,
        requiereParams,
        filter,
      });
  });
  return response;
};

export const getProptypes = component => {
  const reservedMethods = ['constructor', 'check', 'getRequiereParams', 'getFilter'];
  let props = []
  let obj = component;
  do {
    const l = Object.getOwnPropertyNames(obj)
      .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
      .sort()
      .filter((p, i, arr) =>
        typeof obj[p] === 'function' &&
        reservedMethods.indexOf(p) === -1 &&  
        (i == 0 || p !== arr[i - 1]) &&
        props.indexOf(p) === -1
      )
    props = props.concat(l)
  }
  while (
    (obj = Object.getPrototypeOf(obj)) &&
    Object.getPrototypeOf(obj)
  )

  return props;
};

export const getProptypesParent = object => Object.getPrototypeOf(Object.getPrototypeOf(object));

export const getParentName = object => getProptypesParent(object).constructor.name;

export const getBasePath = (basePath, name) => {
  let response = basePath || `/${name}`;
  const last = response.substr(-1);
  if (last === '/') response = response.slice(0, -1);

  return response;
};

export const getFnParamNames = (fn) => {
  const fstr = fn.toString();
  const parametters = fstr.match(/\(.*?\)/)[0].replace(/[()]/gi, '').replace(/\s/gi, '').split(',');
  if (parametters.length <= 2) return [];
  return parametters.slice(2);
};
