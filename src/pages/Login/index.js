/* external modules */
import { useContext, useState } from "react";
import {  Link } from "react-router-dom";

/* context */
import { AuthContext } from "context/AuthContext";

/* styles */
import Input from "components/Input/index";
import defaultStyles from "styles/Default.module.scss";
import formStyles from "styles/Form.module.scss";

const Login = () => {

  const [ team, setTeam ] = useState({});
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(team);
  };

  return(
    <section className={defaultStyles.defaultContainer}>
      <div className={defaultStyles.pageHeader}>
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit} className={formStyles.formContainer}>
        <Input 
          text={"E-mail"}
          type={"email"}
          name={"email"}
          handleOnChange={handleChange}
          value={team.email || ""}
          placeholder={"Digite o e-mail do seu clube"}
        />
        <Input 
          text={"Senha"}
          type={"password"}
          name={"password"}
          handleOnChange={handleChange}
          value={team.password || ""}
          placeholder={"Digite a senha do seu clube"}
        />

        <input type={"submit"} value={"Entrar"} />
        <p>Ainda não tem cadastro? <Link to={"/register"}>Clique aqui.</Link></p>
      </form>
    </section>
  );
};

export default Login;