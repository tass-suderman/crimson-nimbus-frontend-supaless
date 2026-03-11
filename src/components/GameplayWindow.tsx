import { useEffect, useState}  from 'react';
import { Container } from '@chakra-ui/react';
import CGGameplay from './CGGameplay';
import axios from 'axios';
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom';

interface UserProfile {
	userName?: string;
	avatar?: string;
}

/**
 * This React Component serves as the main handler of the CGGameplay Component which contains the logic and animation for our battle and character selecting.
 * Essentially, the role of this component is to allow access to the gameplay component of the web application IF you are authenticated.
 *
 * If you are not authenticated, you are not allowed to access the gameplay and have to be authenticated,
 * @returns 
 */
export default function GameplayWindow()
{
    const [loading, setLoading] = useState(true)
    const [userProfile, setProfile] = useState({} as UserProfile)
    const [cookies] = useCookies();
		const navigate = useNavigate();

    async function getUserInformation(){

        const {tokenType,accessToken} = cookies.user;
        if(!accessToken||!tokenType){
            cookies.remove('user')
						navigate('/login')
        }
        else {
            axios.defaults.headers.common['Authorization'] = `${tokenType} ${accessToken}`
            const discordRes = await axios.post(`${import.meta.env.VITE_REACT_APP_FETCH_BASE}/login`);
            if (discordRes.status !== 200) {
                cookies.remove('user')
								navigate('/login')
            }
            else{
                setProfile(discordRes.data)
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        if(!userProfile.userName) {
            getUserInformation();
        }
    })
        return(
					<Container maxW="100%" h={"100vh"} padding={'0'} style={{backgroundImage: `url("/images/background/CrimsonOS_BG.png")`, backgroundRepeat: "repeat", backgroundSize: "cover"}}  >
                {loading && 
                    <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "35%", left: "32%", zIndex: 100}}>
                        <img src='/images/loading/crimsonos_retrieving.gif' alt=""/>
                    </div>
                }
                <CGGameplay name={userProfile.userName}/>
        </Container>
            
        )


}
