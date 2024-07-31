import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../graphql/Queries';
import { Alert, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ICharacter {
    id: string,
    image: string,
    name: string   
}

const CharactersPage = () => {
  const { data, loading, error } = useQuery(GET_CHARACTERS);
  const [, setShow] = useState(true);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error! {error.message}</Alert.Heading>
      </Alert>
    );
  }

  return (
    <Container>
      <h1 className='text-center'>All Characters</h1>
      <Row>
        {data.characters.results.map(({ id, image, name }: ICharacter) => (
            <Col key={id}>
                <Card style={{ width: '18rem', margin: '10px' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Link to={`/${id}`}>
                      <Button variant="primary">Character Details</Button>
                    </Link>
                </Card.Body>
                </Card>
            </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CharactersPage;