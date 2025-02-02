import { useState } from "react";
import styles from "../styles/FilterText.module.css"; // Importe o módulo CSS
import { FaEraser } from 'react-icons/fa'; // Importa o ícone de lixeira do react-icons

export default function FilterText(props) {
  const [searchTerm, setSearchTerm] = useState(""); // Entrada do usuário
  const [selectedItem, setSelectedItem] = useState(null); // Item selecionado
  const [isFocused, setIsFocused] = useState(false); // Controle de foco

  // Filtrar itens com base na entrada
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Quando o usuário seleciona um item
  const handleSelect = (item) => {
    setSelectedItem(item); // Define o item selecionado
    setSearchTerm(item); // Atualiza o valor do input com o item selecionado
    setIsFocused(false); // Fecha a lista
  };

  // Função para limpar o campo e resetar o item selecionado
  const handleClear = () => {
    setSelectedItem(null); // Limpa o item selecionado
    setSearchTerm(""); // Limpa o campo de entrada
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={selectedItem || searchTerm} // Exibe o valor selecionado ou o termo de pesquisa
          placeholder={!selectedItem ? props.placeholder : ""} // Exibe o placeholder somente se nenhum item foi selecionado
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
          onFocus={() => setIsFocused(true)} // Foca no campo de entrada
          onBlur={() => setTimeout(() => setIsFocused(false), 150)} // Fecha a lista após clicar
          className={styles.input}
        />
        {/* Ícone de borracha ao lado do input */}
        <FaEraser className={styles.clearIcon} onClick={handleClear} />
      </div>

      {isFocused && filteredItems.length > 0 && (
        <ul className={styles.dropdown}>
          {filteredItems.map((item, index) => (
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
