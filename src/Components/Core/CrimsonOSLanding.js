import { useEffect, useState}  from 'react';
import { Container, Text } from '@chakra-ui/react';
import 'moment-timezone';
import LoginWindow from './LoginWindow';
import GameplayWindow from './GameplayWindow';
import { HStack, VStack, Box, Image } from '@chakra-ui/react'


const startupStyle = 
{
    backgroundImage: "url('/images/background/CrimsonOS_BG.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    
}

/**
 * This React component serves as a basis landing page for both of our major components,
 * Login and Gameplay Window Component....Which are basically the content of the login
 * functionality and the gameplay itself.
 */
export default function CrimsonOSLanding(props)
{
    const [loginState, setLoginState] = useState(false);
    const [gameplayState, setGamePlayState] = useState(false);
    const [showCreds, setShowCreds] = useState(false);
 
    useEffect(() => {
        if (props.gameplay)
        {
            setGamePlayState(true)
        }
        else
        {
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
                                <Image src={'/images/credits/tass.png'}  boxSize='54px' borderRadius='full'/>
                                <VStack >
                                    <Text fontSize='xl' p={0}><a href='https://github.com/tass-suderman'>Tass Suderman</a></Text>
                                    <Text fontSize='xs' p={0}>Logistically Smart Back-end Person</Text>
                                </VStack>
                            </HStack>
                        </Box>
                        <Box>
                            <HStack>
                                <Image src={'/images/credits/otaku.png'}  boxSize='56px' borderRadius='full'/>
                                <VStack >
                                    <Text fontSize='xl' p={0}><a href='https://github.com/otakuweebster'>Gabriel Beltran</a></Text>
                                    <Text fontSize='xs' p={0}>Self-Proclaimed Front-End Freak</Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </VStack>
                    <img src='/images/credits/crimsonos_ack_win.png' alt=""/>
                </div>
            }
            <Container maxW="100%" h={"100vh"} padding={'0'} style={{backgroundImage: `url("/images/background/crimsonui3.png")`, backgroundRepeat: "no-repeat", backgroundSize: "contain"}}  >
                {loginState && <LoginWindow getUserData={props.getUserData}/>}
                {gameplayState && <GameplayWindow/>}
            </Container>
       </Container>
    )
}