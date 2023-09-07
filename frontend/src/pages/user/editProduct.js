import { Canvas } from "@react-three/fiber";
import "../../modyfikator/ediotr.css"
import Experiance from "../../modyfikator/comp/experiance";
import EditorPanel from "../../modyfikator/comp/editorPanel";
import { CustomizationProvider } from "../../modyfikator/contexts/customization";

const EditProduct = () => {

  const myEdistStyle = {
    padding: "0px",
    height: "1000px",
    width: "1900px"
  };

  return (
    <CustomizationProvider>
      <div style={myEdistStyle} clasName="editProduct">
        <Canvas className="canvasEditor">
          <color attach="background" args={['#101010']} />
          <fog attach="fog" args={['#101010', 10, 20]} />
          <Experiance />
        </Canvas>
        <EditorPanel />
      </div>
    </CustomizationProvider>
  );
}

export default EditProduct;