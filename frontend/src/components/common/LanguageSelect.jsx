import { useTranslation } from "react-i18next";
import './LanguageSelect.css';

function LanguageSelect() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      className="language-select"
    >
      <option value="es">ES</option>
      <option value="en">EN</option>
    </select>
  );
}

export default LanguageSelect;