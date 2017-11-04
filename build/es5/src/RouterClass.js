class RouterClass {
  constructor(params = {}) {
    this.validation = true;
    this.requiereParams = params.requiereParams || [];
    this.filter = params.filter || {};
  }
  check() {
    return this.validation;
  }
  getRequiereParams() {
    return this.requiereParams;
  }
  getFilter() {
    return this.filter;
  }
  index() {
    const response = {};
    response.state = 'Working';
    return response;
  }
}

export default RouterClass;