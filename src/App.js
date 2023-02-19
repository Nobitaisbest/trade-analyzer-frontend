import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavbarComponent from './pages/components/Navbar';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoPage from './pages/NoPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route index path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;


