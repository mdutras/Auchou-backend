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
    idRequisitante : yup
        .string()
        .uuid()
        .required(),
    horarioPerdido : yup
        .string()
        .matches(/\d\d:\d\d/g)
        .required(),
    diaPerdido : yup
        .date()
        .required(),
    caracteristicasUnicas : yup
        .string(),
    createdOn : yup
        .date()
        .default(() => {
            return new Date().now
            })
})

module.exports = descriptionModel;