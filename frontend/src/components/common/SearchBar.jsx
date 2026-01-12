import { useState } from "react";
import "./SearchBar.css";
import { useTranslation } from "react-i18next";

const SearchBar = ({ onSearch }) => {
  const { t } = useTranslation();

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();

    onSearch({
      city: location,
      checkIn,
      checkOut,
      maxGuests: guests
    });
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder={t("whereAreYouGoing")}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        required
      />

      <input
        type="date"
        value={checkOut}
        min={checkIn}
        onChange={(e) => setCheckOut(e.target.value)}
        required
      />

      <input
        type="number"
        min="1"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />

      <button type="submit">{t("search")}</button>
    </form>
  );
};

export default SearchBar;