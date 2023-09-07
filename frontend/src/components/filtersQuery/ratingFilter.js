import { Rating } from "react-simple-star-rating";
import { Form } from "react-bootstrap";
import { Fragment } from "react";

const RatingFilter = ({setRatinFilter}) => {
  return (
    <>
      <span className="fw-bold">Oceny</span>
      {Array.from({ length: 5 }).map((_, index) => (
        <Fragment key={index}>
          <Form.Check type="checkbox" id={`check-api-${index}`}>
            <Form.Check.Input type="checkbox" isValid onChange={e => setRatinFilter((items) => {return {...items,[5-index]:e.target.checked}}) } />
            <Form.Check.Label style={{ cursor: "pointer" }}>
              <Rating readonly size={20} initialValue={5 - index} />
            </Form.Check.Label>
          </Form.Check>
        </Fragment>
      ))}
    </>
  );
};

export default RatingFilter;
