import { Navigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import "./Dashboard.css";
import UserProfile from "../components/common/UserProfile";

const Dashboard = () => {
  const { user, loading, logout } = useAuth();
  const { t } = useTranslation();

  // Mientras se comprueba el token
  if (loading) {
    return <p>{t("loading")}...</p>;
  }

  // Si no hay usuario volvemos a login
  if (!user) {
    return <Navigate to="/login"/>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <h1>{t("dashboard")}</h1>

        <UserProfile user={user} />

        <button onClick={logout} className="logout-btn">
          {t("logout")}
        </button>
      </div>

      <nav className="dashboard-nav">
        <Link to="/properties">
          {t("View")} {t("properties")}
        </Link>

        <Link to="/dashboard/my-bookings">
          {t("Mys")} {t("bookings")}
        </Link>

        <Link to="/dashboard/my-properties/new">
          {t("New")} {t("property")}
        </Link>

        <Link to="/dashboard/my-properties">
          {t("Mys")} {t("properties")}
        </Link>
      </nav>
    </div>
  );

};

export default Dashboard;