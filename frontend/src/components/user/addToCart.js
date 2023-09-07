import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const AddToCart = ({ showCartMessage, setShowCartMessage }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  return (
    <Alert show={showCartMessage} variant="success" onClose={() => setShowCartMessage(false)} dismissible>
      <Alert.Heading>Produkt został dodany do koszyka.</Alert.Heading>
      <p>
        <Button variant='success' onClick={goBack}>Kupuj dalej</Button>{" "}
        <Link to="/koszyk">
          <Button variant='danger'>Idź do koszyka</Button>
        </Link>

      </p>
    </Alert>
  );

}

export default AddToCart