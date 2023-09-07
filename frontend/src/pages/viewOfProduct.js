import { Container } from "react-bootstrap";

import ComputerCanvas from "../../src/pages/user/computers";

const ViewOfProduct = () => {

  const mystyle = {
    padding: "0px",
    height: "1000px",
    width: "1200px"
  };

  return (
    <>
      <Container>
        <div style={mystyle} id="zero">
          <ComputerCanvas />
        </div>
      </Container>
    </>

  );
};

export default ViewOfProduct