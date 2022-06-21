const yup = require('yup');

let userModel = yup.object().shape({
    id : yup
        .string()
        .uuid()
        .required(),
    nome : yup
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

module.exports = userModel;