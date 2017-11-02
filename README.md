# SwRest

> Simple rest api for NodeJs or MeteorJs, based on express

SwRest is a simple library based on express [Express](http://expressjs.com/).

- [GitHub](https://github.com/Sansossio/SwRest)

## Getting started

### Install
```shell
npm install swrest --save
```
### Download source
```shell
git clone https://github.com/Sansossio/SwRest.git
```
## Available http methods
```
GET
POST
PUT
PATCH
DELETE
OPTIONS
```

### Simple usage (ES5)
```js
  const SwRest = require('swrest/es5');
  const options = { 'port': 80 };
  const Router = new SwRest.Router(options);
  Router.addRoute('/')
    .get((params) => {
      const response = { 'msg': 'ES5' };
      return response;
    });
```
### Simple usage (ES6)

```js
import SwRest from 'swrest';

const Router = new SwRest.Router(options);
Router.addRoute('/')
  .get(params => params);
```

### Routes By Class (ES6)
```js
import SwRest from 'swrest';
// Options for router
const options = {
  consolePrint: true, // Default: false
  port: 8080, // Default: 8080
  jsonParse: true, // Default: true
  allowForms: true, // Default: true
};
// Advance router with es6
class Example extends SwRest.RouterClass {
  constructor(params) {
    super(params);
    this.basePath = '/'; // Default: Class name
  }
  // Root method
  // Route url: /
  index(params, get) {
    const response = params;
    response.method = get;
    response.status = 200; // Default: 200
    return response;
  }
  // Custom method
  // Route url: /api/:id/edit
  api(params, post, id, _edit) {
    const response = params;
    response.method = post;
    response.id = id;
    response.edit = _edit;
    response.status = 200; // Default: 200
    return params;
  }
}
const example = new Example();
// Init router
const Router = new SwRest.Router(options);

// Set routes
Router.advanceRoute(example);
// Print generate routes
Router.testAdvanceRoute(example);
```

## Not found
```js
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
```

## License

[MIT](http://opensource.org/licenses/MIT) ©
