/* external modules */
import { useState, useEffect } from "react";

/* api */
import api from "utils/api";

/* components */
import InLineData from "components/InLineData/index";

/* styles */
import defaultStyles from "styles/Default.module.scss";

const Teams = () => {
  const [ loading, setLoading ] = useState(true);
  const [ teams, setTeams ] = useState([]);

  useEffect(() => {
    setLoading(true);
    api.get("/teams").then(response => {
      setTeams(response.data.teams);
    }).catch(err => {
      console.log(err);
    });

    setLoading(false);
  }, []);

  return (
    <section className={defaultStyles.defaultContainer}>
      <div className={defaultStyles.pageHeader}>
        <h2>Todos os Clubes</h2>
      </div>
      <div className={defaultStyles.container}>
        {!loading && (
          teams.map(team => (
            <InLineData 
              team={team.name}
              teamId={team._id}
              league={team.league}
              teamImg={team.image}
              key={team._id}
              type={"team"}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Teams;