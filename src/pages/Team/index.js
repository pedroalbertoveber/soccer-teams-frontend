/* external modules */
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

/* styles */
import defaultStyles from "styles/Default.module.scss";
import styles from "./Team.module.scss";

/* api */
import api from "utils/api";

const Team = () => {

  const [ loading, setLoading ] = useState(true);
  const [ team, setTeam ] = useState({});

  const { id } = useParams();

  useEffect(() => {
    api.get(`/teams/${id}`).then(response => {
      setTeam(response.data.team);
    });

    setLoading(false);
  }, [])

  return (
    <>
    {!loading && (
      <>
      <section className={defaultStyles.defaultContainer}>
        <div className={defaultStyles.pageHeader}>
          <h2>{team.name}</h2>
        </div>
        <div className={styles.infoContainer}>
          <figure>
            <img src={`http://localhost:5000/images/teams/${team.image}`} alt={team.name} />
          </figure>
          <figcaption>
            <h4>Informações</h4>
            <p>Pais: <strong>{team.country}</strong></p>
            <p>Liga: <strong>{team.league}</strong></p>
            <p>Contato: <strong>{team.email}</strong></p>
          </figcaption>
        </div>
        <p className={defaultStyles.goBack}>Voltar para home? <Link to="/">Clique aqui</Link></p>
      </section>
      </>
    )}
    </>
  );
};

export default Team;