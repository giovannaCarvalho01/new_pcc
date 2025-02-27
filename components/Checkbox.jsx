import { useState } from "react";
import styles from "../styles/Checkbox.module.css";


export default function Checkbox({ label, onChange, checked = false }) {
    const [isChecked, setIsChecked] = useState(checked);
  
    const handleCheckboxChange = (e) => {
      setIsChecked(e.target.checked);
      if (onChange) {
        onChange(e.target.checked);
      }
    };
  
    return (
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={styles.checkboxInput}
        />
        <span className={styles.checkboxLabelText}>{label}</span>
      </label>
    );
  }
