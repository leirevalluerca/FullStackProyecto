import "./UserProfile.css";
import { useTranslation } from "react-i18next";

const UserProfile = ({ user }) => {
    
    const { t } = useTranslation();
    if (!user) return null;

    return (
        <div className="user-profile">
        <h2>{t("My")} {t("profile")}</h2>

        <ul className="user-profile__list">
            <li><strong>{t("Username")}:</strong> {user.username}</li>
            <li><strong>{t("Name")}:</strong> {user.name}</li>
            <li><strong>{t("Surname")}:</strong> {user.surname}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li>
            <strong>{t("Birthdate")}:</strong>{" "}
            {new Date(user.birthdate).toLocaleDateString()}
            </li>
            <li>
            <strong>{t("Host")}:</strong> {user.isHost ? "Yes" : "No"}
            </li>
            <li>
            <strong>{t("Account")} {t("created")}:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
            </li>
        </ul>
        </div>
    );
};

export default UserProfile;