class AnnotationParam {
  constructor({name, value, ...args}) {
    Object.assign(this, args)
    this.name = name;
    this.value = value;
  }
}

module.exports = AnnotationParam;