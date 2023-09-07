import { useCustomization } from "../contexts/customization";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

const EditorPanel = () => {
  const {
    material,
    setMaterial,
    legs,
    setLegs,
    chairColors,
    chairColor,
    setChairColor,
    interiorColors,
    interiorColor,
    setInteriorColor,
  } = useCustomization();

  return (
    <div className="editor">
      <div className="editor__section">
        <div className="editor__section__title">Materiał obicia</div>
        <div className="editor__section__values">
          <div
            className={`item ${material === "leather" ? "item--active" : ""}`}
            onClick={() => setMaterial("leather")}
          >
            <div className="item__label">Skóra</div>
          </div>
          <div
            className={`item ${material === "fabric" ? "item--active" : ""}`}
            onClick={() => setMaterial("fabric")}
          >
            <div className="item__label">Tkanina</div>
          </div>
        </div>
      </div>
      <div className="editor__section">
        <div className="editor__section__title">Kolor obicia</div>
        <div className="editor__section__values">
          {chairColors.map((item, index) => (
            <div
              key={index}
              className={`item ${item.color === chairColor.color ? "item--active" : ""
                }`}
              onClick={() => setChairColor(item)}
            >
              <div
                className="item__dot"
                style={{ backgroundColor: item.color }}
              />
              <div className="item__label">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="editor__section">
        <div className="editor__section__title">Kolor wnętrza</div>
        <div className="editor__section__values">
          {interiorColors.map((item, index) => (
            <div
              key={index}
              className={`item ${item.color === interiorColor.color ? "item--active" : ""
                }`}
              onClick={() => setInteriorColor(item)}
            >
              <div
                className="item__dot"
                style={{ backgroundColor: item.color }}
              />
              <div className="item__label">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="editor__section">
        <div className="editor__section__title">Nogi</div>
        <div className="editor__section__values">
          <div
            className={`item ${legs === 1 ? "item--active" : ""}`}
            onClick={() => setLegs(1)}
          >
            <div className="item__label">Modernistyczne</div>
          </div>
          <div
            className={`item ${legs === 2 ? "item--active" : ""}`}
            onClick={() => setLegs(2)}
          >
            <div className="item__label">Klasyczne</div>
          </div>
        </div>
        {/* <LinkContainer>
        </LinkContainer> */}
        <Button variant="secondary">Zapisz</Button>
      </div>
    </div>
  );
};

export default EditorPanel;
