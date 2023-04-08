import { Route, Routes, Outlet } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/auth/log-in";
import Register from "./pages/auth/register";
import ProtectedRoute from "./util/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
