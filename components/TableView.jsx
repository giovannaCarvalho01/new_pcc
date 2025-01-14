import { useEffect, useState } from "react";
import styles from "../styles/TableView.module.css"; // Importe o módulo CSS

export default function TableView({ filters }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Apenas gera dados se filtros estiverem aplicados
    if (filters) {
      const generatedData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        value: Math.floor(Math.random() * 100),
      }));
      setData(generatedData);
    }
  }, [filters]); // Recarrega os dados toda vez que os filtros mudarem

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.value}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
