import { useState } from "react";

const AVAILABLE_FEATURES = [
  "terraza",
  "baño privado",
  "piscina",
  "desayuno incluido",
  "aire acondicionado",
  "calefacción",
  "wifi",
  "parking",
  "vista al mar",
  "mascotas permitidas",
  "televisión",
  "servicio de limpieza",
];

export const usePropertyFeatures = (initialFeatures = []) => {
  const [features, setFeatures] = useState(initialFeatures);

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFeatures(prev =>
      checked ? [...prev, value] : prev.filter(f => f !== value)
    );
  };

  return {
    features,
    setFeatures,
    availableFeatures: AVAILABLE_FEATURES,
    handleFeatureChange,
  };
};