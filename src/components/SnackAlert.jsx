import { Alert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import { AlertContext } from '../context/AlertContext';

export default function SnackAlert() {
    const { alert, setAlert, values: {type, message} } = useContext(AlertContext)
    
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={alert}
            autoHideDuration={3000}
            onClose={() => setAlert(false)}
        >
            <Alert severity={type}>{message}</Alert>
        </Snackbar>
    )
}