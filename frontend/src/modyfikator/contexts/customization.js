import { createContext, useContext, useState } from "react";

const chairColors = [
  {
    color: "#fafafa",
    name: "Biel",
  },
  {
    color: "#0a0a0a",
    name: "Czerń",
  },
  {
    color: "#575350",
    name: "Szary",
  },
  {
    color: "#c2b280",
    name: "Beż",
  },
  {
    color: "#6E4030",
    name: "Brąz",
  },
  {
    color: "#203b18",
    name: "Zieleń",
  },
  {
    color: "#4169E1",
    name: "Błękit",
  },
  {
    color: "#89229c",
    name: "Fiolet",
  },
  {
    color: "#cf3266",
    name: "Róż",
  },
  {
    color: "#f1fc4c",
    name: "Żółty",
  },
];

const interiorColors = [
  {
    color: "#fafafa",
    name: "Biel",
  },
  {
    color: "#0a0a0a",
    name: "Czerń",
  },
  {
    color: "#575350",
    name: "Szary",
  },
  {
    color: "#c2b280",
    name: "Beż",
  },
  {
    color: "#6E4030",
    name: "Brąz",
  },
  {
    color: "#203b18",
    name: "Zieleń",
  },
  {
    color: "#4169E1",
    name: "Błękit",
  },
  {
    color: "#89229c",
    name: "Fiolet",
  },
  {
    color: "#cf3266",
    name: "Róż",
  },
  {
    color: "#f1fc4c",
    name: "Żółty",
  },
];

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
  const [material, setMaterial] = useState("leather");
  const [legs, setLegs] = useState(1);
  const [chairColor, setChairColor] = useState(chairColors[0]);
  const [interiorColor, setInteriorColor] = useState(interiorColors[0]);

  return (
    <CustomizationContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  return context;
};
