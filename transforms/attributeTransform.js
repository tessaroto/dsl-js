const AnnotationTransform = require("./annotationTransform");

const attributePattern = /([A-Za-z_].+)[\ \t]*:[\ \t]*([A-Za-z_].+);/i;

class AttributeTransform {
  constructor() {
    this.annotationTransform = new AnnotationTransform();
  }

  transform(block){
    let attributes = [];
    let annotations = [];

    while(block.next()) {
      annotations = this.annotationTransform.transform(block);
      
      let raw = block.current();

      if (this.isAttribute(block.current())){
        attributes.push(this.createAttribute(raw, annotations))
        annotations = [];
      }
      else
        break;
    }

    return attributes;
  }

  createAttribute(raw, annotations) {
    let matches = raw.match(attributePattern);
    //console.log(matches)
        
    if (matches == null || matches.length != 3)
      throw Error("Invalid syntax.\nSyntax: " + this.syntax());
    
    return {
      name: matches[1], 
      type: matches[2],
      annotations: annotations
    };
  }

  isAttribute(raw){
    return attributePattern.test(raw);
  }
}

module.exports = AttributeTransform;