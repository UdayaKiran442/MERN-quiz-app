import "./styleSheets/alignments.css";
import "./styleSheets/textElements.css";
import "./styleSheets/theme.css";
import "./styleSheets/custom-components.css";
import "./styleSheets/form-elements.css";
import "./styleSheets/layout.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/common/Login/index";
import Register from "./pages/common/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/common/Home";
import Exams from "./pages/admin/Exams/index";
import AddEditExam from "./pages/admin/Exams/AddEditExam";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*user routes*/}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/*admin routes*/}
        <Route
          path="/admin/exams"
          element={
            <ProtectedRoute>
              <Exams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/exams/add"
          element={
            <ProtectedRoute>
              <AddEditExam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/exams/edit/:id"
          element={
            <ProtectedRoute>
              <AddEditExam />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
