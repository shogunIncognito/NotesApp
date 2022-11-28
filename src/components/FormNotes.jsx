import { useState, useContext } from 'react'
import { AlertContext } from '../context/AlertContext'
import { useFormik } from 'formik'
import { schema } from '../schema/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '../api/api'
import { validateEmpty } from '../helpers/ValidateFields'
import { inputs } from '../helpers/inputs';
import LoadingButton from '@mui/lab/LoadingButton'
import { Grid, TextField, Paper, Alert } from '@mui/material'

export default function FormNotes() {
    const [empty, setEmpty] = useState(false)    
    const { setAlert, setValues } = useContext(AlertContext)

    const queryClient = useQueryClient()

    const { mutate, isLoading } = useMutation({
        mutationFn: createNote,
        onSuccess: (response) => {
            setAlert(true)
            setValues({ type: 'success', message: 'Note added successfully' })
            queryClient.invalidateQueries('notes')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const formik = useFormik({
        initialValues: {
            ...inputs.reduce((acc, curr) => ({ ...acc, [curr.name]: '' }), {})
        },
        validationSchema: schema,
        onSubmit: values => {
            setEmpty(false)
            if (validateEmpty(values)) return setEmpty(true)

            
            mutate(values);        
            formik.resetForm();
        }
    })

    return (
        <Paper component="form" onSubmit={formik.handleSubmit} sx={{ my: 5, p: 2 }}>
            <Grid container spacing={2}>
                {
                    inputs.map(input => {
                        return (
                            <Grid item xs={12} md={4} key={input.id}>
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
            
            {empty && <Alert sx={{ mt: 2 }} severity="error">¡Empty fields!</Alert>}
        </Paper>
    )
}