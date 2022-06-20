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
    caracteristicasUnicas : yub
        .string(),
    createdOn : yup
        .date()
        .default(() => {
            return new Date().now
            })
})