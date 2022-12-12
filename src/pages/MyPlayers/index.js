/* external modules */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

/* api */
import api from "utils/api";

/* components */
import PlayerCard from "components/PlayerCard/index";

/* styles */
import styles from "./MyPlayers.module.scss";
import defaultStyles from "styles/Default.module.scss";
import containerStyles from "styles/PlayerCardContainer.module.scss";

const MyPlayers = () => {

  const [ players, setPlayers ] = useState([]);
  const [ token ] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get("/players/teamplayers", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
    .then((response) => {
      setPlayers(response.data.players);
      return response;

    }).catch((err) => {
      toast.error(err.response.data.message);
      return err;
    });
  }, [ token ]);


  return (
    <section className={defaultStyles.defaultContainer}>
      <div className={defaultStyles.pageHeader}>
        <h2>Meus Jogadores</h2>
      </div>
      {players === undefined ? (
        <div className={styles.noPlayers}>
          <span>Você ainda não tem nenhum jogador cadastrado!</span>
          <p>Cadastre seu primeiro jogador: <Link to={"/players/add"}>Clique aqui</Link></p>
        </div>
      ) : (
        <div className={containerStyles.container}>
          {players.map(player => (
          <PlayerCard 
            key={player._id}
            name={player.name}
            team={player.team.name}
            age={player.age}
            id={player._id}
            position={player.position}
            available={player.available}
            borrower={player.borrower}
            type={"my-players"}
            img={`http://localhost:5000/images/players/${player.image}`}
          />
        ))}
        </div>
      ) }
      <p className={styles.newPlayer}>Deseja cadastrar um novo jogador? <Link to="/players/add">Clique aqui</Link></p>
    </section>
  );
};

export default MyPlayers;