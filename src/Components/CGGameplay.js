import { Component, useEffect, useState}  from 'react';
import { Box, Center, Container, Text } from '@chakra-ui/react';

const style = {
    minWidth: "1000px",
    padding: "0px",
    display: "inline-block",
    position: "absolute",
    top: "10%",
    left: "23%"
}




export default function CGGameplay(props)
{
    const [login, setLogin] = useState(true);
    const [newChar, setNewChar] = useState(false);
    
    useEffect(() => {

    })

    function HomePage()
    {
        const [curBG, setBG] = useState('/images/crimsonos/game/cg_start.png')

        return (
            <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} p={4} color='white' style={{ 
                backgroundImage: "url('/images/crimsonos/game/cg_start.png')",
            }}>
                <Container m={1} maxW="full" pos="absolute" top={'65%'}>
                    <Text fontSize='2xl' textAlign={'center'}>Our dear fighter, {props.name} has arrived. Shall we start the fight? </Text>
                </Container>
                <Box as='button' w={'25%'} pos="absolute" top={'80%'} left={'40%'} onClick={() => {setLogin(false);} }>
                    <img src={'/images/crimsonos/game/begin_fight.png'} alt="" />
                </Box>
            </Box>
        )
        

    }

    return (
        <Container style={style}>
            {
                login &&
                <HomePage/>
            }
            <img src='/images/crimsonos/CrimsonOS_Window_BASE.png' alt=""/>
        </Container>
    )
}