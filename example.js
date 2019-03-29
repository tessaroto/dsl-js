const { EntityBuilder } = require("./");

let raw = `

//teste aaa
@Comment(text:"aeee")
Product {
	@PK
	@Comment(text:"aeee", scope:"aaaa")
	id: Int;
	   name: String;
} ` 

let config = {
	entity:{
		annotations: {
			"Comment":{
				params:{
					"text":{
						required: true	
					},
					"scope":{
						required: false
					}
				}
			}
		}
	},
	attribute: {
		types:["Int", "String", "Decimal"],
		annotations: {
			"Comment":{
				params:{
					"text":{
						required: true	
					},
					"scope":{
						required: true
					}
				}
			},
			"PK":{
				params:{
				}
			}
		}
	}
};


let entityBuilder = new EntityBuilder(config);
var entity = entityBuilder.build(raw)




let params = {};
entity.annotations.forEach((annotation)=>{
	annotation.params.forEach((param)=>{
		params[param.name] = param.value;
	});

	console.log(`@${annotation.name} ${JSON.stringify(params)}`)
})
console.log(`${entity.name} {`)
entity.attributes.forEach((attribute)=>{
	let params = {};
	attribute.annotations.forEach((annotation)=>{
		//console.log(`  @${annotation.name}`)
		annotation.params.forEach((param)=>{
			params[param.name] = param.value;
		});

		console.log(`  @${annotation.name} ${JSON.stringify(params)}`)


	})
	console.log(`  ${attribute.name}: ${attribute.type}`)
})
console.log(`}`)
