import Notes from './components/Notes'
import FormNotes from './components/FormNotes'
import Container from '@mui/material/Container'
import SnackAlert from './components/SnackAlert'

function App() {
  return (
    <Container maxWidth="lg">
      <FormNotes />
      <Notes />
      <SnackAlert />
    </Container>
  )
}

export default App
