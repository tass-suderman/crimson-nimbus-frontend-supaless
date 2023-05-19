import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CrimsonOSMockStartup from './Components/Shared/CrimsonOSMockStartup';
import './App.css';
import CrimsonOSLanding from './Components/Core/CrimsonOSLanding';

function App() {
  return (
    <Routes>
        <Route path='/' element={<CrimsonOSMockStartup/>}/>
        <Route path='/gameplay/:sessionid' element={<CrimsonOSLanding gameplay={true}/>}/>
        <Route path='/login' element={<CrimsonOSLanding gameplay={false}/>}/>
    </Routes>
  );
}

export default App;
