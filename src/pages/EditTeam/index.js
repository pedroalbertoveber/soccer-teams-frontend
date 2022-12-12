/* external modules */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* api */
import api from "utils/api";

/* components */
import Input from "components/Input/index";
import Select from "components/Select/index";
import ImageDefault from "components/ImageDefault/index";

/* data */
import countries from "db/countries.json";

/* styles */
import defaultStyles from "styles/Default.module.scss";
import formStyles from "styles/Form.module.scss";

const EditTeam = () => {
  const [ team, setTeam ] = useState({});
  const [ token ] = useState(localStorage.getItem("token") || "");
  const [ preview, setPreview ] = useState("");

  const navigate = useNavigate();

  const onFileChange = (e) => {
    setPreview(e.target.files[0]);
    setTeam({ ...team, [e.target.name]: e.target.files[0]});
  };

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const handleChangeOptions = (e) => {
    setTeam({ ...team, country: e.target.options[e.target.selectedIndex].text });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    await Object.keys(team).forEach(key => formData.append(key, team[key]));

    await api.patch(`/teams/edit/${team._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then(response => {
      toast.success(response.data.message);
      navigate("/");
    })
    .catch(err => {
      toast.error(err.response.data.message);
    });
  };

  useEffect(() => {
    api.get("/teams/checkteam", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
    .then(response => {
      setTeam(response.data);
    })
    .catch(err => {
      toast.error(err.response.data.message);
    });

  }, [ token ]);

  return (
    <section className={defaultStyles.defaultContainer}>
      <div className={defaultStyles.pageHeader}>
        <h2>Meu Time</h2>
      </div>
      {(team.image || preview) && 
        <ImageDefault 
          alt={team.name} 
          size={"large"} 
          path={preview ? URL.createObjectURL(preview) : `http://localhost:5000/images/teams/${team.image}`}
          emblem={true}
        />
      }
      <form className={formStyles.formContainer} onSubmit={handleSubmit}>
        <Input 
          name={"image"}
          type={"file"}
          text={"Imagem do escudo"}
          handleOnChange={onFileChange}
        />
        <Input 
          text={"Nome do Clube"}
          name={"name"}
          type={"text"}
          placeholder={"Digite o nome do seu clube"}
          handleOnChange={handleChange}
          value={team.name || ""}
        />
        <Input 
          text={"E-mail"}
          name={"email"}
          type={"email"}
          placeholder={"Digite o email do seu clube"}
          handleOnChange={handleChange}
          value={team.email || ""}
        />
        <Select 
          name={"country"}
          list={countries}
          text={"Selecione o país do seu clube"}
          handleOnChange={handleChangeOptions}
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
        <input type={"submit"} value={"Editar"}/>
      </form>
      <p className={defaultStyles.goBack}>
        Voltar para Home? <Link to="/">Clique aqui</Link>
      </p>
    </section>
  );
};

export default EditTeam;