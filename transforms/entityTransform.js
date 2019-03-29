
const { Entity } = require("../models");

const AttributeTransform = require("./attributeTransform");
const AnnotationTransform = require("./annotationTransform");

const entityNamePattern = /([A-Za-z_].+)[\ \t]*\{/i;

class EntityTransform {
  constructor() {
    this.attributeTransform = new AttributeTransform();
    this.annotationTransform = new AnnotationTransform();
  }

  transform(block){
  	let entity = null;
    do {
    	let annotations = this.annotationTransform.transform(block);

    	let raw = block.current();
    	if (this.isEntityName(raw)){
    		let attributes = this.attributeTransform.transform(block);
    		entity = this.createEntity(raw, attributes, annotations)
    	}
    }
    while(block.next());

    return entity;
  }

  createEntity(raw, attributes, annotations) {
    let matches = raw.match(/([A-Za-z_].+)[\ \t]*\{/i);
        
    if (matches == null || matches.length != 2)
      throw Error("Invalid syntax.\nSyntax: " + this.syntax());
    
    return new Entity({
      name: matches[1].trim(), 
      attributes: attributes,
      annotations: annotations
    });
  }

  isEntityName(raw){
    return entityNamePattern.test(raw);
  }

}

module.exports = EntityTransform;