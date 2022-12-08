import { Routes, Route } from "react-router-dom";
// import "antd/dist/antd.min.css";

// Import de Components
import Home from "./pages/Home";
import PermutaLayout from "./pages/permutas/PermutaLayout";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/permuta" element={<PermutaLayout />}></Route>

      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;
