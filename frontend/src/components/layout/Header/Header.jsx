import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import logoUaR from "../../../assets/UaR-LOGO.png";
import LanguajeSelect from "../../common/LanguageSelect";
import { useTranslation } from "react-i18next";
import BurgerButton from "./BurgerButton";
import BurgerMenu from "./BurgerMenu";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) return null;

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo-link">
          <img src={logoUaR} alt="logoUaR" className="logo" />
        </Link>

        <div className="desktop-only">
          {!user ? (
            <>
              <Link to="/login" className="nav-links">{t("login")}</Link>
              <Link to="/register" className="nav-links">{t("register")}</Link>
              
            </>
          ) : (
            <>
              <Link to="/dashboard" className="username-link">{user.username}</Link>
              <button
                className="logout-btn"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                {t("logout")}
              </button>
            </>
            
          )}
          <div className="language-link">
                <LanguajeSelect/>
              </div>
        </div>

        <BurgerButton
          isOpen={menuOpen}
          toggle={() => setMenuOpen(!menuOpen)}
        />

        <BurgerMenu
          isOpen={menuOpen}
          closeMenu={() => setMenuOpen(false)}
          user={user}
          logout={logout}
        />
      </nav>
    </header>
  );
};

export default Header;