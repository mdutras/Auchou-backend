import * as yup from "yup";

export let animalModel = yub.object({
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
        .positive
        .required(),
    estágio : yup.
        string().
        required(),
})