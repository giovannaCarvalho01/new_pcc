import styles from "../styles/ButtonFilter.module.css"; // Importe o módulo CSS

// components/ButtonFilter.js
export default function ButtonFilter({ isFormValid, onClick }) {
    return (
      <button
        className={`btnFiltrar ${!isFormValid ? "disabled" : ""}`}
        onClick={onClick}
        disabled={!isFormValid}
      >
        Filtrar
      </button>
    );
  }
  