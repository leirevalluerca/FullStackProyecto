import { useEffect, useState } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import ImageCarousel from "../components/common/ImageCarousel";
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/properties/${id}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!property) return <p>Property not found</p>;

  const nights =
    checkIn && checkOut
      ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
      : 0;

  const totalPrice = nights * property.pricePerNight;

  const handleBooking = async () => {
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", {
        state: { from: `/properties/${property._id}` } // el estado sirve para después de hacer login volver a la misma
      });
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyId: property._id,
          checkIn,
          checkOut,
          totalPrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || data.error || "Error creando reserva");
        return;
      }

      alert("Reserva confirmada!");
      setCheckIn("");
      setCheckOut("");
    } catch (err) {
      setError("Error de conexión");
    }
  };

  return (
    <div className="property-detail">
      <div className="property-heading">
        <h1>{property.title}</h1>
        <p>{property.location.address}, {property.location.city}, {property.location.country}</p>
      </div>

      <div className="property-content">
        
        {/* IZQUIERDA: Carrusel */}
        <div className="property-carousel">
          <ImageCarousel images={property.images} />
        </div>

        {/* DERECHA: Caja de reserva */}
        <div className="booking-box">
          <div className="booking-inputs">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <p className="booking-info"> maxGuests: {property.maxGuests}</p>

          {nights > 0 && (
            <p className="booking-info">
              Total: <strong>{totalPrice} €</strong> ({nights} noches)
            </p>
          )}

          {error && <p className="booking-error">{error}</p>}

          <button
            disabled={!checkIn || !checkOut}
            onClick={handleBooking}
          >
            Reservar
          </button>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetail;