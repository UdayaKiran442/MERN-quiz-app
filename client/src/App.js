import "./styleSheets/alignments.css";
import "./styleSheets/textElements.css";
import "./styleSheets/theme.css";
import "./styleSheets/custom-components.css";
import "./styleSheets/form-elements.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/common/Login/index";
import Register from "./pages/common/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
