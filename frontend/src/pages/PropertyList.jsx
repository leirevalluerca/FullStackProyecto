import { useEffect, useState } from "react";
import SearchBar from "../components/common/SearchBar";
import ImageCarousel from "../components/common/ImageCarousel";
import { Link } from "react-router-dom";
import "./PropertyList.css";
import { useTranslation } from "react-i18next";

const AVAILABLE_FEATURES = [
    "wifi",
    "aire acondicionado",
    "piscina",
    "terraza",
    "parking",
    "baño privado",
    "desayuno incluido",
    "mascotas permitidas",
    "cocina",
    "lavadora",
    "calefacción",
    "tv"
];

const PropertiesList = () => {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  useEffect(() => {
    let url = `${import.meta.env.VITE_API_URL}/properties`;
    const query = new URLSearchParams();

    if (searchParams?.city) {
      query.append("city", searchParams.city);
    }

    if (searchParams?.checkIn && searchParams?.checkOut) {
      query.append("checkIn", searchParams.checkIn);
      query.append("checkOut", searchParams.checkOut);
    }

    if (searchParams?.maxGuests) {
      query.append("maxGuests", searchParams.maxGuests);
    }

    if (selectedFeatures.length > 0) {
      query.append("features", selectedFeatures.join(","));
    }

    if ([...query].length > 0) {
      url += `?${query.toString()}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => setProperties(data));

  }, [searchParams, selectedFeatures]);

  const toggleFeature = (feature) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div className="properties-page">
      <SearchBar onSearch={handleSearch} />

      <div className="properties-layout">
        {/* FILTER SIDEBAR */}
        <aside className="features">
          <h3>Features</h3>
          {AVAILABLE_FEATURES.map(feature => (
            <label key={feature} className="filter-item">
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature)}
                onChange={() => toggleFeature(feature)}
              />
              {feature}
            </label>
          ))}
        </aside>

        {/* PROPERTY LIST */}
        <section className="properties-list">
          {properties.map(property => (
            <div className="property-card" key={property._id}>
              <div className="carrousel-proterties-list">
                <ImageCarousel images={property.images} />
              </div>

              <div className="property-info">
                <h3 className="property-title">
                  <Link to={`/properties/${property._id}`}>
                    {property.title}
                  </Link>
                </h3>
                <p className="property-location">
                  {property.location.city}, {property.location.country}
                </p>
                <p className="property-owner">
                  {t("hostedBy")} <strong>{property.owner?.username}</strong>
                </p>
              </div>

              <div className="property-price">
                <span>{property.pricePerNight} €</span>
                <small>/ {t("night")}</small>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default PropertiesList;