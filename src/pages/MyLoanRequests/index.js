/* external modules */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

/* api */
import api from "utils/api";

/* components */
import InLineData from "components/InLineData/index";

/* styles */
import defaultStyles from "styles/Default.module.scss";


const MyLoanRequest = () => {

  const [ token ] = useState(localStorage.getItem(("token") || ""));
  const [ players, setPlayers ] = useState([]);
  const [ loanRequests, setLoanRequests ] = useState([]);
  const [ loanPlayers, setLoanPlayers ] = useState([]);
  const [ newPlayers, setNewPlayers ] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/players/loan/players", { 
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    })
    .then(response => {
      setPlayers(response.data.players);
    })
    .catch(err => {
      toast.error(err.respose.data.messsage)
      navigate("/");
    });

    api.get("players/loan/myplayers", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    })
    .then(response => {
      setLoanRequests(response.data.players);
    })
    .catch(err => {
      toast.error(err.response.data.message);
    });

    api.get("/players/concludedloans", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    }).then(response => {
      setLoanPlayers(response.data.players);
    });

    api.get("players/loan/newplayers", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    }).then(response => {
      setNewPlayers(response.data.players);
    })

  }, [ token, navigate ]);

  /* validations */
  let hasLoanPlayers;
  let hasNewPlayers;

  if (loanPlayers !== null && loanPlayers !== undefined) {
    if (loanPlayers.length === 0) {
      hasLoanPlayers = false;
    } else {
      hasLoanPlayers = true;
    }
  } else {
    hasLoanPlayers = false;
  }

  if (newPlayers !== null && newPlayers !== undefined) {
    if (newPlayers.length === 0) {
      hasNewPlayers = false;
    } else {
      hasNewPlayers = true;
    }
  } else {
    hasNewPlayers = false;
  }

  return (
    <>
      <section className={defaultStyles.defaultContainer}>
      <div className={defaultStyles.subDivision}>
        <h4>Jogadores em Negociação</h4>
      </div>
      <div style={{ width: "100%"}}>
        {players[0] ? (
          <>
          {players.map(player => (
            <InLineData 
            available={player.available}
            playerId={player._id}
            name={player.name}
            playerImg={player.image}
            team={player.team.name}
            key={player._id}
            type={"loan"}
            />
            ))}
          </>
        ) : (
          <div>
            <span>Você não possui nenhuma solicitação de empréstimo registrada</span>
          </div>
      )}
      </div>
      {loanRequests && (
        <>
        <div className={defaultStyles.subDivision}>
          <h4>Solicitações de Empréstimo</h4>
        </div>
        <div style={{ width: "100%" }}>
          {loanRequests.map(player => (
            <InLineData 
            available={player.available}
            name={player.name}
            playerImg={player.image}
            key={player._id}
            type={"loan"}
            interrestedTeam={player.borrower.name}
            playerId={player._id}
            />
            ))}
        </div>
        </>
      )}

      {hasLoanPlayers && (
        <>
        <div className={defaultStyles.subDivision}>
          <h4>Jogadores emprestados</h4>
        </div>
        <div style={{ width: "100%" }}>
          {loanPlayers.map(player => (
            <InLineData 
            available={player.available}
            name={player.name}
            playerImg={player.image}
            key={player._id}
            type={"loan"}
            interrestedTeam={player.borrower.name}
            playerId={player._id}
            />
            ))}
        </div>
        </>
      )}

      {hasNewPlayers && (
        <>
        <div className={defaultStyles.subDivision}>
          <h4>Jogadores Contratados</h4>
        </div>
        <div style={{ width: "100%" }}>
          {newPlayers.map(player => (
            <InLineData 
            available={player.available}
            name={player.name}
            playerImg={player.image}
            key={player._id}
            type={"loan"}
            interrestedTeam={player.borrower.name}
            playerId={player._id}
            />
            ))}
        </div>
        </>
      )}
      <p className={defaultStyles.goBack}>Voltar para Home? <Link to="/">Clique aqui</Link></p>
    </section>
    </>
  );
};

export default MyLoanRequest;