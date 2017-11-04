import { validateParams, getParams, setError, errorResponse } from './Utils';

class Listen {
  constructor() {
    Listen.jsonParse = true;
  }
  static jsonParse(val) {
    Listen.jsonParse = val;
  }
  static async generateResponse(callback, res, params, method) {
    // Verificamos si el callback es una funcion
    if (typeof callback !== 'function') {
      res.status(500).json(setError('Invalid Callback'));
      return;
    }
    // Creamos el response
    const paramsUrl = params.query || {};
    const paramsFixed = params;
    delete paramsFixed.query;
    const response = (await callback(paramsFixed, method, ...Object.values(paramsUrl))) || setError('Callback need a return');
    // Enviamos
    const status = response.status || 200;
    const send = Object.assign(response, errorResponse(paramsFixed));
    // Eliminamos lo innecesario
    delete response.status;
    // Respondemos
    if (Listen.jsonParse) res.status(status).json(send);else res.send(send);
  }
  static Params(method, req) {
    // Obtenemos los parametros obtenidos
    const { query, files } = req;
    const params = getParams(method, req);
    const response = Object.assign(Object.keys(query).length > 0 ? { url: query } : {}, req.params, params, Object.keys(files).length > 0 ? { files } : {});
    return response;
  }
  static async Request(authLogin, tokenHeader, method, callback, req, res, requiereParams = [], login = () => false) {
    const params = Listen.Params(method, req);
    // Validamos
    const validate = validateParams(params, requiereParams, authLogin && !tokenHeader);
    if (validate.length > 0) {
      const missingargs = Object.assign({ 'Missing Arguments': validate }, errorResponse(params));
      res.status(404).json(missingargs);
      return;
    }
    // Login
    if (authLogin) {
      const auth = await login(tokenHeader || params.token || params.url.token);
      if (!auth) {
        res.status(500).json(setError('Login fail'));
        return;
      }
      params.user = auth;
      if (params.token || params.url && params.url.token) params.warning = 'Token must be sent by header (X-Auth-Token)';
    }
    // Devolvemos
    Listen.generateResponse(callback, res, params, method);
  }
}

export default Listen;