import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Level1 from './pages/Levels/Level1';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';

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
        <Route path="teacher" element={<TeacherDashboard/>} />
      </Routes>
      
    </div>
  );
}

export default App;
