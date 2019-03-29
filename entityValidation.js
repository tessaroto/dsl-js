
class EntityValidation {
  constructor(config) {
    this.config = config || {};
    this.config.entity = this.config.entity || {};
    this.config.entity.annotations = this.config.entity.annotations || {};
    //this.config.entity.annotations.params = this.config.entity.annotations.params || {};
    this.config.attribute = this.config.attribute || {};
    this.config.attribute.types = this.config.attribute.types || {};
    this.config.attribute.annotations = this.config.attribute.annotations || {};
    //this.config.attribute.annotations.params = this.config.attribute.annotations.params || {};
  }

  validate(entity, entityTypes){
    this.validateAnnotations(this.config.entity.annotations, entity.annotations, `entity ${entity.name}`);
    this.validateAttributes(this.config.attribute, entityTypes, entity);
    this.entityTypes
  }

  validateAnnotations(annotationConfig, annotations, elementName){

    annotations.forEach((annotation)=>{

      if (!annotationConfig[annotation.name]){
        throw Error(`The annotation '@${annotation.name}' is unknown in ${elementName}.\nAnnotations configured: ${Object.keys(annotationConfig)}.\n`)
      }

      this.validateParams(annotationConfig[annotation.name].params, annotation.params, `annotation '${annotation.name}' of ${elementName}`)

    });
  }

  validateParams(annotationParamsConfig, annotationParams, elementName){

    annotationParams.forEach((param)=>{
      if (!annotationParamsConfig[param.name]){
        throw Error(`The annotation parameter '@${param.name}' is unknown in ${elementName}.\nAnnotation parameters configured: ${Object.keys(annotationParamsConfig)}.\n`)
      }      
    });

    Object.keys(annotationParamsConfig).forEach((name)=>{
      const required = annotationParamsConfig[name].required || false;
      const paramValue = annotationParams[name];
      if (required && (!paramValue || paramValue=="" )){
        throw Error(`The annotation parameter '@${name}' is required in ${elementName}.\nAnnotation parameters configured: ${Object.keys(annotationParamsConfig)}.\n`)
      } 
    });


  }

  validateAttributes(config, entityTypes, entity){

    const allTypes = entityTypes.concat(config.types);

    if (!entity.attributes || entity.attributes.length == 0)
      throw Error(`The entity ${entity.name} haven't attributes.`);

    entity.attributes.forEach((attribute)=>{

      this.validateAnnotations(this.config.attribute.annotations, attribute.annotations, `attribute '${attribute.name}' of entity '${entity.name}'.`);

      if (!allTypes.includes(attribute.type)){
        throw Error(`The type '${attribute.type}' is unknown in attribute ${entity.name}.${attribute.name}.\nTypes configured: ${allTypes}.\n`)
      }
    });
  }
}

module.exports = EntityValidation;