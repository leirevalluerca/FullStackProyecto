import { useRef, useState } from "react";
import "./PropertyCreateNew.css";

const PropertyCreateNew = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const addressRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const priceRef = useRef();
  const maxGuestRef = useRef();
  const [features, setFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const availableFeatures = [
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

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFeatures(prev =>
      checked ? [...prev, value] : prev.filter(f => f !== value)
    );
  };

  // FUNCIÓN PARA SUBIR IMAGENES 
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // convertimos FileList en array
    setImages(prev => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("location[address]", addressRef.current.value);
    formData.append("location[country]", countryRef.current.value);
    formData.append("location[city]", cityRef.current.value);
    formData.append("maxGuests", maxGuestRef.current.value);
    formData.append("pricePerNight", priceRef.current.value);
    formData.append("features", JSON.stringify(features));


    images.forEach((img) => formData.append("images", img)); // enviamos todos los archivos

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/properties`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) setError(data.message || "Error creating property");
      else alert("Property created!");
    } catch (err) {
      setError("Server error. Please try again later.");
    }
};


  return (
    <div className="create-property-page">
      <form className="create-property-card" onSubmit={handleSubmit}>
        <h2>Create new property</h2>

        <div className="form-group">
          <input ref={titleRef} required placeholder=" " />
          <label>Title</label>
        </div>

        <div className="form-group">
          <textarea ref={descriptionRef} rows={4} required placeholder=" " />
          <label>Description</label>
        </div>


        <div className="form-group">
          <input ref={addressRef} required placeholder=" " />
          <label>Address</label>
        </div>
        
        <div className="form-group">
          <input ref={countryRef} required placeholder=" " />
          <label>Country</label>
        </div>

        <div className="form-group">
          <input ref={cityRef} required placeholder=" " />
          <label>City</label>
        </div>

        <div className="form-group">
          <input ref={maxGuestRef} required placeholder=" " />
          <label>Max guests</label>
        </div>

        <div className="form-group">
          <input ref={priceRef} required placeholder=" " />
          <label>Price per night (€)</label>
        </div>

        <div className="features-section">
          <h4>Features</h4>
          <div className="features-grid">
            {availableFeatures.map(f => (
              <label key={f} className="feature-item">
                <input
                  type="checkbox"
                  value={f}
                  onChange={handleFeatureChange}
                />
                {f}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <h4>Property Images</h4>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="images-preview">
            {images.map((img, idx) => (
              <div key={idx} className="image-thumb">
                <img src={URL.createObjectURL(img)} alt={`preview-${idx}`} />
              </div>
            ))}
          </div>
        </div>


        {error && <p className="error">{error}</p>}

        <button type="submit" className="submit-btn">
          Create Property
        </button>
      </form>
    </div>
  );
};

export default PropertyCreateNew;