/* external modules */
import { useNavigate } from "react-router-dom";

/* styles */
import styles from "./InLineData.module.scss";

const InLineData = ({ name,
  team,
  teamImg, 
  league, 
  playerImg, 
  available, 
  type, 
  playerId, 
  teamId, 
  interrestedTeam }) => {

  const typeOfData = type;
  const playerImage = `http://localhost:5000/images/players/${playerImg}`;

  let teamImage;

  if (teamImg) {
    teamImage = `http://localhost:5000/images/teams/${teamImg}`;
  }else {
    teamImage = false;
  }

  const navigate = useNavigate();

  return(
    <>
    {typeOfData === "loan" && (
      <div className={styles.inLineContainer}>
        <div className={styles.mainInfo}>
          <img src={playerImage} alt={name}/>
          <h4>{name}</h4>
        </div>
        <div className={styles.status}>
          <h6>Staus de negociação</h6>
          <strong>{available ? "Em negociação" : "Negócio Fechado!"}</strong>
          {interrestedTeam ? (
            <p>Interessado: {interrestedTeam}</p>
          ) : (
            <p>Clube Atual: {team}</p>
          )}
        </div>
        <div className={styles.actions}>
          <button onClick={() => navigate(`/players/${playerId}`)}>
            Ver Detalhes
          </button>
        </div>
      </div>
    )}
   
    {typeOfData === "team" && (
      <div className={styles.inLineContainer}>
        <div className={styles.mainInfo}>
          {teamImage && (<img src={teamImage} alt={team} style={{ width: "80px", height:"80px"}}/>)}
          <h4>{team}</h4>
        </div>
        <div className={styles.status}>
          <h6>Liga Disputada</h6>
          <strong>{league}</strong>
        </div>
        <div className={styles.actions}>
          <button onClick={() => navigate(`/teams/${teamId}`)}>
            Ver Detalhes
          </button>
        </div>
      </div>
    )}
    

    </>
  );
};

export default InLineData;