/* styles */
import styles from "./PlayerCard.module.scss";

/* external modules */
import { useNavigate } from "react-router-dom";

/* components */
import ImageDefault from "components/ImageDefault/index";

const PlayerCard = ({ name, age, id, position, img, team }) => {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/players/${id}`)} className={styles.playerContainer}>
      <ImageDefault alt={name} path={img} size={"medium"} />
      <figcaption>
        <h3>{name}</h3>
        <p>Idade: <strong>{age}</strong></p>
        <p>Posição: <strong>{position}</strong></p>
        <p>Clube: <strong>{team}</strong></p>
      </figcaption>
    </div>
  );
};

export default PlayerCard;