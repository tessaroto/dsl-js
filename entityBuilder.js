const BlockString = require("./transforms/blockString");
const EntityTransform = require("./transforms/entityTransform");
const EntityValidation = require("./entityValidation");
const File = require('./utils/file');
const path = require('path');

class EntityBuilder {
  constructor(config) {
    this.config = config || {};
    this.entityTransform = new EntityTransform();
    this.entityValidation = new EntityValidation(this.config);
  }

  build(raw){
    const block = new BlockString(raw);
    const entity = this.entityTransform.transform(block)
    
    //this.entityValidation.validate(entity);

    return entity;
  }

  async buildFrom(modelPath){

    const fullPath = path.join(process.cwd(), modelPath);
    const files = await File.list(fullPath, ".entity");

    return await this.buildFromFiles(files);
  }

  async buildFromFiles(files){
    let entities = {};

    for (const index in files) {
      const file = files[index];
      const raw = await File.read(file);
      const block = new BlockString(raw);
      const entity = this.entityTransform.transform(block)

      entities[entity.name] = entity;
    }

    const entityTypes = Object.keys(entities);

    for (const index in entities) {
      const entity = entities[index];
      this.entityValidation.validate(entity, entityTypes);  
    }
    

    //console.log(entities)

    return entities;//await Promise.all(entities);
  }

}

module.exports = EntityBuilder;