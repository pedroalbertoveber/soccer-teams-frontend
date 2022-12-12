/* external modules */
import { useState, useEffect } from "react";

/* api */
import api from "utils/api";

/* components */
import PlayerCard from "components/PlayerCard/index";

/* styles */
import defaultStyles from "styles/Default.module.scss";
import playerStyles from "styles/PlayerCardContainer.module.scss";

const Home = () => {

  const [ players, setPlayers ] = useState([]);
  const [ teams, setTeams ] = useState([]);

  useEffect(() => {
    api.get("/teams").then(reponse => {
      setTeams(reponse.data.teams);
    });
    
    api.get("/players").then(reponse => {
      setPlayers(reponse.data.players);
    });

  }, [])

  return (
    <section className={defaultStyles.defaultContainer}>
      {teams.map(team => (
        <div key={team._id} style={{ width: "100%" }}>
          <div className={defaultStyles.subDivision} >
            {team.image && 
              <img 
              src={`http://localhost:5000/images/teams/${team.image}`}
              alt={team.name}
              />
            }
            <h4>{team.name}</h4>
          </div>
          <div className={playerStyles.container}>
            {players.map(player => {
              if(String(player.team._id) === String(team._id))
              return (
                <PlayerCard 
                name={player.name}
                age={player.age}
                id={player._id}
                img={`http://localhost:5000/images/players/${player.image}`}
                position={player.position}
                team={player.team.name}
                key={player._id}
                />
                );
              })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Home;