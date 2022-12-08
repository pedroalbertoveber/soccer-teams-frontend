/* styles */
import styles from "./Select.module.scss";


const Select = ({ text, name, list, handleOnChange, value }) => {
  return(
    <div className={styles.selectControl}>
      <label htmlFor={name}>{ text }:</label>
      <select name={name} id={name} onChange={handleOnChange} value={value || ""}>
        { list.map((item) => (
          <option value={item.name} key={item.id}>{ item.name }</option>
        ))}
      </select>
    </div>
  );
};

export default Select;