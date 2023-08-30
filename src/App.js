import { Routes, Route } from "react-router-dom";
import CrimsonOSMockStartup from './Components/Shared/CrimsonOSMockStartup';
import './styles/App.css';
import CrimsonOSLanding from './Components/Core/CrimsonOSLanding';
import { useCookies} from 'react-cookie';

function App() {
    const [cookies, setCookie] = useCookies(['user']);

    async function loginUser(userInformation) {
        const {accessToken, tokenType, expiry} = userInformation;
        await setCookie('user', {accessToken, tokenType}, {path: '/', maxAge: expiry});
        window.location='/gameplay'
    }


  return (
    <Routes>
        <Route path='/' element={<CrimsonOSMockStartup/>}/>
        <Route path='/gameplay' element={<CrimsonOSLanding user={cookies.user} gameplay={true}/>}/>
        <Route path='/login' element={<CrimsonOSLanding gameplay={false} getUserData={loginUser}/>}/>
    </Routes>
  );
}

export default App;
