import { useState, useEffect } from "react";
import styles from "../styles/Dropdown.module.css"; // Arquivo CSS modular

export default function EditableDecimalField({ placeholder, coluna, onChange, value }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || "0.00");  // Usa o valor passado por props ou o valor default

  const handleInputChange = (e) => {
    const newValue = e.target.value;

    // Se não houver ponto, garante que o valor tenha ao menos 1 ponto
    if (newValue.includes('.') && newValue.split('.').length > 2) {
      return; // Impede que mais de 1 ponto seja digitado
    }

    // Se o valor for vazio ou só consistir em números e ponto, faz a validação
    if (/^\d*\.?\d{0,2}$/.test(newValue)) {
      if (!newValue.includes('.')) {
        setInputValue(newValue + '.');  // Garante que o ponto esteja presente
      } else {
        setInputValue(newValue);
      }

      if (onChange) onChange(newValue); // Notifica o valor atualizado
    }
  };

  // Use o valor controlado que vem como prop
  useEffect(() => {
    setInputValue(value || "0.00"); // Atualiza o valor do campo sempre que a prop mudar
  }, [value]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className={styles.dropdownButton} // Reutiliza estilo do botão para manter aparência
        placeholder={placeholder}
      />
      {isOpen && (
        <div className={styles.dropdown}>
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item.value)}
              className={styles.dropdownItem}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
