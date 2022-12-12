/* styles */
import styles from "./PlayerCard.module.scss";

/* external modules */
import { useNavigate } from "react-router-dom";

/* components */
import ImageDefault from "components/ImageDefault/index";

const PlayerCard = ({ name, age, id, position, img, team, borrower, type, available }) => {

  const navigate = useNavigate();
  let inNegociation;
  let loanPlayer;

  if (type === "my-players" && borrower && available === false) {
    loanPlayer = true;
    inNegociation = false;
  } else if (type === "my-players" && borrower && available === true) {
    loanPlayer = false;
    inNegociation = true;
  } else {
    loanPlayer = false;
    inNegociation = false;
  }

  return (
    <div onClick={() => navigate(`/players/${id}`)} className={styles.playerContainer}>
      <ImageDefault alt={name} path={img} size={"medium"} />
      <figcaption>
        <h3>{name}</h3>
        <p>Idade: <strong>{age}</strong></p>
        <p>Posição: <strong>{position}</strong></p>
        <p>Clube: <strong>{team}</strong></p>
      </figcaption>
      { loanPlayer && (
        <div className={styles.loanRequest}>
          Empréstimo Finalizado
        </div>
      )}
      { inNegociation && (
        <div className={styles.loanRequest}>
          Clube Interessado
        </div>
      )}
    </div>
  );
};

export default PlayerCard;