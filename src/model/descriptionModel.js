const yup = require('yup');

let descriptionModel = yup.object().shape({
    id : yup
        .string()
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
    dataPerdido : yup
        .date()
        .required(),
    caracteristicasUnicas : yup
        .string(),
    criadoEm : yup
        .date()
        .default(() => {
            let date = new Date().now;
            return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        })
})

module.exports = descriptionModel;