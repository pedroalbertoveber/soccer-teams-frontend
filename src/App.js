import Footer from "components/Footer/index";
import Header from "components/Header/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* pages */
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="containerDefault">
        <Routes>
          <Route path={"/"} element={<Home />} /> 
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;