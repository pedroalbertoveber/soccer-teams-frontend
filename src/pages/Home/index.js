import { useContext } from "react";

/* contexts */
import { AuthContext } from "context/AuthContext";

const Home = () => {

  const { isLogged } = useContext(AuthContext);

  return (
    <section>
      {isLogged ? (
        <>
          <h2>Bem-Vindo de Volta</h2>
        </>
      ) : (
        <>
          <h2>Página Principal</h2>
        </>
      )}
    </section>
  );
};

export default Home;