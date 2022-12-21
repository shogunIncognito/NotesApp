import * as yup from 'yup';

export const notesSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
})

export const registerSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Repeat password is required").oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const loginSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
})