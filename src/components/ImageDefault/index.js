/* styles */
import styles from "./ImageDefault.module.scss";

const ImageDefault = ({ path, size, alt }) => {

  let width;
  let height;

  if (size == "small") {
    width = 150;
    height = 200;
  } else if (size == "medium") {
    width = 180;
    height = 240;
  } else if (size == "large") {
    width = 210;
    height = 280;
  }

  return (
    <figure className={styles.image}>
      <img src={path} alt={alt} style={{ width: `${width}px`, height: `${height}px` }} />
    </figure>
  );
};

export default ImageDefault;