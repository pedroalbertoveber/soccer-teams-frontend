/* styles */
import styles from "./Input.module.scss";

const Input = ({ text, name, type, placeholder, handleOnChange, value }) => {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{ text }:</label>
      <input type={type} name={name} placeholder={placeholder} onChange={handleOnChange} value={value} />
    </div>
  );
};

export default Input;