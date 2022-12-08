/* external modules */
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* components */
import Footer from "components/Footer/index";
import Header from "components/Header/index";

/* contexts */
import { AuthProvider } from "context/AuthContext";

/* pages */
import Home from "./pages/Home";
import Register from "pages/Register/index";
import Login from "pages/Login/index";
import MyPlayers from "pages/MyPlayers/index";
import AddPlayer from "pages/AddPlayer/index";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main className="containerDefault">
          <Routes>
              <Route path={"/"} element={<Home />} /> 
              <Route path={"/register"} element={<Register />} /> 
              <Route path={"/login"} element={<Login />} /> 
              <Route path={"/players/myplayers"} element={<MyPlayers />} /> 
              <Route path={"/players/add"} element={<AddPlayer />} /> 
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;