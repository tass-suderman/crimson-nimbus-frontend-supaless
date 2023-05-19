import { Component, useEffect, useState}  from 'react';
import { Center, Container, Text } from '@chakra-ui/react';
import CrimsonOSMockStartup from '../Shared/CrimsonOSMockStartup';
import Moment from 'react-moment';
import 'moment-timezone';
import MainGameWindowBase from '../Shared/MainGameWindowBase';

const startupStyle = 
{
    backgroundImage: "url('./images/crimsonos/CrimsonOS_BG.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
}



export default function CrimsonOSLanding()
{
    const [uiElem, setUIElem] = useState(0);
    const [credit, setCredit] = useState(false)

 
    // Not fun, for sure :) 
    useEffect(() => {
        setTimeout(() => {
            setUIElem(1);
            setTimeout(() => {
                setUIElem(2);
                setTimeout(() => {
                    setUIElem(3);
                    setCredit(true);
                }, 500)
            }, 500)
        }, 500);




    }, [])


    return (
       <Container maxW="100%" h={"100vh"} padding={'0'} style={startupStyle}>
            {credit && <Text fontSize={'lg'} pos="absolute" top={'5px'} left={'70px'}>Crimson OS Credits</Text> }
            <Container maxW="100%" h={"100vh"} padding={'0'} style={{backgroundImage: `url("./images/crimsonos/crimsonui${uiElem}.png")`, backgroundRepeat: "no-repeat", backgroundSize: "contain"}}  >
                {credit && <MainGameWindowBase/> }
            </Container>
       </Container>
    )
}