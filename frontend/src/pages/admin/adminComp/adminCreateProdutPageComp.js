import { Container, Row, Col, Form, Button, CloseButton, Table, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Fragment, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { changeCategory, setMongoDbAttributesDetailsValue, setSpecificAttributeValue } from "./settings"

const AdminCreateProdutPageComp = ({ createNewProductRequest, uploadFileRequest, uploadToCloudinary, categories, dispatch, newCategory, removeCategory, updateCategoryMongoDb }) => {

  const [validated, setValidated] = useState(false);
  const [productAtrributesFromMongoDb, setProductAtrributesFromMongoDb] = useState([]);
  const [mongoDbAttributes, setMongoDbAttributes] = useState([]);
  const [img, setImg] = useState(false);
  const [isNewProductCreated, setIsNewProductCreated] = useState("");
  const [createProductResponseState, setCreateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("Wybierz kategorię");

  const attributeDetails = useRef(null);
  const attributeKey = useRef(null);
  const assignUniqueAttributeKey = useRef(null);
  const assignUniqueAttributeValue = useRef(null);
  const [keyForNewAttributes, setKeyForNewAttributes] = useState(false);
  const [valueForNewAttributes, setValueForNewAttributes] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      category: form.category.value,
      count: form.count.value,
      price: form.price.value,
      attributes: productAtrributesFromMongoDb
    }
    if (event.currentTarget.checkValidity() === true) {
      if (img.length > 3) {
        setIsNewProductCreated("Tylko 3 pliki!");
        return
      }
      createNewProductRequest(formInputs).then(data => {
        if (img) {
          if (process.env.NODE_ENV !== "production") {//EDYTOWAĆ !== ===
            uploadFileRequest(img, data.productId).then(res => { }).catch((error) => setIsNewProductCreated(error.response.data.message ? error.response.data.message : error.response.data))
          } else {
            uploadToCloudinary(img, data.productId);
          }
        }
        if (data.message === "Dodano produkt") navigate("/admin-produkty");
      }).catch(error => {
        setCreateProductResponseState({ error: error.response.data.message ? error.response.data.message : error.response.data });
      })
    }

    setValidated(true);
  };

  const uploader = (img) => {
    setImg(img);
  }

  const categoryCreator = (e) => {
    if (e.keyCode && e.keyCode === 13 && e.target.value) {
      dispatch(newCategory(e.target.value));
      setTimeout(() => {
        let element = document.getElementById("catego");
        setSelectedCategory(e.target.value);
        element.value = e.target.value;
        e.target.value = "";
      }, 200)
    }
  }

  const categoryRemover = () => {
    let element = document.getElementById("catego");
    dispatch(removeCategory(element.value));
    setSelectedCategory("Wybierz kategorię");
  }

  const chosenValue = (e) => {
    if (e.target.value !== "Wybierz wartość") {
      setSpecificAttributeValue(attributeKey.current.value, e.target.value, setProductAtrributesFromMongoDb);
    }
  }

  const deleteAttributeItem = (key) => {
    setProductAtrributesFromMongoDb((list) => list.filter((item) => item.key !== key));
  }

  const assignAttrKey = (e) => {
    e.preventDefault();
    setKeyForNewAttributes(e.target.value);
    createNewData(e);
  }


  const assignAttrValue = (e) => {
    e.preventDefault();
    setValueForNewAttributes(e.target.value);
    createNewData(e);
  }

  const createNewData = (e) => {
    if (e.keyCode && e.keyCode === 13) {
      if (keyForNewAttributes && valueForNewAttributes) {
        dispatch(updateCategoryMongoDb(keyForNewAttributes, valueForNewAttributes, selectedCategory));
        setSpecificAttributeValue(keyForNewAttributes, valueForNewAttributes, setProductAtrributesFromMongoDb);
        e.target.value = "";
        assignUniqueAttributeKey.current.value = "";
        assignUniqueAttributeValue.current.value = "";
        setKeyForNewAttributes(false);
        setValueForNewAttributes(false);
      }
    }
  }

  const controlKey = (e) => {
    if (e.code === "Enter" && "NumpadEnter") e.preventDefault();
    if (e.code === "NumpadEnter") e.preventDefault();
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin-produkty" className="btn btn-info my-3">
            Powrót
          </Link>
        </Col>
        <Col md={6}>
          <h1>Utwórz nowy produkt</h1>

          <Form noValidate validated={validated} onSubmit={handleSubmit} onKeyDown={(e) => controlKey(e)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nazwa</Form.Label>
              <Form.Control name="name" required type="text" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicDescription"
            >
              <Form.Label>Opis</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Ilość sztuk</Form.Label>
              <Form.Control name="count" required type="number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Cena</Form.Label>
              <Form.Control name="price" required type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>
                Kategoria
                <CloseButton onClick={categoryRemover} />(<small>usuń tą kategorię</small>)
              </Form.Label>
              <Form.Select
                id="catego"
                required
                name="category"
                aria-label="Examlpe"
                onChange={(e) => changeCategory(e, categories, setMongoDbAttributes, setSelectedCategory)}
              >
                <option value="">Wybierz kategorię</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewCategory">
              <Form.Label>
                Utwórz nową kategorię
              </Form.Label>
              <Form.Control onKeyUp={categoryCreator} name="newCategory" type="text" />
            </Form.Group>

            {mongoDbAttributes.length > 0 && (
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Wybierz atrubut</Form.Label>
                    <Form.Select name="atrrKey" aria-label="Default select example" ref={attributeKey} onChange={(e) => setMongoDbAttributesDetailsValue(e, attributeDetails, mongoDbAttributes)}>
                      <option>Wybierz atrybut</option>
                      {mongoDbAttributes.map((item, index) => (
                        <Fragment key={index}>
                          <option value={item.key}>{item.key}</option>
                        </Fragment>

                      ))}

                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributesValue">
                    <Form.Label>Wartość atrybutu</Form.Label>
                    <Form.Select onChange={chosenValue} name="atrrVal" aria-label="Default select example" ref={attributeDetails}>
                      <option>Wybierz wartość atrybutu</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}


            <Row>
              {productAtrributesFromMongoDb.length > 0 && (
                <Table hover>
                  <thead>
                    <tr>
                      <th>Atrybut</th>
                      <th>Wartość</th>
                      <th>Usuń</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productAtrributesFromMongoDb.map((item, index) => (
                      <tr key={index}>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                        <td onClick={() => deleteAttributeItem(item.key)}><CloseButton /></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Utwórz atrybut</Form.Label>
                  <Form.Control ref={assignUniqueAttributeKey} disabled={["", "Wybierz kategorię"].includes(selectedCategory)} placeholder="wybierz lub utwórz kategorię" name="newAttrValue"
                    type="text" onKeyUp={assignAttrKey} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttributeValue">
                  <Form.Label>Wartość atrybutu</Form.Label>
                  <Form.Control ref={assignUniqueAttributeValue} disabled={["", "Wybierz kategorię"].includes(selectedCategory)} placeholder="wybierz lub utwórz kategorię" required={keyForNewAttributes} name="newAttrValue"
                    type="text" onKeyUp={assignAttrValue} />
                </Form.Group>
              </Col>
            </Row>

            <Alert show={keyForNewAttributes && valueForNewAttributes} variant="primary">
              Zatwierdź klawiszem Enter
            </Alert>

            <Form.Group className="mb-3 mt-3" controlId="formBasicFile">
              <Form.Label>Zdjęcia</Form.Label>

              <Form.Control required type="file" multiple onChange={(e) => uploader(e.target.files)} />
              {isNewProductCreated}
            </Form.Group>
            <Button variant="primary" type="submit">
              Utwórz nowy produkt
            </Button>
            {createProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreateProdutPageComp;