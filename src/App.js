import { Routes, Route } from "react-router-dom";
// import "antd/dist/antd.min.css";

// Import de Components
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* TODO: Demais rotas aqui */}
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;
