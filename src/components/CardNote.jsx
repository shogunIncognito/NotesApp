import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from "@mui/material/Typography"
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

export default function CardNote({ note }) {
    const { id, title, description, author } = note
    const titleUpper = title.charAt(0).toUpperCase() + title.slice(1)

    return (
        <Card sx={{ minWidth: 275 }} >
            <CardContent>
                <Typography sx={{ overflowWrap: 'anywhere' }} variant="body1" component="div" mt={1}>
                    <span>{titleUpper}</span>
                    <p>{description}</p>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span>{author}</span>
                </Typography>
            </CardContent>
            <EditButton note={ note }/>
            <DeleteButton id={ id }/>
        </Card>
    )
}