import { Component, useEffect, useState}  from 'react';
import { AbsoluteCenter, Box, Center, Container, Flex, Image, Text, VStack } from '@chakra-ui/react';
import CrimsonOSLanding from '../Core/CrimsonOSLanding';
import { useNavigate, useParams } from 'react-router-dom';

const startupStyle = 
{
    backgroundImage: "url('./images/crimsonos/CrimsonOS_BG.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative"
}


export default function CrimsonOSMockStartup()
{

    const navigate = useNavigate();

    useEffect(() => {
        setInterval(() => {
            navigate('login');
        }, 3000)
    }, [])

        return (
            <Container maxW="100%" h={"100vh"} padding={'0'} style={startupStyle}>
                <Flex w={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
                    <Center>
                        <VStack>
                            <img src={'./images/crimsonos/crimsonos_startup.gif'} alt='' width={"75%"}/>
                            <img src={'./images/crimsonos/crimsonos_service_Startup.gif'}  alt='' width={"20%"}/>
                        </VStack>
                    </Center>
                </Flex>
            </Container>
        )
        

    


}