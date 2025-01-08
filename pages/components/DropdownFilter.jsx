import { useState } from "react";
import styles from "../styles/Dropdown.module.css"; // Arquivo CSS modular

export default function DropdownFilter(props) {
  const [isOpen, setIsOpen] = useState(false); // Controle de abertura do dropdown
  const [selectedItem, setSelectedItem] = useState(null); // Item selecionado
  const items = ["Alice", "Bob", "Charlie", "David", "Eve"]; // Lista de itens

  const handleSelect = (item) => {
    setSelectedItem(item); // Define o item selecionado
    setIsOpen(false); // Fecha o dropdown
  };

  return (
    <div className={styles.container}>
      {/* Elemento principal */}
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedItem ? selectedItem : props.placeholder}
      </button>
      {/* Dropdown */}
      {isOpen && (
        <ul className={styles.dropdown}>
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className={styles.dropdownItem}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
