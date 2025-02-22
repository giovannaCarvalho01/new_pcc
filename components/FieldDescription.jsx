import styles from "../styles/FieldDescription.module.css"; // Importação do CSS modular

export default function FieldDescription({ description, ativo, info }) {
  return (
    <div className={styles.fieldDescriptionContainer}>
      <h4 className={styles.fieldLabel}>
        {description}
        {/* Condicionalmente exibe o ícone "i" apenas se ativo for true */}
        {ativo && (
          <i className={styles.infoIcon} title={info}>
            i
          </i>
        )}
      </h4>
    </div>
  );
}
