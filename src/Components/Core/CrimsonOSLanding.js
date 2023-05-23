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
import { Stack, HStack, VStack, Box, Image } from '@chakra-ui/react'


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
    const [showCreds, setShowCreds] = useState(false);
 
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
            <Text as='button' fontSize={'lg'} pos="absolute" top={'5px'} left={'70px'} onClick={() => {showCreds ? setShowCreds(false) : setShowCreds(true)}}>Crimson OS Credits</Text>
            {
                showCreds &&
                <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "10%", left: "1%", zIndex: 100}}>
                    <VStack spacing={2} position={'absolute'} top={'63%'}>
                        <Box>
                            <HStack>
                                <Image src={'/images/crimsonos/tass.png'}  boxSize='54px' borderRadius='full'/>
                                <VStack >
                                    <Text fontSize='xl' p={0}><a href='https://github.com/tass-suderman'>Tass Suderman</a></Text>
                                    <Text fontSize='xs' p={0}>Logistically Smart Back-end person</Text>
                                </VStack>
                            </HStack>
                        </Box>
                        <Box>
                            <HStack>
                                <Image src={'/images/crimsonos/otaku.png'}  boxSize='56px' borderRadius='full'/>
                                <VStack >
                                    <Text fontSize='xl' p={0}><a href='https://github.com/otakuweebster'>Gabriel Beltran</a></Text>
                                    <Text fontSize='xs' p={0}>Self-renowed Front-end Freak</Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </VStack>
                    <img src='/images/crimsonos/crimsonos_ack_win.png' alt=""/>
                </div>
            }
            <Container maxW="100%" h={"100vh"} padding={'0'} style={{backgroundImage: `url("/images/crimsonos/crimsonui3.png")`, backgroundRepeat: "no-repeat", backgroundSize: "contain"}}  >
                {loginState && <LoginWindow/>}
                {gameplayState && <GameplayWindow/>}
            </Container>
       </Container>
    )
}