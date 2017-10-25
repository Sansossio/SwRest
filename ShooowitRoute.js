class ShooowitRoute {
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
}

export default ShooowitRoute;
