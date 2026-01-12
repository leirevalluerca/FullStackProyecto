import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./MyProperties.css";

const MyProperties = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/properties/my-properties`, {
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

  if (loading) return <p>Cargando propiedades...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="my-properties">
      <h1>Mis propiedades</h1>

      {properties.length === 0 && (
        <p>No has creado ninguna propiedad todavía</p>
      )}

      {properties.map((property) => (
        <div key={property._id} className="property-card">
          {property.images?.length > 0 && (
            <img
              src={property.images[0]}
              alt={property.title}
              className="property-image"
            />
          )}

          <div className="property-info">
            <h3>{property.title}</h3>

            <p>
              {property.location.city}, {property.location.country}
            </p>

            <p>{property.pricePerNight} € / noche</p>

            <div className="property-actions">
              <Link to={`/properties/${property._id}`}>
                Ver
              </Link>

              <Link to={`/dashboard/my-properties/${property._id}/edit`}>
                Editar
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProperties;