const SwRest = require('../es5');
// In your project is require('swrest/es5')
// Options for router
const options = {
  consolePrint: true, // Default: false
  port: 8080, // Default: 8080
  jsonParse: true, // Default: true
  allowForms: true, // Default: true
  basePath: '/v1',
};
// Init router
const Router = new SwRest.Router(options);
// Set routes
/* Syntax: Router.addRouter({path})
  .{method}({callback}, {requiereParams}, {filter})
*/
Router.addRoute('/api/:id')
  .get(params => params, ['i'])
  .post(params => params, ['i'], { authRequired: true });
/* Other methods
  .patch(callback)
  .delete(callback)
  .options(callback) */
// 404
Router.notFound()
  .get(() => {
    return 'NotFound Get';
  })
  .post(() => {
    return 'NotFound Post';
  })
  .all(() => {
    return 'NotFound Another methods';
  });