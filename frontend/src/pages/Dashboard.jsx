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
    <div>
      <h1>{t("dashboard")}</h1>

      <p>{t("welcome")}, {user.username}</p>

      <UserProfile user={user} />
      <hr />
      
      <button onClick={logout}>{t("logout")}</button>

      <nav>
        <ul>
          <li>
            <Link to="/properties">{t("View")} {t("properties")}</Link>
          </li>
          <li>
            <Link to="/dashboard/my-bookings">{t("Mys")} {t("bookings")}</Link>
          </li>
          <li>
            <Link to="/dashboard/my-properties/new">{t("New")} {t("property")}</Link>
          </li>
          <Link to="/dashboard/my-properties"> {t("Mys")} {t("properties")} </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;