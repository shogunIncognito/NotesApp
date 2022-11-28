import { useContext } from "react"
import { AlertContext } from "../context/AlertContext"
import { getAllNotes } from "../api/api"
import { useQuery } from "@tanstack/react-query"
import CardNote from "./CardNote"
import Spinner from "../components/Spinner"
import Grid from "@mui/material/Grid";

export default function Notes() {
    const { setAlert, setValues } = useContext(AlertContext)
    
    const { data: notes, isLoading, isError } = useQuery({
        queryKey: ["notes"],
        queryFn: getAllNotes,
    })

    if (isLoading) return <Spinner />
    if (isError) {
        setAlert(true)
        setValues({ type: 'error', message: 'Error consulting notes' })
    }

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
            {
                notes.map(note => {
                    return (
                        <Grid item xs={2} sm={4} md={4} key={note.id}>
                            <CardNote note={note} />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}