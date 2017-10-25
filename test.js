import SwRest from './index';

// Advance routes
class Api extends SwRest.ShooowitRoute {
  constructor(params = {}) {
    super(params);
    this.basepath = '/';
  }
  index(params, methods, id, appId) {
    return params;
  }
  test() {

  }
}
const api = new Api({
  requiereParams: ['i'],
  filter: { authRequired: true },
})
// Define routes
const options = {
  consolePrint: true,
};
const Router = new SwRest.Router(options);

Router.advanceRoute(api);
Router.testAdvanceRoute(api);