import { useEffect, useState}  from 'react';
import { Container, Text, Image } from '@chakra-ui/react';
import CGGameplay from '../CGGameplay';
import axios from 'axios';
import {useCookies} from 'react-cookie'

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
    const [userProfile, setProfile] = useState({})
    const [cookies] = useCookies();

    async function getUserInformation(){

        const {tokenType,accessToken} = cookies.user;
        if(!accessToken||!tokenType){
            cookies.remove('user')
            window.location='/login'
        }
        else {
            axios.defaults.headers.common['Authorization'] = `${tokenType} ${accessToken}`
            const discordRes = await axios.post(`${process.env.REACT_APP_FETCH_BASE}/login`);
            if (discordRes.status !== 200) {
                cookies.remove('user')
                window.location = '/login'
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
            <Container maxW="100%" h={"100vh"}>
                { loading && 
                
                    <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "35%", left: "32%", zIndex: 100}}>
                        <img src='/images/loading/crimsonos_retrieving.gif' alt=""/>
                    </div>
                
                }

                {!loading &&
                    <div left={'15px'} style={{minWidth: "250px",
                        minHeight: "200px",
                        padding: "13px",
                        display: "inline-block",
                        position: "absolute",
                        top: "72.3%",
                        left: "76%"}}>
                            
                            <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "24.3%", left: "7%"}}>
                                <Image borderRadius='full' boxSize='125px' objectFit='cover' src={userProfile.avatar} />
                                <Text fontSize='1xl'>
                                    {userProfile.userName}
                                </Text>
                            </div>


                        <img src='/images/background/crimsonuser.png' alt=""/>
                    </div>
                }
                <CGGameplay name={userProfile.userName}/>
            </Container>
            
        )


}