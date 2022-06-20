//import yup from 'yup';
const yup = require('yup');

let userModel = yup.object({
    id : yup
        .string()
        .uuid()
        .required(),
    name : yup
        .string()
        .required(),
    email : yup
        .string()
        .email()
        .required(),
    telefone : yup
        .string()
        .required()
})

module.exports = {userModel};