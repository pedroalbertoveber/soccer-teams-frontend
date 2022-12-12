/* external modules */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* assets */
import Logo from "assets/img/logo.png";

/* contexts */
import { AuthContext } from "context/AuthContext";

/* icons */
import { BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

/* styles */
import styles from "./Header.module.scss";

const Header = () => {

  const [ isOpenMenu, setIsOpenMenu ] = useState(false);
  const { isLogged, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
    <header className={styles.headerContainer}>
      <div className={styles.container}>
        <nav className={styles.mainNavBar}>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            {isLogged &&  
            <>
            <li onClick={logOut}>
              LogOut
            </li>
            <li>
              <Link to={"/teams/myteam"}>Meu Time</Link>
            </li>
            </>           
            }
          </ul>
        </nav>
        <figure>
          <img src={Logo} alt="Logo tipo FIFA"/>
        </figure>
        <nav className={styles.navBar}>
          <ul>
            <li>
              <Link to={"/teams"}>Clubes</Link>
            </li>
            {isLogged ? (            
            <>
              <li>
                <Link to={"/players/myplayers"}>Jogadores</Link>
              </li>
              <li>
                <Link to={"/players/loanrequests"}>Empréstimos</Link>
              </li>
            </>
            ) : (
            <>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/register"}>Registrar</Link>
              </li>
            </>
            )}
          </ul>
        </nav>
        <div className={styles.toggleMenu} onClick={() => setIsOpenMenu(!isOpenMenu)}>
          {isOpenMenu ? <CgClose color={"#fff"} size={32}/> : <BiMenu color={"#fff"} size={32}/> }
        </div>
      </div>
    </header>
    { isOpenMenu && (
      <nav className={styles.mobileMenu}>
        <ul>
          <li onClick={() => {
            setIsOpenMenu(false);
            navigate("/");
          }}>
            Home
          </li>
          <li onClick={() => {
            setIsOpenMenu(false);
            navigate("/teams");
          }}>
            Clubes
          </li>
          {isLogged ? (
            <>
              <li onClick={() => {
                setIsOpenMenu(false);
                navigate("/players/myplayers");
              }}>
                Jogadores
              </li>
              <li onClick={() => {
                setIsOpenMenu(false);
                navigate("/teams/myteam");
              }}>
                Meu Time
              </li>
              <li onClick={() => {
                setIsOpenMenu(false);
                navigate("/players/loanrequests");
              }}>
                Empréstimos
              </li>
              <li onClick={() => {
                setIsOpenMenu(false);
                logOut();
                navigate("/");
              }}>
                LogOut
              </li>
            </>
          ) : (
            <>
              <li onClick={() => {
                setIsOpenMenu(false);
                navigate("/login");
              }}>
                Login
              </li>
              <li onClick={() => {
                setIsOpenMenu(false);
                navigate("/register");
              }}>
                Registrar
              </li>
            </>
          )}
        </ul>
      </nav>
    )}
    </>
  );
};

export default Header;