import Carousel from 'react-bootstrap/Carousel';
import { LinkContainer } from 'react-router-bootstrap';

const ProductCarousel = ({ bestSellers }) => {
  const cursorPointer = {
    cursor: "pointer"
  };
  console.log(bestSellers)
  return bestSellers.length > 0 ? (
    <Carousel>
      {bestSellers.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            crossOrigin="anonymous"
            className="d-block w-100"
            style={{
              height: "300px",
              objectFit: "cover"
            }}
            src={item.images ? item.images[0].path : null}
            alt="First slide"
          />
          <Carousel.Caption>

            <LinkContainer style={cursorPointer} to={`/szczegoly-poduktow/${item._id}`}>
              <h3>Bestseller z kategori {item.category}</h3>
            </LinkContainer>
            <p>{item.description}</p>

          </Carousel.Caption>
        </Carousel.Item>
      ))}

    </Carousel>
  ) : null;
};

export default ProductCarousel;

