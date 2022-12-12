/* styles */
import styles from "./ImageDefault.module.scss";

const ImageDefault = ({ path, size, alt, emblem }) => {

  let width;
  let height;

  const teamEmblem = emblem;

  if(emblem) {
    if (size === "small") {
      width = 150;
    } else if (size === "medium") {
      width = 180;
    } else if (size === "large") {
      width = 320;
    }
  } else {
    if (size === "small") {
      width = 150;
      height = 200;
    } else if (size === "medium") {
      width = 180;
      height = 240;
    } else if (size === "large") {
      width = 210;
      height = 280;
    }
  }

  return (
    <>
    {teamEmblem ? (
    <figure className={styles.image}>
      <img src={path} alt={alt} style={{ width: `${width}px`, height: `${width}px` }} />
    </figure>
    ) : (
    <figure className={styles.image}>
      <img src={path} alt={alt} style={{ width: `${width}px`, height: `${height}px` }} />
    </figure>
    )}
    </>
  );
};

export default ImageDefault;