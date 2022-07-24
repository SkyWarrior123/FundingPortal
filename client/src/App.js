import './App.css';
import { Routes, Route} from "react-router-dom";
import Landing from './view/Landing/Index';
import Login from './view/Login/Login';
import Dashboard from './view/Dashboard/Dashboard'
import GetInfo from './view/GetInfo/GetInfo'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Landing/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/getinfo" element={ <GetInfo/> } />
        
      </Routes>
    </>
  );
}

export default App;
