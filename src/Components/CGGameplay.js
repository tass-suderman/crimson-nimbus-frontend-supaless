import { Component, useEffect, useState}  from 'react';
import { Box, Center, Container, Text, HStack, Stack, VStack } from '@chakra-ui/react';
import axios from 'axios';


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
    const [menu, setMenu] = useState(false);
    const [viewBattle, setViewBattle] = useState(false);
    const [viewScore, setViewScore] = useState(false);
    const [viewChar, setViewChar] = useState(false);
    const [curVillianRoll, setVillianRoll] = useState([])

    // Get stuff from the database.
    async function villianRoll()
    {
        axios.get('http://localhost:7455/character/newroll', {headers: {"Authorization": "MTEwOTUxMDcyNDExMzQwODA0MQ.GR4UrB.lzqoBesvqlq2KtUSaTNJi6OpRhrSyNeUd98yq0" }})
        .then(function (response)
        {
            console.log(response.data)
            setVillianRoll(response.data)
        })
    }
    
    useEffect(() => {
        
        // Get stuff from the database.
    }, [])

    //React Subcomponent for the Homepage
    function HomePage()
    {
        return (
            <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} p={4} color='white' style={{ 
                backgroundImage: "url('/images/crimsonos/game/cg_start.png')",
            }}>
                <Container m={1} maxW="full" pos="absolute" top={'65%'}>
                    <Text fontSize='2xl' textAlign={'center'}>Our dear fighter, {props.name} has arrived. Shall we start the fight? </Text>
                </Container>
                <Box as='button' w={'25%'} pos="absolute" top={'80%'} left={'40%'} onClick={() => {setLogin(false); setMenu(true); } }>
                    <img src={'/images/crimsonos/game/begin_fight.png'} alt="" />
                </Box>
            </Box>
        )
        
    }

    //React Subcomponent for the MenuPage
    function MenuPage()
    {
        const [numOfCustomChar, setCustomChar] = useState(0);

        useEffect(() => {
        
            // Get stuff from the database. Especially determining how many characters that this user has created
            setCustomChar(0); // Just a test
        }, [])


        return (
            <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} p={4} color='white' style={{ 
                backgroundImage: "url('/images/crimsonos/game/cg_menu.png')",
            }}>

                <HStack spacing='24px' ml={'20%'} mt={'40%'} >
                    <Box as='button' onClick={() => {setMenu(false); setViewChar(true);} }>
                        <img src={'/images/crimsonos/game/menubutton/newcharbtn.png'} alt="" />
                    </Box>

                    <Box as='button' onClick={() => {setMenu(false); console.log("Wow!"); setViewBattle(true);}} disabled={numOfCustomChar <= 0 ? true : false}>
                    <img src={ numOfCustomChar <= 0 ? '/images/crimsonos/game/menubutton/fightbtn2.png' : '/images/crimsonos/game/menubutton/fightbtn1.png'} alt="" />
                    </Box>

                    <Box as='button' onClick={() => {setMenu(false); setViewScore(true); } }>
                        <img src={'/images/crimsonos/game/menubutton/scorebtn.png'} alt="" />
                    </Box>
                </HStack>    
            </Box>
        )
    }

    
    //React Subcomponent for the creating char
    function CreateCharPage()
    {
       const [loading, setLoading] = useState(true);

        useEffect(() => {

        }, [])


        return (
            <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} p={4} color='white' style={{ 
                backgroundImage: "url('/images/crimsonos/game/createfighter_bg.png')",
            }}>
                {
                    loading &&
                    <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "32%", left: "18%", zIndex: 100}}>
                        <img src='/images/crimsonos/crimsonos_processing.gif' alt=""/>
                    </div>
                }
                    <Box as='button' onClick={() => {setMenu(true); setViewChar(false);} }>
                        <img src={'/images/crimsonos/game/xbutton.png'} alt="" />
                    </Box>  
            </Box>
        )
    }

        //React Subcomponent for selecting characters and fighting with the villians
        function BattleGamePage()
        {
           
            const [loading, setLoading] = useState(true);
    
            useEffect(() => {
    
            }, [])
    
    
            return (
                <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} p={4} color='white' style={{ 
                    backgroundImage: "url('/images/crimsonos/game/battleground_bg.png')",
                }}>
                {
                    loading &&
                    <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "32%", left: "18%", zIndex: 100}}>
                        <img src='/images/crimsonos/crimsonos_processing.gif' alt=""/>
                    </div>
                }
                        <Box as='button' onClick={() => {setMenu(true); setViewBattle(false);} }>
                            <img src={'/images/crimsonos/game/xbutton.png'} alt="" />
                        </Box>  
                </Box>
            )
        }

    //React subcomponent for determining high scores of each user's characters!
    function ScorePage()
    {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            
        }, [])

        return (
            <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} p={4} color='white' style={{ 
                backgroundImage: "url('/images/crimsonos/game/score_bg.png')",
            }}>
                {
                    loading &&
                    <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "32%", left: "18%", zIndex: 100}}>
                        <img src='/images/crimsonos/crimsonos_processing.gif' alt=""/>
                    </div>
                }
                    <Box as='button' onClick={() => {setMenu(true); setViewScore(false);} }>
                        <img src={'/images/crimsonos/game/xbutton.png'} alt="" />
                    </Box>  
            </Box>
        )

    }    

    return (
        <Container style={style}>
            {
                viewScore &&
                <ScorePage/>
            }
            {
                viewBattle &&
                <BattleGamePage/>
            }
            {
                viewChar &&
                <CreateCharPage/>
            }
            {
                menu &&
                <MenuPage/>
            }
            {
                login &&
                <HomePage/>
            }
            <img src='/images/crimsonos/CrimsonOS_Window_BASE.png' alt=""/>
        </Container>
    )
}