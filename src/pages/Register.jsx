import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import { registerSchema } from '../schema/schema';
import { LoadingButton } from '@mui/lab';
import { registerInputs } from '../helpers/inputs';
import { Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../context/AlertContext';
import { useContext } from 'react';
import { register } from '../api/api';

export default function Register() {
    const { setAlert, setValues } = useContext(AlertContext)
    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation({
        mutationFn: register,
        onSuccess: (response) => {
            console.log(response);
            setAlert(true)

            navigate('/login')
        },
        onError: (error) => {
            console.log(error)
            setAlert(true)
            if (error.response.status === 409) {
                setValues({
                    type: 'error', message: 'User already exists'
                })
                return
            }
            setValues({
                type: 'error', message: 'Error registering'
            })
        }
    })

    const formik = useFormik({
        initialValues: {
            ...registerInputs.reduce((acc, curr) => ({ ...acc, [curr.name]: '' }), {})
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            mutate(values)
        }
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {
                            registerInputs.map(input => {
                                return (
                                    <Grid item xs={12} key={input.id}>
                                        <TextField
                                            onChange={formik.handleChange}
                                            error={formik.touched[input.name] && Boolean(formik.errors[input.name])}
                                            helperText={formik.touched[input.name] && formik.errors[input.name]}
                                            value={formik.values[input.name]}
                                            required
                                            fullWidth
                                            label={input.label}
                                            name={input.name}
                                            type={input.type}
                                        />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    <LoadingButton
                        loading={isLoading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <RouterLink to="/login" style={{ color: '#70CAF2' }}>
                                Already have an account? Sign in
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>

    );
}