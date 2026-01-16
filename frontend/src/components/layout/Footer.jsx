import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoUaR from "../../assets/UaR-LOGO.png";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Logo y slogan */}
        <div className="footer-section footer-brand">
          <img src={logoUaR} alt="Under a Roof" className="footer-logo" />
        </div>

        {/* Contacto */}
        <div className="footer-section">
          <h3 className="footer-title">{t("contact")}</h3>
          <ul className="footer-links">
            <li><a href="mailto:info@underaroof.com">info@underaroof.com</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} Under a Roof. {t("rights")}</p>
      </div>
    </footer>
  );
};

export default Footer;