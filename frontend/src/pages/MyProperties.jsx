import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ImageCarousel from "../components/common/ImageCarousel";
import "./MyProperties.css";
import { useTranslation } from "react-i18next";

const MyProperties = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/properties/my-properties`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error cargando propiedades");
        }
        return res.json();
      })
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error cargando propiedades");
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p>{t("loading")} {t("properties")}...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="my-properties">
      <h1>{t("Mys")} {t("properties")}</h1>

      {properties.length === 0 && (
        <p>{t("anyPropertyCreated")}</p>
      )}

      {properties.map((property) => (
        <div key={property._id} className="my-property-card">
          {/* INFO */}
          <div className="my-property-info">
            <h3>{property.title}</h3>

            <p className="my-property-location">
              📌 {property.location.city}, {property.location.country}
            </p>

            <p className={`my-property-delete ${property.isActive ? "" : "inactive"}`}>
              {t("Available")} {t("for")} {t("booking")}:{" "}
              {property.isActive ? t("Yes") : t("No")}
            </p>

            <p className="my-property-price">
              {property.pricePerNight} € / {t("night")}
            </p>

            <div className="my-property-actions">
              <Link to={`/properties/${property._id}`}>{t("Watch")}</Link>
              <Link to={`/dashboard/my-properties/${property._id}/edit`}>
                {t("Edit")}
              </Link>
            </div>
          </div>

          {/* CAROUSEL */}
          {property.images?.length > 0 && (
            <div className="my-property-carousel-my-properties">
              <ImageCarousel images={property.images} />
            </div>
          )}
        </div>
      ))}

    </div>
  );
};

export default MyProperties;