/* external modules */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* options */
import positions from "db/positions.json";

/* api */
import api from "utils/api";

/* components */
import Input from "components/Input/index";
import ImageDefault from "components/ImageDefault/index";

/* styles */
import defaultStyles from "styles/Default.module.scss";
import formStyles from "styles/Form.module.scss";
import Select from "components/Select/index";

const AddPlayer = () => {
  
  const navigate = useNavigate();
  const [ player, setPlayer ] = useState({});
  const [ token ] = useState(localStorage.getItem("token") || "");
  const [ preview, setPreview ] = useState("");
  
  const handleChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const handleChangeOption = (e) => {
    setPlayer({ ...player, position: e.target.options[e.target.selectedIndex].text });
  };

  const onFileChange = (e) => {
    setPreview(e.target.files[0]);
    setPlayer({ ...player, image: e.target.files[0]});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    await Object.keys(player).forEach(key => formData.append(key, player[key]));

    await api.post("/players/register", formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      toast.success(response.data.message);
      navigate("/players/myplayers");
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
  };

  return (
    <section className={defaultStyles.defaultContainer}>
      <div className={defaultStyles.pageHeader}>
        <h2>Cadastrar Jogador</h2>
      </div>
      {preview && (
        <ImageDefault path={URL.createObjectURL(preview)}  alt={player.name} size={"large"}/>
      )}
      <form className={formStyles.formContainer} onSubmit={handleSubmit}>
        <Input 
         name={"image"}
         text={"Imagem do Jogador"}
         type={"file"}
         handleOnChange={onFileChange}
        />
        <Input 
         name={"name"}
         text={"Nome do Jogador"}
         type={"text"}
         handleOnChange={handleChange}
         placeholder={"Digite o nome do jogador"}
         value={player.name || ""}
        />
        <Input 
         name={"age"}
         text={"Idade do Jogador"}
         type={"number"}
         value={player.age || ""}
         handleOnChange={handleChange}
         placeholder={"Digite a idade do jogador"}
        />
        <Input 
         name={"height"}
         text={"Altura do Jogador"}
         type={"number"}
         value={player.height || ""}
         handleOnChange={handleChange}
         placeholder={"Digite a altura do jogador (cm)"}
        />

        <Select 
          handleOnChange={handleChangeOption}
          list={positions}
          name={"position"}
          text={"Selecione a posição do seu jogador"}
          value={player.position || ""}
        />

        <input type={"submit"} value="Cadastrar" />
        <p>Voltar para home? <Link to={"/"}>Clique aqui</Link></p>
      </form>
    </section>
  );
};

export default AddPlayer;