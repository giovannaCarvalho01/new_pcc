import { useState, useEffect } from "react";
import styles from "../styles/Dropdown.module.css"; // Arquivo CSS modular

export default function EditableDecimalField({ placeholder, coluna, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("0.00"); // Valor inicial padrão para o alfa
  const [items, setItems] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
  
    // Se não houver ponto, garante que o valor tenha ao menos 1 ponto
    if (value.includes('.') && value.split('.').length > 2) {
      return; // Impede que mais de 1 ponto seja digitado
    }
  
    // Se o valor for vazio ou só consistir em números e ponto, faz a validação
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      if (!value.includes('.')) {
        setInputValue(value + '.');  // Garante que o ponto esteja presente
      } else {
        setInputValue(value);
      }
  
      if (onChange) onChange(value); // Notifica o valor atualizado
    }
  };
  
  

  const handleSelect = (value) => {
    setInputValue(value);
    setIsOpen(false);
    if (onChange) onChange(value); // Notifica o valor selecionado
  };

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
