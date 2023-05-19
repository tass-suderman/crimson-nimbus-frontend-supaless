import { Component, useEffect, useState}  from 'react';
import { Center, Container, Text } from '@chakra-ui/react';
import CrimsonOSMockStartup from '../Shared/CrimsonOSMockStartup';
import { useLocation } from 'react-router-dom'
import Moment from 'react-moment';
import 'moment-timezone';
import MainGameWindowBase from '../Shared/MainGameWindowBase';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const startupStyle = 
{
    backgroundImage: "url('/images/crimsonos/CrimsonOS_BG.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
}



export default function CrimsonOSLanding(props)
{
    const [uiElem, setUIElem] = useState(0);
    const [credit, setCredit] = useState(false)
    const [displayGame, setGmae] = useState(false)
    const [sessionCookie, setSessionCookie] = useState({})

    const { sessionid } = useParams();
    const Navigate = useNavigate();
    const location = useLocation();
 
    // Not fun, for sure :) 
    useEffect(() => {

        // //Runs on gameplay
        // if (props.gameplay && Cookies.get('sessionid') && sessionid)
        // {
        //     //If you have a token already, either that or cookie, and you are not in current router, move. //NOT FINAL
        //     if (!(location.pathname.includes('/gameplay/')))
        //     {
        //         Navigate(`/gameplay/${Cookies.get('sessionid')}`)
        //     }

        //     // Check whether or not the session Id is equals to the sessionID placed in the browser
        //     if (!(sessionid == Cookies.get('sessionid')))
        //     {
        //             Navigate('/login')
        //     }
        // }

        // else
        // {
        //     if (location.pathname.includes('/gameplay/'))
        //     {
        //         Navigate('/login')
        //     }
        // }

        setTimeout(() => {
            setUIElem(1);
            setTimeout(() => {
                setUIElem(2);
                setTimeout(() => {
                    setUIElem(3);
                    
                    setCredit(true);

                    setTimeout(() => {
                        setGmae(true)
                    }, 600)

                }, 500)
            }, 500)
        }, 500);

        
    }, [])


    return (
       <Container maxW="100%" h={"100vh"} padding={'0'} style={startupStyle}>
            {credit && <Text fontSize={'lg'} pos="absolute" top={'5px'} left={'70px'}>Crimson OS Credits</Text> }
            <Container maxW="100%" h={"100vh"} padding={'0'} style={{backgroundImage: `url("./images/crimsonos/crimsonui${uiElem}.png")`, backgroundRepeat: "no-repeat", backgroundSize: "contain"}}  >
                {displayGame && <MainGameWindowBase/> }
            </Container>
       </Container>
    )
}