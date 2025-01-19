import styles from "../styles/ButtonFilter.module.css"; // Importe o módulo CSS

// components/ButtonFilter.js
export default function ButtonFilter({ isFormValid, onClick }) {
  return (
    <button
      className={`${styles.btnFiltrar} ${!isFormValid ? styles.disabled : ""}`} // Use 'styles' para acessar as classes
      onClick={onClick}
      disabled={!isFormValid}
    >
      Filtrar
    </button>
  );
}
