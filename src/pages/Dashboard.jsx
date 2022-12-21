import Notes from '../components/Notes'
import FormNotes from '../components/FormNotes'
import NavBar from '../components/NavBar'
import Container from '@mui/material/Container'

export default function Dashboard() {
    return (
        <>
            <NavBar />
            <Container maxWidth="lg">
                <FormNotes />
                <Notes />
            </Container>
        </>
    )
}