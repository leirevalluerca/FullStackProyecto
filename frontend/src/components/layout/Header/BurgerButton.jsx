import "./BurgerButton.css";

const BurgerButton = ({ isOpen, toggle }) => {
    return (
        <button
            className="burger"
            onClick={toggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
        >
            {isOpen ? "✕" : "☰"}
        </button>
    );
};

export default BurgerButton;