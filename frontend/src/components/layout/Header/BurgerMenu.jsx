import { Link, useNavigate } from "react-router-dom";
import LanguajeSelect from "../../common/LanguageSelect";
import "./BurgerMenu.css";
import { useTranslation } from "react-i18next";

const BurgerMenu = ({ isOpen, closeMenu, user, logout }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
        closeMenu();
        navigate("/login");
    };

    return (
        <div className={`burger-menu ${isOpen ? "open" : ""}`}>
            <LanguajeSelect />

            {!user ? (
                <>
                    <Link to="/login" onClick={closeMenu}>
                        {t("login")}
                    </Link>
                    <Link to="/register" onClick={closeMenu}>
                        {t("register")}
                    </Link>
                </>
            ) : (
                <button className="logout-btn" onClick={handleLogout}>
                    {t("logout")}
                </button>
            )}
        </div>
    );
};

export default BurgerMenu;