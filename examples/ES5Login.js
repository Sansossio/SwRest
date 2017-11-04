const SwRest = require('../es5');
// In your project is require('swrest/es5')
function loginToken(token) {
  return token === '1234';
}
const options = {
  'port': 80,
  checkLogin: loginToken
};
// Init router
const Router = new SwRest.Router(options);
// Set routes
/* Syntax: Router.addRouter({path})
  .{method}({callback}, {requiereParams}, {filter})
*/
Router.addRoute('/api/:id')
  .get(params => params, [], { authRequired: true })
  /* Other methods
  .post(params => params, ['i']);
  .patch(callback)
  .delete(callback)
  .options(callback) */