const yup = require('yup');

let animalModel = yup.object().shape({
    id : yup
        .string()
        .required(),
    raca : yup
        .string()
        .required(),
    porte : yup
        .string()
        .required(),
    corPelo : yup
        .string()
        .required(),
    tamanhoPelo : yup
        .string()
        .required(),
    sexo : yup
        .string()
        .required(),
    estagio : yup.
        string().
        required(),
})

module.exports = animalModel;