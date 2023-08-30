import { useEffect }  from 'react';
import { Center, Container, Flex, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const startupStyle = 
{
    backgroundImage: "url('./images/background/CrimsonOS_BG.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative"
}

/**
 * This React component just emulates a mock MacOs like startup sequence.
 * This mostly runs for like 3 seconds before handling off to the login page.
 * @returns
 */
export default function CrimsonOSMockStartup()
{

    const navigate = useNavigate();

    useEffect(() => {
        setInterval(() => {
            navigate('login');
        }, 3000)
    }, [navigate])

        return (
            <Container maxW="100%" h={"100vh"} padding={'0'} style={startupStyle}>
                <Flex w={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
                    <Center>
                        <VStack>
                            <img src={'/images/loading/crimsonos_startup.gif'} alt='' width={"75%"}/>
                            <img src={'/images/loading/crimsonos_service_Startup.gif'}  alt='' width={"20%"}/>
                        </VStack>
                    </Center>
                </Flex>
            </Container>
        )
        

    


}