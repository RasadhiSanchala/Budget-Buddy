import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";
import Home from "./pages/Dashboard/Home"
import UserProvider from "./context/userContext";




const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/Login" exact element={<Login />} />
            <Route path="/Signup" exact element={<Signup />} />
            <Route path="/Expense" exact element={<Expense />} />
            <Route path="/Home" exact element={<Home />} />
            <Route path="/Income" exact element={<Income />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/Home" />
  ) : (
    <Navigate to="/Login" />
  );
};


