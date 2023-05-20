import { Component, useEffect, useState}  from 'react';
import { Center, Container, Text } from '@chakra-ui/react';
import CrimsonOSMockStartup from '../Shared/CrimsonOSMockStartup';
import { useLocation } from 'react-router-dom'
import Moment from 'react-moment';
import 'moment-timezone';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginWindow from './LoginWindow';
import GameplayWindow from './GameplayWindow';
import { createClient } from '@supabase/supabase-js'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'


const startupStyle = 
{
    backgroundImage: "url('/images/crimsonos/CrimsonOS_BG.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    
}

export default function CrimsonOSLanding(props)
{
    const [loginState, setLoginState] = useState(false);
    const [gameplayState, setGamePlayState] = useState(false);
 
    // Not fun, for sure :) 
    useEffect(() => {
        // First thing first, let's determine whether or not if we are authenticated
        if (props.gameplay)
        {
            //That means we are trying to access the game as an authenticated user, let's determine if you are not joking
            setGamePlayState(true)
        }

        else
        {
            //Nope, we are just logging in, based on the given params
            setLoginState(true);
        }
        
    }, [])


    return (
       <Container maxW="100%" h={"100vh"} padding={'0'} style={startupStyle}>
            <Text fontSize={'lg'} pos="absolute" top={'5px'} left={'70px'}>Crimson OS Credits</Text>
            <Container maxW="100%" h={"100vh"} padding={'0'} style={{backgroundImage: `url("./images/crimsonos/crimsonui3.png")`, backgroundRepeat: "no-repeat", backgroundSize: "contain"}}  >
                {loginState && <LoginWindow/>}
                {gameplayState && <GameplayWindow/>}
            </Container>
       </Container>
    )
}