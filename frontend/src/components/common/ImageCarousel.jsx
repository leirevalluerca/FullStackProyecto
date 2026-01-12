import { useState } from "react";
import "./ImageCarousel.css";

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return (
      <img
        src="/placeholder.jpg"
        alt="No image"
        className="carousel-image"
      />
    );
  }

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="carousel">
      <button className="carousel-btn left" onClick={prevImage}>
        ‹
      </button>

      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/${images[currentIndex]}`}
        alt={`Property image ${currentIndex + 1}`}
        className="carousel-image"
      />

      <button className="carousel-btn right" onClick={nextImage}>
        ›
      </button>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;