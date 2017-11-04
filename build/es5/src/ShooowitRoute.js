class ShooowitRoute {
  constructor({ requiereParams = [], filter = {} }) {
    this.validation = true;
    this.requiereParams = requiereParams;
    this.filter = filter;
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