import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Level1 from './pages/Levels/Level1';

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home/>} /> 
      <Route
          path="signup"
          element={
              <Signup />
          }
        />
      <Route
          path="login"
          element={
              <Login />
          }
        />
        <Route path="/level1" element={<Level1/>} /> 
      </Routes>
      
    </div>
  );
}

export default App;
