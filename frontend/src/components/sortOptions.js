import { Form } from "react-bootstrap";

const SortOptions = ({ setSortProducts }) => {
  return (
    <Form.Select onChange={(e) => setSortProducts(e.target.value)} aria-label="Default select example">
      <option>Sortuj</option>
      <option value="price_1">Cena: Min - Max</option>
      <option value="price_-1">Cena: Max - Min</option>
      <option value="rating_-1">Oceny</option>
      <option value="name_1">Nazwa A - Z</option>
      <option value="name_-1">Nazwa Z - A</option>
    </Form.Select>
  );
};

export default SortOptions;
