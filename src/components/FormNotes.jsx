import { useState, useContext } from 'react'
import { AlertContext } from '../context/AlertContext'
import { useFormik } from 'formik'
import { notesSchema } from '../schema/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '../api/api'
import { noteInputs } from '../helpers/inputs'; 
import LoadingButton from '@mui/lab/LoadingButton'
import { Grid, TextField, Paper, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function FormNotes() {
    const { setAlert, setValues } = useContext(AlertContext)

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation({
        mutationFn: createNote,
        onSuccess: (response) => {            
            setAlert(true)            
            if (response.code === 201) {
                setValues({ type: 'success', message: 'Note created' })
                return queryClient.invalidateQueries('notes')
            }
            setValues({ type: 'error', message: 'Error creating note' })
        },
        onError: (error) => {
            setAlert(true)
            setValues({ type: 'error', message: 'Expiro la sesion' })
            navigate('/login')
        }
    })

    const formik = useFormik({
        initialValues: {
            ...noteInputs.reduce((acc, curr) => ({ ...acc, [curr.name]: '' }), {})
        },
        validationSchema: notesSchema,
        onSubmit: values => {                        
            mutate(values);        
            formik.resetForm();
        }
    })

    return (
        <Paper component="form" onSubmit={formik.handleSubmit} sx={{ my: 5, p: 2 }}>
            <Grid container spacing={2}>
                {
                    noteInputs.map(input => {
                        return (
                            <Grid item xs={12} md={6} key={input.id}>
                                <TextField
                                    fullWidth
                                    label={input.label}
                                    name={input.name}
                                    type={input.type}
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    value={formik.values[input.name]}
                                    error={formik.touched[input.name] && Boolean(formik.errors[input.name])}
                                    helperText={formik.touched[input.name] && formik.errors[input.name]}
                                    disabled={isLoading}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
            <LoadingButton
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
                loading={isLoading}
            >
                Add
            </LoadingButton>                                
        </Paper>
    )
}