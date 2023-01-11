import * as yup from 'yup';

export const notesSchema = yup.object({
    title: yup.string().trim().required("Title is required"),
    description: yup.string().trim().required("Description is required"),
})

export const registerSchema = yup.object({
    username: yup.string().trim().required("Username is required"),
    password: yup.string().trim().required("Password is required"),
    confirmPassword: yup.string().trim().required("Repeat password is required").oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const loginSchema = yup.object({
    username: yup.string().trim().required("Username is required"),
    password: yup.string().trim().required("Password is required"),
})