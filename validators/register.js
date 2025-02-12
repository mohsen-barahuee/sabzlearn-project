const Validator = require('fastest-validator')

const v = new Validator()
//MAKE SCHEMA FOR VALIDATION FOR USER REGISTER
const schema = {
    name: { type: "string", min: 3, max: 255 },
    username: { type: "string", min: 3, max: 100 },
    email: { type: "email", min: 10, max: 100 },
    phone: { type: "string", min: 8, max: 11 },
    password: { type: "string", min: 8, max: 24 },
    confirmPassword: { type: "equal", field: "password" },
    $$strict:true
};

//COMPILING SCHEMA FOR VALIDATION
const check = v.compile(schema)

module.exports = check