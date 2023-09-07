import { Form } from "react-bootstrap";

const PriceFilter = ({priceFilter, setPriceFilter}) => {
  return (
    <>
      <Form.Label>
        <span className="fw-bold">Cena do:</span> {priceFilter} zł
      </Form.Label>
      <Form.Range min={10} max={1000} step={10} onChange={(e) => setPriceFilter(e.target.value)} />
    </>
  );
};

export default PriceFilter;
