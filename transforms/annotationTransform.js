
const { Annotation, AnnotationParam } = require("../models");

const annotationPattern = /\@([A-Za-z_].+)/i;
const annotationWithParamsPattern = /\@([A-Za-z_].+)\((.*)\)/i;
const annotationWithoutParamsPattern = /\@([A-Za-z_].+)[\W]*/i;

class AnnotationTransform {
  constructor() {

  }

  transform(block){
    let annotations = [];
     do {
      let raw = block.current();
      // console.log("annotations.transform: " + raw);

      if (this.isAnnotation(raw)){
        annotations.push(this.createAnnotation(raw))
        // console.log("isAnnotation: OK");

      }
      else
        break;
    }
    while(block.next());

    return annotations;
  }

  createAnnotation(raw) {
    let name = null;
    let params = null;
    let attributes = [];
    if (annotationWithParamsPattern.test(raw)){
      let matches = raw.match(annotationWithParamsPattern);
      name = matches[1];
      params = matches[2];
      var data = eval(`({${params}})`);

      Object.keys(data).forEach((name, index, array)=>{
        attributes[name] = data[name]
      })

    }
    else{
     let matches = raw.match(annotationWithoutParamsPattern);
      name = matches[1]; 
    }

    return new Annotation({
      name: name, 
      params: attributes
    });
  }

  isAnnotation(raw){
    return annotationPattern.test(raw);
  }
}

module.exports = AnnotationTransform;