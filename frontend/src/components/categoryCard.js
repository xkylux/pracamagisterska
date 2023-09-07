import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';

const CategoryCard = ({ category, index }) => {

  return (
    <Card style={{ width: '35rem' }}>
      <Card.Img crossOrigin="anonymous" variant="top" src={category.image ?? null} />
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        <Card.Text>
          {category.description}
        </Card.Text>
        <LinkContainer to={`/lista-porduktow/kategoria/${category.name}`}>
          <Button variant="primary">Przeglądaj</Button>
        </LinkContainer>

      </Card.Body>
    </Card>
  )
}

export default CategoryCard