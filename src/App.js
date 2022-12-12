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
import EditTeam from "pages/EditTeam/index";
import Player from "pages/Player/index";
import MyLoanRequest from "pages/MyLoanRequests/index";
import Teams from "pages/Teams/index";
import Team from "pages/Team/index";
import EditPlayer from "pages/EditPlayer/index";

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
              <Route path={"/teams"} element={<Teams />} /> 
              <Route path={"/teams/myteam"} element={<EditTeam />} /> 
              <Route path={"/teams/:id"} element={<Team />} /> 
              <Route path={"/players/myplayers"} element={<MyPlayers />} /> 
              <Route path={"/players/add"} element={<AddPlayer />} />
              <Route path={"/players/loanrequests"} element={<MyLoanRequest />} /> 
              <Route path={"/players/:id"} element={<Player />} /> 
              <Route path={"/players/edit/:id"} element={<EditPlayer />} /> 
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;