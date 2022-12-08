import { Routes, Route } from "react-router-dom";
// import "antd/dist/antd.min.css";

// Import de Components
import Home from "./pages/Home";
import PermutaLayout from "./pages/permutas/PermutaLayout";
import ErrorPage from "./pages/ErrorPage";
import Incluir from "./pages/permutas/Incluir";
import Consultar from "./pages/permutas/Consultar";
import Historico from "./pages/permutas/Historico";
import Manifestacoes from "./pages/permutas/Manifestacoes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/permuta" element={<PermutaLayout />}>
        <Route path="/permuta/incluir" element={<Incluir />}></Route>
        <Route path="/permuta/consultar" element={<Consultar />}></Route>
        <Route path="/permuta/historico" element={<Historico />}></Route>
        <Route
          path="/permuta/manifestacoes"
          element={<Manifestacoes />}
        ></Route>
      </Route>

      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;
