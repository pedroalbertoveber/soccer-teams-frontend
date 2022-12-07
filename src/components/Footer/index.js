/* styles */
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div>
        <span><strong>FIFA</strong> - &copy; 2022</span>
      </div>
    </footer>
  );
};

export default Footer;