import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register"; 
import auth from "../services/auth";
import CreatePlace from "../pages/CreatePlace"
import RestaurantDetailPage from "../pages/RestaurantDetailPage";

const PrivateRoute = ({ children }) => {
  return auth.isAuthenticated() ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/newPlace" element={<CreatePlace />} /> 
        <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
