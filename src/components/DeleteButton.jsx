import { useState, useContext } from 'react';
import { deleteNote } from '../api/api';
import { AlertContext } from '../context/AlertContext';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

export default function DeleteButton({ id }) {
    const [open, setOpen] = useState(false);
    const { setAlert, setValues } = useContext(AlertContext)

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleDelete = () => {
        mutate(id)                        
        setAlert(true)
        setValues({ type: 'success', message: 'Note deleted successfully' })
        handleClose()
    }

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onSuccess: (response) => {
            queryClient.invalidateQueries('notes')
        },
        onError: (error) => {
            console.log(error)
            setAlert(true)
            setValues({ type: 'error', message: 'Error deleting note' })
        }
    })

    return (
        <>
            <Button sx={{ mb: 1 }} onClick={handleClickOpen}>
                <DeleteIcon sx={{ color: 'red' }} />
            </Button>
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 500 } }}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    {"¿Do you want to delete the note?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button sx={{ color: 'red' }} onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}