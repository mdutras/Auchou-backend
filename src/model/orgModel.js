import yup from 'yup';

export let userModel = yup.object({
    id : yup
        .string()
        .uuid()
        .required(),
    name : yup
        .string()
        .required,
    email : yup
        .string()
        .email()
        .required(),
    telefone : yup
        .string()
        .required(),
    endereco : yup
        .string()
        .required()
})