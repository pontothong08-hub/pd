import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ListMember from "./screen/ListMember";
import Register from "./screen/Register";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="app-header-content">
            <h1>ระบบจัดการสมาชิก (Member Management)</h1>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<ListMember />} />
            <Route path="/members" element={<ListMember />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}