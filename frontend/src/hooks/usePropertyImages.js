import { useState } from "react";

const usePropertyImages = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return {
    images,
    setImages,
    handleImageChange,
    removeImage,
  };
};

export default usePropertyImages