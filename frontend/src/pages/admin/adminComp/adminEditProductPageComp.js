import { Container, Row, Col, Form, Button, CloseButton, Table, Alert, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState, useEffect, Fragment, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { changeCategory, setMongoDbAttributesDetailsValue, setSpecificAttributeValue } from "./settings"

const onHover = {
  cursor: "pointer",
  position: "absolute",
  left: "5px",
  top: "-10px",
  transform: "scale(2.5)",
}

const AdminEditProductPageComp = ({ categories, fetchProduct, updateProductFromAdmin, dispatch, updateCategoryMongoDb, deleteProductFiles, uploadProductFiles, uploadFileRequest, uploadToCloudinary }) => {

  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({});
  const [updateProductResponseState, setUpdateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [mongoDbAttributes, setMongoDbAttributes] = useState([]);
  const [productAtrributesFromMongoDb, setProductAtrributesFromMongoDb] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Wybierz kategorie");
  const [keyForNewAttributes, setKeyForNewAttributes] = useState(false);
  const [valueForNewAttributes, setValueForNewAttributes] = useState(false);
  const [fileRemover, setFileRemover] = useState(false);
  const [fileUploader, setFileUploader] = useState("");
  const [succesUploaded, setSuccesUploaded] = useState(false);

  const attributeDetails = useRef(null);
  const attributeKey = useRef(null);
  const assignUniqueAttributeKey = useRef(null);
  const assignUniqueAttributeValue = useRef(null);



  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(id)
      .then((product) => setProduct(product))
      .catch((er) => console.log(er));
  }, [id, fileRemover, succesUploaded]);

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
      attributes: productAtrributesFromMongoDb,
    }

    if (event.currentTarget.checkValidity() === true) {
      updateProductFromAdmin(id, formInputs).then(data => {
        if (data.message === "Zaaktualizowano produkt!") navigate("/admin-produkty");
      }).catch((err) => setUpdateProductResponseState({ error: err.response.data.message ? err.response.data.message : err.response.data }));
    }

    setValidated(true);
  };

  useEffect(() => {
    let editedProductCategory = categories.find((item) => item.name === product.category);
    if (editedProductCategory) {
      const mainEditedProductCategory = editedProductCategory.name.split("/")[0];
      const mainEditedProductCategoryDetails = categories.find((editedProductCategory) => editedProductCategory.name === mainEditedProductCategory);
      if (
        mainEditedProductCategoryDetails &&
        mainEditedProductCategoryDetails.attributes.length > 0
      ) {
        setMongoDbAttributes(mainEditedProductCategoryDetails.attributes);
      }
    }
    setSelectedCategory(product.category)
    setProductAtrributesFromMongoDb(product.attributes);
  }, [product])

  const chosenValue = (e) => {
    if (e.target.value !== "Wybierz wartość") {
      setSpecificAttributeValue(attributeKey.current.value, e.target.value, setProductAtrributesFromMongoDb);
    }
  }

  const deleteAttributeItem = (key) => {
    setProductAtrributesFromMongoDb((list) => list.filter((item) => item.key !== key));
  }

  const controlKey = (e) => {
    if (e.code === "Enter" && "NumpadEnter") e.preventDefault();
    if (e.code === "NumpadEnter") e.preventDefault();
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


  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin-produkty" className="btn btn-info my-3">
            Powrót
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edytuj produkt</h1>

          <Form noValidate validated={validated} onSubmit={handleSubmit} onKeyDown={(e) => controlKey(e)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nazwa</Form.Label>
              <Form.Control name="name" required type="text" defaultValue={product.name} />
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
                defaultValue={product.description}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Ilość sztuk</Form.Label>
              <Form.Control name="count" required type="number" defaultValue={product.count} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Cena</Form.Label>
              <Form.Control name="price" required type="text" defaultValue={product.price} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>
                Kategoria
              </Form.Label>
              <Form.Select
                required
                name="category"
                aria-label="Examlpe"
                onChange={(e) => changeCategory(e, categories, setMongoDbAttributes, setSelectedCategory)}
              >
                <option value="Wybierz kategorie">Wybierz kategorie</option>
                {categories.map((category, index) => {
                  return product.category === category.name ? (
                    <option selected key={index} value={category.name}>
                      {category.name}
                    </option>
                  ) : (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            {mongoDbAttributes.length > 0 && (
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Wybierz atrybut i ustaw wartość</Form.Label>
                    <Form.Select name="atrrKey" aria-label="Default select example" ref={attributeKey}
                      onChange={(e) => setMongoDbAttributesDetailsValue(e, attributeDetails, mongoDbAttributes)}>
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
                    <Form.Select name="atrrVal" aria-label="Default select example" ref={attributeDetails} onChange={chosenValue}>
                      <option>Wybierz wartość atrybutu</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}



            <Row>
              {productAtrributesFromMongoDb && productAtrributesFromMongoDb.length > 0 && (
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
                        <td><CloseButton onClick={() => deleteAttributeItem(item.key)} /></td>
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
                  <Form.Control ref={assignUniqueAttributeKey} disabled={selectedCategory === "Wybierz kategorie"} placeholder="wybierz lub utwórz kategorię" name="newAttrKey"
                    type="text" onKeyUp={assignAttrKey} required={valueForNewAttributes} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttributeValue">
                  <Form.Label>Wartość atrybutu</Form.Label>
                  <Form.Control ref={assignUniqueAttributeValue} disabled={selectedCategory === "Wybierz kategorie"} placeholder="wybierz lub utwórz kategorię" required={keyForNewAttributes} name="newAttrValue"
                    type="text" onKeyUp={assignAttrValue} />
                </Form.Group>
              </Col>
            </Row>

            <Alert show={keyForNewAttributes && valueForNewAttributes} variant="primary">
              Zatwierdź klawiszem Enter
            </Alert>

            <Form.Group className="mb-3 mt-3" controlId="formBasicFile">
              <Form.Label>Zdjęcia</Form.Label>

              <Row>
                {product.images && product.images.map((image, index) => (
                  <Col key={index} style={{ position: "relative" }} xs={3}>
                    <Image crossOrigin="anonymous" src={image.path ?? null} fluid />
                    <i style={onHover} onClick={() => deleteProductFiles(image.path, id).then(data => setFileRemover(!fileRemover))} className="bi bi-x text-danger"></i>
                  </Col>
                ))}
              </Row>

              <Form.Control required type="file" multiple onChange={e => {
                setFileUploader("Przesyłanie plików..........");
                if (process.env.NODE_ENV !== "production") {
                  // EDYTOWAĆ !== ===
                  uploadFileRequest(e.target.files, id).then(data => {
                    setFileUploader("Pliki zostały przesłane!");
                    setSuccesUploaded(!succesUploaded);
                  }).catch((error) => setFileUploader(error.response.data.message ? error.response.data.message : error.response.data));
                } else {
                  uploadToCloudinary(e.target.files, id);
                  setFileUploader("Przesłano. Odśwież stronę!")
                  setTimeout(() => {
                    setSuccesUploaded(!succesUploaded);
                  }, 5000)
                }
              }} />
              {fileUploader}
            </Form.Group>
            <Button variant="primary" type="submit">
              Zaaktualizuj
            </Button>
            {updateProductResponseState.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};


export default AdminEditProductPageComp;