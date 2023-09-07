import { Card, Button, Row, Col } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { LinkContainer } from "react-router-bootstrap";

const ProductsList = ({ productId, name, description, price, rating, reviewsNumber, images }) => {
  return (
    <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row>
        <Col lg={5}>
          <Card.Img crossOrigin="anonymous" variant="top" src={images[0] ? images[0].path : ''} />
          {/* <Card.Img crossOrigin="anonymous" variant="top" src={"/img/computer.png"} /> */}
        </Col>
        <Col lg={7}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
            <Card.Text>
              <Rating readonly size={20} initialValue={rating} /> ({reviewsNumber})
            </Card.Text>
            <Card.Text className="h4">
              {price}zł{" "}
              {/* <LinkContainer to="/szczegoly-poduktow"> */}
              <LinkContainer to={`/szczegoly-poduktow/${productId}`}>
                <Button variant="danger">Obejrz produkt</Button>
              </LinkContainer>
            </Card.Text>


          </Card.Body>
        </Col>
      </Row>


    </Card>
  );
};

export default ProductsList;
