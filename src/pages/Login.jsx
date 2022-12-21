import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import { loginSchema } from '../schema/schema';
import { loginInputs } from '../helpers/inputs';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/api';
import { AlertContext } from '../context/AlertContext';
import { useContext } from 'react';
import { setToken } from '../helpers/auth';

export default function Login() {
    const { setAlert, setValues } = useContext(AlertContext)
    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation({
        mutationFn: login,
        onSuccess: (response) => {            
            setToken(response.token)
            setAlert(true)
            setValues({
                type: 'success', message: 'Login successfully'
            })
            navigate('/') 
        },
        onError: (error) => {            
            setAlert(true)
            setValues({
                type: 'error', message: 'Error logging in'
            })
        }
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            mutate(values)
        }
    });

    return (
        <>
            <Container component="main" maxWidth="xs">
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        {
                            loginInputs.map(input => {
                                return (
                                    <TextField
                                        key={input.id}
                                        onChange={formik.handleChange}
                                        error={formik.touched[input.name] && Boolean(formik.errors[input.name])}
                                        helperText={formik.touched[input.name] && formik.errors[input.name]}
                                        value={formik.values[input.name]}
                                        margin="normal"
                                        required
                                        fullWidth
                                        label={input.label}
                                        name={input.name}
                                        type={input.type}
                                        autoFocus
                                    />
                                )
                            })
                        }
                        <LoadingButton
                            disabled={isLoading || !formik.isValid}
                            loading={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </LoadingButton>
                        <Grid container>
                            <Grid item>
                                <RouterLink to="/register" style={{ color: '#70CAF2' }}>
                                    Don't have an account? Sign Up
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}