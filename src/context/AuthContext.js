/* external modules */
import { createContext } from "react";

/* hooks */
import useAuth from "hooks/useAuth";

const AuthContext = createContext();
AuthContext.displayName = "Auth Context";

const AuthProvider = ({ children }) => {
  
  const { login, register, logOut, isLogged } = useAuth();

  return (
    <AuthContext.Provider value={{ isLogged, register, logOut, login }}>
      { children }
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };