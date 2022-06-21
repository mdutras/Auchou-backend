const yup = require('yup');

let animalModel = yup.object().shape({
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
        .number()
        .integer()
        .positive()
        .required(),
    estágio : yup.
        string().
        required(),
})

module.exports = {animalModel};