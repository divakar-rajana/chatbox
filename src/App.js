import './App.css';
import Login from './templates_/Login';
import Forgetpassword from './templates_/Forgetpassword'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Home from './templates_/Home'
import Registration from './templates_/Registration';
import { useContext } from 'react';
import { AuthContext } from './Contexts/AuthContext';

function App() {

  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)


  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login"></Navigate>;
    }
    return children
  };

  return (
    <div>
      <Router>

        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forgetpassword />} />
          <Route path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />


        </Routes>

      </Router>

    </div>
  );
}

export default App;
