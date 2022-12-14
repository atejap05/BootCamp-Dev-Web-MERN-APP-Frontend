import { Routes, Route } from "react-router-dom";

// Import de Components
import Home from "./pages/Home";
import PermutaLayout from "./pages/permutas/PermutaLayout";
import ErrorPage from "./pages/ErrorPage";
import Incluir from "./pages/permutas/Incluir";
import Consultar from "./pages/permutas/Consultar";
import Manifestacoes from "./pages/permutas/Manifestacoes";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute Component={Home}/>} />
      <Route
        path="/permuta"
        element={<ProtectedRoute Component={PermutaLayout} />}
      >
        {/* TODO: estas rotas nao serão usadas! */}
        <Route
          path="/permuta/incluir"
          element={<ProtectedRoute Component={Incluir} />}
        />
        <Route
          path="/permuta/consultar"
          element={<ProtectedRoute Component={Consultar} />}
        />
        <Route
          path="/permuta/manifestacoes"
          element={<ProtectedRoute Component={Manifestacoes} />}
        />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
