/* api */
import api from "utils/api";

/* external modules */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [ isLogged, setIsLogged ] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token) {
      api.defaults.headers.Auhtorization = `Bearer ${JSON.parse(token)}`;
      setIsLogged(true);
    }

  }, []);

  const authTeam = async (data) => {
    setIsLogged(true);
    localStorage.setItem("token", JSON.stringify(data.token));
    navigate("/");
  };

  const logOut = () => {

    toast.success("Até breve!");

    setIsLogged(false);
    localStorage.removeItem("token");
    api.defaults.headers.Auhtorization = undefined;

    navigate("/");
  };

  const login = async (team) => {
    try {
      const data = await api.post("/teams/login", team)
      .then((response) => {
        toast.success(response.data.message);
        return response.data;
      });
      
      await authTeam(data);

    } catch(err) {  
      toast.error(err.response.data.message);
    }
  };

  const register = async (team) => {
    try {
      const data = await api.post("/teams/register", team)
      .then((response) => {
        toast.success(response.data.message);
        return response.data;
      });

      await authTeam(data);

    } catch(err) {  
      toast.error(err.response.data.message);
    }
  };

  return {
    isLogged,
    register,
    login,
    logOut,
  };
};

export default useAuth;