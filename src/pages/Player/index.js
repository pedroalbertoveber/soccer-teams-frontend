/* external modules */
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

/* icons */
import { BsCheckCircleFill } from "react-icons/bs";

/* api */
import api from "utils/api";

/* styles */
import defaultStyles from "styles/Default.module.scss";
import styles from "./Player.module.scss";

const Player = () => {

  const [ token ] = useState(localStorage.getItem(("token") || ""));
  const [ player, setPlayer ] = useState({});
  const [ team, setTeam ] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  const loanRequest = async () => {
    await api.patch(`/players/loan/${player._id}`, player, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
    .then(response => {
      toast.success(response.data.message);
      navigate("/players/loanrequests");
      return response.data;
    })
    .catch(err => {
      toast.error(err.response.data.message);
      return err.response.data;
    });
  };

  const quitLoan = async () => {
    await api.patch(`/players/loan/quit/${player._id}`, player, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
    .then(response => {
      toast.success(response.data.message);
      navigate("/players/loanrequests");
    })
    .catch(err => {
      toast.error(err.response.data.message);
    });
  };

  const acceptRequest = async (player) => {
    await api.patch(`/players/concludeloan/${player._id}`, player, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }).then(response => {
      toast.success(response.data.message);
      navigate("/players/loanrequests");
    }).catch(err => {
      toast.error(err.response.data.message);
    });
  };

  const declineRequest = async (player) => {
    await api.patch(`/players/concludeloan/decline/${player._id}`, player, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }).then(response => {
      toast.success(response.data.message);
      navigate("/players/loanrequests");
    }).catch(err => {
      toast.error(err.response.data.message);
    });
  };

  /* check if player has borrower */
  let hasBorrower;
  let loanAccepted;

  if (player.borrower) {
    if (String(player.team._id) === String(team._id) && player.available === true) {
      hasBorrower = true;
    } else if (String(player.team._id) === String(team._id) && player.available === false) {
      loanAccepted = true
    } else {
      hasBorrower = false;
    }
  } else {
    hasBorrower = false;
    loanAccepted = false;
  }

  useEffect(() => {
    if (token) {
      api.get("/teams/checkteam", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }).then(response => {
        setTeam(response.data);
      });
    }

    api.get(`/players/${id}`).then(response => {
      setPlayer(response.data.player);
    });

  }, [ token, id ]);

  return (
    <>
    {player.name ? (

    <section className={defaultStyles.defaultContainer}>
      <div className={defaultStyles.pageHeader}>
        <h2>{player.name}</h2>
      </div>
      <div className={defaultStyles.infoContainer}>
        <figure>
          <img
            src={`http://localhost:5000/images/players/${player.image}`}
            alt={player.name}
            />
        </figure>
        <figcaption>
          <h4>Informações</h4>
          <p>Idade: <strong>{player.age}</strong></p>
          <p>Altura: <strong>{player.height}cm</strong></p>
          <p>Posição: <strong>{player.position}</strong></p>
          <p>Liga Disutada: <strong>{player.team.league}</strong></p>
          <p>Clube Atual: <strong>{player.team.name}</strong></p>
          {player.borrower !== null && player.borrower !== undefined && !player.available && (
            <p>Emprestado ao: <strong>{player.borrower.name}</strong></p>
          )}
          {token && (
            <div className={defaultStyles.actions}>
                {(String(team._id) === String(player.team._id)) ? (
                  <button onClick={() => navigate(`/players/edit/${player._id}`)}>
                    Editar Jogador
                  </button>
                ):(
                  player.available ? (
                    <>
                    {(player.borrower && String(player.borrower._id) === String(team._id)) ? (
                    <button 
                      className={defaultStyles.cancelLoanRequest}
                      onClick={() => quitLoan()}
                    >
                      Cancelar Solicitação
                    </button>
                    ): (
                    <button 
                      className={defaultStyles.loanRequestBtn}
                      onClick={() => loanRequest()}  
                    >
                      Solicitar Empréstimo
                    </button>
                    )}
                  </>
                  ) : (
                    <>
                      <div className={styles.success}>
                        <strong>Contratado!</strong>
                      </div>
                    </>
                  )
                  
                )}
            </div>
          )}
        </figcaption>
      </div>

      {hasBorrower && (
        <>
        <div className={defaultStyles.subDivision}>
          <h4>Solicitação de Empréstimo Pendente:</h4>
        </div>
        <div className={styles.answerRequest}>
          <figure>
            <img 
              src={`http://localhost:5000/images/teams/${player.borrower.image}`}
              alt={player.borrower.name}
              />
            <h4>{player.borrower.name}</h4>
          </figure>
          <div>
            <button onClick={() => acceptRequest(player)}>
              Aceitar
            </button>
            <button onClick={() => declineRequest(player)}>
              Declinar
            </button>
          </div>
        </div>
        </>
      )}

      {loanAccepted && (
        <div className={styles.concludeLoan}>
          <div className={styles.iconContainer}>
            <BsCheckCircleFill />
            <h4>Negócio Fechado!</h4>
          </div>
          <div className={styles.borrowerInfo}>
            <h3>{player.borrower.name}</h3>
            <img src={`http://localhost:5000/images/teams/${player.borrower.image}`} alt={player.borrower.name} />
          </div>
        </div>
      )}
      <p className={defaultStyles.goBack}>Voltar para Home? <Link to={"/"}>Clique aqui</Link></p>
    </section>
    ): (
      <div>
        Carregando...
      </div>
    )}
    </>
  );
};

export default Player;