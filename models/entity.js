class Entity {
  constructor({...args}) {
    Object.assign(this, args)
  }
}

module.exports = Entity;