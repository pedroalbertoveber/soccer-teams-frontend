/* external modules */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

/* components */
import Input from "components/Input/index";
import Select from "components/Select/index";

/* data */
import countries from "db/countries.json";

/* styles */
import formStyles from "styles/Form.module.scss";
import defaultStyles from "styles/Default.module.scss";

/* context */
import { AuthContext } from "context/AuthContext";

const Register = () => {

  const [ team, setTeam ] = useState({});
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setTeam({...team, [e.target.name]: e.target.value });
  };

  const handleChangeOption = (e) => {
    setTeam({...team, country: e.target.options[e.target.selectedIndex].text });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(team);
  };

  return (
    <section className={defaultStyles.defaultContainer}>
      <div className={defaultStyles.pageHeader}>
        <h2>Registrar</h2>
      </div>
      <form className={formStyles.formContainer} onSubmit={handleSubmit}>
        <Input 
          text={"Nome do Clube"}
          name={"name"}
          type={"text"}
          placeholder={"Digite o nome do seu clube"}
          handleOnChange={handleChange}
        />
        <Input 
          text={"E-mail"}
          name={"email"}
          type={"email"}
          placeholder={"Digite o email do seu clube"}
          handleOnChange={handleChange}
        />
        
        <Select 
          name={"country"}
          list={countries}
          text={"Selecione o país do seu clube"}
          handleOnChange={handleChangeOption}
          value={team.country || ""}
        />

        <Input 
          text={"Liga"}
          name={"league"}
          type={"text"}
          placeholder={"Digite a Liga do seu clube"}
          value={team.league || ""}
          handleOnChange={handleChange}
        />

        <Input 
          text={"Senha"}
          name={"password"}
          type={"password"}
          placeholder={"Crie uma senha para  seu clube"}
          handleOnChange={handleChange}
        />
        <Input 
          text={"Confirmação de Senha"}
          name={"confirmpassword"}
          type={"password"}
          placeholder={"Digite novamente a sua senha"}
          handleOnChange={handleChange}
        />
        <input type={"submit"} value={"Cadastrar"} />
        <p>Já tem cadastro? <Link to={"/login"}>Clique aqui.</Link></p>
      </form>
    </section>
  );
};

export default Register;