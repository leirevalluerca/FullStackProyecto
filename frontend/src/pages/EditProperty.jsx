import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./EditProperty.css";

const EditProperty = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [property, setProperty] = useState(null);
  const [features, setFeatures] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);
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

  /* =====================
     LOAD PROPERTY
  ====================== */
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/properties/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setProperty(data);
        setFeatures(data.features || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Error loading property");
        setLoading(false);
      });
  }, [id, navigate, token]);

  /* =====================
     HANDLERS
  ====================== */
  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFeatures(prev =>
      checked ? [...prev, value] : prev.filter(f => f !== value)
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(prev => [...prev, ...files]);
  };

  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  /* =====================
     SUBMIT
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();

    formData.append("title", property.title);
    formData.append("description", property.description);
    formData.append("pricePerNight", property.pricePerNight);
    formData.append("maxGuests", property.maxGuests);
    formData.append("features", JSON.stringify(features));

    newImages.forEach(img => {
      formData.append("images", img);
    });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/properties/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error();
      navigate("/dashboard/my-properties");
    } catch {
      setError("Error updating property");
    }
  };

  /* =====================
     DELETE PROPERTY
  ====================== */
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/properties/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error();
      navigate("/dashboard/my-properties");
    } catch {
      alert("Error deleting property");
    }
  };

  /* =====================
     RENDER
  ====================== */
  if (loading) return <p>{t("Loading")} ...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!property) return null;

  return (
    <div className="edit-property">
      <h1>{t("Edit")} {t("property")} </h1>

      <form className="edit-property-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="title"
            value={property.title}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label> {t("Name")} </label>
        </div>

        <div className="form-group">
          <textarea
            name="description"
            value={property.description}
            onChange={handleChange}
            rows={4}
            required
            placeholder=" "
          />
          <label> {t("Description")} </label>
        </div>

        <div className="form-group">
          <input
            name="maxGuests"
            value={property.maxGuests}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Max. {t("guest")}</label>
        </div>

        <div className="form-group">
          <input
            name="pricePerNight"
            value={property.pricePerNight}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label> {t("Price")} {t("per")} {t("night")} (€)</label>
        </div>

        <div className="features-section">
          <h4>{t("Features")}</h4>
          <div className="features-grid">
            {availableFeatures.map(f => (
              <label key={f} className="feature-item">
                <input
                  type="checkbox"
                  value={f}
                  checked={features.includes(f)}
                  onChange={handleFeatureChange}
                />
                {f}
              </label>
            ))}
          </div>
        </div>

        <h4> {t("CurrentImages")} </h4>
        <div className="images-preview">
          {property.images.map((img, idx) => (
            <div key={idx} className="image-thumb">
              <img src={img} alt={`property-${idx}`} />
            </div>
          ))}
        </div>

        <h4> {t("Add")} {t("more")} {t("images")} </h4>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />

        <div className="images-preview">
          {newImages.map((img, idx) => (
            <div key={idx} className="image-thumb">
              <img src={URL.createObjectURL(img)} alt={`new-${idx}`} />
              <button type="button" onClick={() => removeNewImage(idx)}>
                ✕
              </button>
            </div>
          ))}
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="submit-btn">
            {t("Save")} {t("changes")} 
        </button>
      </form>

      <button className="delete-property-btn" onClick={handleDelete}>
          {t("Delete")} {t("property")} 
      </button>
    </div>
  );
};

export default EditProperty;