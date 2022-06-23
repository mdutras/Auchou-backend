const yup = require('yup');

let userModel = yup.object().shape({
    id : yup
        .string()
        .required(),
    nome : yup
        .string()
        .required(),
    senha : yup
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