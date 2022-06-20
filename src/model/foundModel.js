import yup from 'yup';

export let requisitionModel = yup.object({
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
    caracteristicasUnicas : yub
        .string()
})