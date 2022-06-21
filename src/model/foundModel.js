const yup = require('yup');

let descriptionModel = yup.object().shape({
    id : yup
        .string()
        .uuid()
        .required(),
    idAnimal : yup
        .string()
        .uuid()
        .required(),
    idOrganizacao : yup
        .string()
        .uuid()
        .required(),
    horarioEncontrado : yup
        .string()
        .matches(/\d\d:\d\d/g)
        .required(),
    diaEncontrado : yup
        .date()
        .required(),
    caracteristicasUnicas : yup
        .string()
})

module.exports = {descriptionModel};