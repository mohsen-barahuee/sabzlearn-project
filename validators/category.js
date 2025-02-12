const Validator = require('fastest-validator')


const v = new Validator()
//MAKE SCHEMA FOR VALIDATION FOR CATEGORYS
const schema = {
    title : { type: "string"},
    href : { type: "string"},
}


//COMPILING SCHEMA FOR VALIDATION
const check = v.compile(schema)


module.exports = check