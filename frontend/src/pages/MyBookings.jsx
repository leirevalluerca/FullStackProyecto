import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ImageCarousel from "../components/common/ImageCarousel";
import "./MyBookings.css";
import { useTranslation } from "react-i18next";

const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/bookings/my-bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error cargando las reservas");
        setLoading(false);
      });
  }, [navigate]);

  const handleCancel = async (bookingId) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("¿Seguro que quieres cancelar esta reserva?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Error cancelando la reserva");
        return;
      }

      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
    } catch {
      setError("Error de conexión");
    }
  };

  if (loading) return <p>{t("Loading")} {t("bookings")}...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="my-bookings">
      <h1>{t("Mys")} {t("bookings")}</h1>

      {bookings.length === 0 && <p>{t("noBookings")}.</p>}

      {bookings.map((booking) => {
        const property = booking.property;

        return (
          <div key={booking._id} className="mybooking-card">
            {/* INFO IZQUIERDA */}
            <div className="mybooking-info">
              <h3 className="mybooking-title">
                {property?.title || "🏠 Propiedad eliminada"}
              </h3>

              {property ? (
                <>
                  <p className="mybooking-location">
                    📌 {property.location.city}, {property.location.country}
                  </p>

                  <p className="mybooking-owner">
                    {t("hostedBy")}{" "}
                    <strong>{property.owner?.username}</strong>
                  </p>
                </>
              ) : (
                <p className="mybooking-warning">
                  ⚠️ Esta propiedad ya no existe
                </p>
              )}

              <p className="mybooking-dates">
                {new Date(booking.checkIn).toLocaleDateString()} –{" "}
                {new Date(booking.checkOut).toLocaleDateString()}
              </p>

              <p className="mybooking-price">
                Total: <strong>{booking.totalPrice} €</strong>
              </p>

              <div className="mybooking-status-row">
                <span className={`mybooking-status ${booking.status}`}>
                  {t("Status")}: {booking.status}
                </span>

                {booking.status !== "cancelled" && (
                  <button
                    className="mybooking-cancel"
                    onClick={() => handleCancel(booking._id)}
                  >
                    {t("Cancel")} {t("booking")}
                  </button>
                )}
              </div>
            </div>

            {/* IMAGEN DERECHA */}
            {property?.images?.length > 0 && (
              <div className="mybooking-carousel">
                <ImageCarousel images={property.images} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyBookings;