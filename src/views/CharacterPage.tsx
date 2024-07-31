import { useQuery } from "urql";
import { GET_CHARACTER } from "../graphql/Queries";
import { Link, useParams } from "react-router-dom";
import { Alert, Button, Card, Container, Spinner } from "react-bootstrap";
import { useState } from "react";

interface IEpisode {
    episode: string,
    name: string
}

const CharacterPage = () => {
    const [show, setShow] = useState(true)
    const { id } = useParams()
    const { data, loading, error } = useQuery(GET_CHARACTER, {
        variables: { id }
    })

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
    
    console.log(data)

    if (error) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error! {error.message}</Alert.Heading>
            </Alert>
        )
    }
    return (
        <Container>
            <Card>
                <Card.Img variant="top" src={data.character.image}/>
                <Card.Body>
                    <Card.Title>{data.character.name}</Card.Title>
                    <Link to={'/'}>
                    <Button variant="primary">Back to ALl Characters</Button>
                    </Link>
                    <ul>
                        {data.character.episode.map((ep) => (
                            <li key={ep.episode}>{ep.name} - {ep.episode}</li>
                        ))}
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default CharacterPage