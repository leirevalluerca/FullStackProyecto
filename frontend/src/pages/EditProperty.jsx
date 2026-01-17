import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./EditProperty.css";
import { usePropertyFeatures } from "../hooks/usePropertyFeatures";
import { usePropertyImages } from "../hooks/usePropertyImages";
import { usePropertySubmit } from "../hooks/usePropertySubmit";

const EditProperty = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const {
    features,
    setFeatures,
    availableFeatures,
    handleFeatureChange,
  } = usePropertyFeatures();

  const {
    images: newImages,
    handleImageChange,
    removeImage,
  } = usePropertyImages();

  const { submit, error } = usePropertySubmit({
    url: `${import.meta.env.VITE_API_URL}/api/properties/${id}`,
    method: "PUT",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/properties/${id}`, {
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
        setLoadError("Error loading property");
        setLoading(false);
      });
  }, [id, navigate, token, setFeatures]);

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", property.title);
    formData.append("description", property.description);
    formData.append("pricePerNight", property.pricePerNight);
    formData.append("maxGuests", property.maxGuests);
    formData.append("features", JSON.stringify(features));

    newImages.forEach(img => formData.append("images", img));

    submit(formData);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/properties/${id}`,
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

  if (loading) return <p>{t("Loading")}...</p>;
  if (loadError) return <p className="error">{loadError}</p>;
  if (!property) return null;

  return (
    <div className="edit-property">
      <h1>{t("Edit")} {t("property")}</h1>

      <form className="edit-property-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="title"
            value={property.title}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>{t("Name")}</label>
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
          <label>{t("Description")}</label>
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
          <label>{t("Price")} {t("per")} {t("night")} (€)</label>
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

        <h4>{t("CurrentImages")}</h4>
        <div className="images-preview">
          {property.images.map((img, idx) => (
            <div key={idx} className="image-thumb">
              <img src={img} alt={`property-${idx}`} />
            </div>
          ))}
        </div>

        <h4>{t("Add")} {t("more")} {t("images")}</h4>
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
              <button type="button" onClick={() => removeImage(idx)}>✕</button>
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