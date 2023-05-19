import { Component, useEffect, useState}  from 'react';
import { Center, Container, Text } from '@chakra-ui/react';
import CrimsonOSMockStartup from '../Shared/CrimsonOSMockStartup';

const startupStyle = 
{
    backgroundImage: "url('./images/crimsonos/CrimsonOS_BG.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative"
}



export default function CrimsonOSLanding()
{
    const [uiElem, setUIElem] = useState(0);

    // Not fun, for sure :) 
    useEffect(() => {
        setTimeout(() => {
            setUIElem(1);
            setTimeout(() => {
                setUIElem(2);
                setTimeout(() => {
                    setUIElem(3);
                }, 500)
            }, 500)
        }, 500);




    }, [])

    return (
       <Container maxW="100%" h={"100vh"} padding={'0'} style={startupStyle}>
            <Container maxW="100%" h={"100vh"} padding={'0'} style={{backgroundImage: `url("./images/crimsonos/crimsonui${uiElem}.png")`, backgroundRepeat: "no-repeat", backgroundSize: "contain"}}  >

            </Container>
       </Container>
    )
}