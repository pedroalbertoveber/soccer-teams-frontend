/* external modules */
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* components */
import Input from "components/Input/index";
import Select from "components/Select/index";
import ImageDefault from "components/ImageDefault/index";

/* api */
import api from "utils/api";

/* data */
import positions from "db/positions.json";

/* styles */
import defaultStyles from "styles/Default.module.scss";
import formStyles from "styles/Form.module.scss";

const EditPlayer = () => {

  const [ token ] = useState(localStorage.getItem("token" || ""));
  const [ player, setPlayer ] = useState({});
  const [ preview, setPreview ] = useState("");
  const [ loading, setLoading ] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const handleChangeOption = (e) => {
    setPlayer({ ...player, position: e.target.options[e.target.selectedIndex].text });
  };

  const handleChangeFile = (e) => {
    setPreview(e.target.files[0]);
    setPlayer({ ...player, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    await Object.keys(player).forEach(key => formData.append( key, player[key] ));

    await api.patch(`/players/edit/${player._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
    .then(response => {
      toast.success(response.data.message);
      navigate("/players/myplayers");
    })
    .catch(err => {
      toast.error(err.response.data.message);
    });
  };

  useEffect(() => {
    setLoading(true);
    api.get(`/players/${id}`)
    .then(response => {
      setPlayer(response.data.player);
    }).catch(err => {
      toast.error(err.response.data.message);
    });

    setLoading(false);
  }, [ token, id ]);

  return (
    <>
      {!loading && (
        <section className={defaultStyles.defaultContainer}>
          <div className={defaultStyles.pageHeader}>
            <h2>Editar Jogador</h2>
          </div>
          {(player.image || preview)  && (
            <ImageDefault 
              path={preview ? URL.createObjectURL(preview) : `http://localhost:5000/images/players/${player.image}`}
              size={"large"}
            />
          )}
          <form className={formStyles.formContainer} onSubmit={handleSubmit}>
            <Input 
              name={"image"}
              text={"Imagem do Jogador"}
              type={"file"}
              handleOnChange={handleChangeFile}
            />
            <Input 
              text={"Nome"}
              name={"name"}
              type={"text"}
              handleOnChange={handleChange}
              placeholder={"Digite o nome do jogador"}
              value={player.name}
            />
            <Input 
              text={"Idade"}
              name={"age"}
              type={"number"}
              handleOnChange={handleChange}
              placeholder={"Digite a idade do jogador"}
              value={player.age}
            />
            <Input 
              text={"Altura"}
              name={"height"}
              type={"number"}
              handleOnChange={handleChange}
              placeholder={"Digite a altura do jogador"}
              value={player.height}
            />
            <Select 
              handleOnChange={handleChangeOption}
              list={positions}
              name={"position"}
              text={"Selecione a posição do seu jogador"}
              value={player.position || ""}
            />
            <input type="submit" value={"Editar"} />
          </form>
          <p className={defaultStyles.goBack}>Voltar para home? <Link to="/">Clique Aqui</Link></p>
        </section>
      )}
    </>
  ); 
};

export default EditPlayer;