const yup = require('yup');

let orgModel = yup.object().shape({
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
        .required(),
    endereco : yup
        .string()
        .required()
})

module.exports = {orgModel};