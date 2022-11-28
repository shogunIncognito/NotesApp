import { useState, useEffect, useContext } from 'react'
import { useFormik } from 'formik';
import { schema } from '../schema/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNote } from '../api/api';
import { validateEmpty, validateSame } from '../helpers/ValidateFields';
import { inputs } from '../helpers/inputs';
import { AlertContext } from '../context/AlertContext';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EditButton({ note }) {
    const [open, setOpen] = useState(false)
    const [empty, setEmpty] = useState(false)
    const [same, setSame] = useState(false)
    const [write, setWrite] = useState(false)
    const { setAlert, setValues } = useContext(AlertContext)

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateNote,
        onSuccess: (response) => {
            setValues({ type: 'success', message: 'Note Updated successfully' })
            setAlert(true)
            queryClient.invalidateQueries('notes')
        },
        onError: (error) => {
            console.log(error)
            setAlert(true)
            setValues({ type: 'error', message: 'Error updating note' })
        }
    })

    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        setEmpty(false)
        setSame(false)
        setWrite(false)
    }

    useEffect(() => {
        formik.setValues(note)
    }, [note])

    const formik = useFormik({
        initialValues: {
            ...inputs.reduce((acc, curr) => ({ ...acc, [curr.name]: '' }), {})
        },
        validationSchema: schema,
        onSubmit: values => {
            setWrite(false)
            setEmpty(false)
            setSame(false)

            if (validateEmpty(values)) return setEmpty(true)

            if (validateSame(values, note)) return setSame(true)

            mutate({ id: note.id, ...values });            
            setOpen(false)
            formik.resetForm();
        }
    })

    return (
        <>
            <Button sx={{ mb: 1 }} onClick={handleOpen}>
                <EditIcon />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}                
            >
                <Paper component="form" onSubmit={formik.handleSubmit} sx={style}>
                    <Grid container spacing={2} justifyContent="center">
                        {
                            inputs.map(input => {
                                return (
                                    <Grid item xs={12} md={4} key={input.id}>
                                        <TextField fullWidth
                                            label={input.label}
                                            name={input.name}
                                            type={input.type}
                                            variant="standard"
                                            onChange={(e) => {
                                                formik.handleChange(e)
                                                setWrite(true)
                                            }}
                                            value={formik.values[input.name]}
                                            error={formik.touched[input.name] && Boolean(formik.errors[input.name])}
                                            helperText={formik.touched[input.name] && formik.errors[input.name]}
                                        >
                                            <span>{input.label}</span>
                                        </TextField>
                                    </Grid>
                                )
                            })
                        }
                        <Button variant="contained"
                            disabled={!write}
                            sx={{ mt: 3, ml: 3 }}
                            type="submit">
                            Update
                        </Button>
                        <Button variant="contained"
                            sx={{ mt: 3, ml: 3 }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    {empty && <Alert sx={{ mt: 3 }} severity="error">¡Empty fields!</Alert>}
                    {same && <Alert sx={{ mt: 3 }} severity="warning">¡The fields are the same!</Alert>}
                </Paper>
            </Modal>
        </>
    )
}