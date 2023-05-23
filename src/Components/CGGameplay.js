import { Component, useEffect, useState}  from 'react';
import { Box, Center, Container, Text, HStack, Stack, VStack, Image, Flex, Heading, FormControl, FormLabel, Input, Button, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import { Form } from 'react-router-dom';


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
       const [preview, setPreview] = useState(null);
       
       //usestate for each individual attrbiute
       const [disableCombat, setDisCombat] = useState(false);
       const [disableDurability, setDisDura] = useState(false);
       const [disableHeight, setDisHeight] = useState(false);
       const [disableIntelligence, setDisIntelli] = useState(false);
       const [disablePower, setDisPower] = useState(false);
       const [disableSpeed, setDisSpeed] = useState(false);
       const [disableStrength, setDisStren] = useState(false);
       const [disableWeight, setDisWeight] = useState(false);

       //usestate foreach individual attribute value
       const [infCombat, setInfCombat] = useState(null);
       const [infDurability, setInfDura] = useState(null);
       const [infHeight, setInfHeight] =useState(null);
       const [infIntelligence, setInfIntelli] = useState(null);
       const [infPower, setInfPower] = useState(null);
       const [infSpeed, setInfSpeed] = useState(null);
       const [infStrength, ssetInfsStren] = useState(null);
       const [infWeight, setInfWeight] = useState(null);

       //For re-rolls and current character selection
       const [rerollChars, setChars] = useState([]);
       const [currentArrayIndex, setIndex] = useState(0);

        useEffect(() => {
            async function fetchChars()
            {
                //fetch stuff goes here....annddddddd

                //Sampe data
                const data = [
                    {
                        "id": 689,
                        "name": "Venom III",
                        "weight": 334,
                        "height": 229,
                        "intelligence": 63,
                        "strength": 73,
                        "durability": 90,
                        "combat": 56,
                        "power": 73,
                        "speed": 35,
                        "imageSuffix": "689-venom-iii.jpg",
                        "imagePrefix": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/"
                    },
                    {
                        "id": 538,
                        "name": "Ra's Al Ghul",
                        "weight": 97,
                        "height": 193,
                        "intelligence": 100,
                        "strength": 28,
                        "durability": 42,
                        "combat": 100,
                        "power": 27,
                        "speed": 32,
                        "imageSuffix": "538-ras-al-ghul.jpg",
                        "imagePrefix": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/"
                    },
                    {
                        "id": 222,
                        "name": "Doctor Doom",
                        "weight": 187,
                        "height": 201,
                        "intelligence": 100,
                        "strength": 32,
                        "durability": 100,
                        "combat": 84,
                        "power": 100,
                        "speed": 20,
                        "imageSuffix": "222-doctor-doom.jpg",
                        "imagePrefix": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/"
                    },
                    {
                        "id": 230,
                        "name": "Doomsday",
                        "weight": 412,
                        "height": 244,
                        "intelligence": 75,
                        "strength": 100,
                        "durability": 100,
                        "combat": 90,
                        "power": 100,
                        "speed": 67,
                        "imageSuffix": "230-doomsday.jpg",
                        "imagePrefix": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/"
                    },
                    {
                        "id": 63,
                        "name": "Batgirl",
                        "weight": 57,
                        "height": 170,
                        "intelligence": 88,
                        "strength": 11,
                        "durability": 40,
                        "combat": 90,
                        "power": 34,
                        "speed": 33,
                        "imageSuffix": "63-batgirl.jpg",
                        "imagePrefix": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/"
                    },
                    {
                        "id": 642,
                        "name": "Superboy-Prime",
                        "weight": 77,
                        "height": 180,
                        "intelligence": 94,
                        "strength": 100,
                        "durability": 100,
                        "combat": 85,
                        "power": 100,
                        "speed": 100,
                        "imageSuffix": "642-superboy-prime.jpg",
                        "imagePrefix": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/"
                    },
                    {
                        "id": 350,
                        "name": "Jack of Hearts",
                        "weight": 79,
                        "height": 155,
                        "intelligence": 63,
                        "strength": 55,
                        "durability": 30,
                        "combat": 30,
                        "power": 77,
                        "speed": 100,
                        "imageSuffix": "350-jack-of-hearts.jpg",
                        "imagePrefix": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/"
                    },
                    {
                        "id": 20,
                        "name": "Amazo",
                        "weight": 173,
                        "height": 257,
                        "intelligence": 63,
                        "strength": 100,
                        "durability": 100,
                        "combat": 100,
                        "power": 100,
                        "speed": 83,
                        "imageSuffix": "20-amazo.jpg",
                        "imagePrefix": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/"
                    }
                ];
                setChars(data);
            }


            fetchChars();
            setLoading(false)
            
        }, [])


        const onChangePreview = e => {
            setPreview(URL.createObjectURL(e.target.files[0]));
        }

        if (!loading)
        {
            console.log(rerollChars[currentArrayIndex].imagePrefix)
        }


        return (
            <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} p={4} color='white' style={{ 
                backgroundImage: "url('/images/crimsonos/game/createfighter_bg.png')",
            }}>
                <Box as='button' onClick={() => {setMenu(true); setViewChar(false); } }>
                        <img src={'/images/crimsonos/game/xbutton.png'} alt="" />
                </Box>  

                {
                    loading &&
                    <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "32%", left: "18%", zIndex: 100}}>
                        <img src='/images/crimsonos/crimsonos_processing.gif' alt=""/>
                    </div>
                }

                {
                    !loading  &&
<Box id={'FORM CONTROL'} w='100%' >
                        <VStack mt={4}>
                            <Image src={preview == null ? '/images/crimsonos/game/default-pic.png' : preview} boxSize='120px'  borderRadius='full' objectFit='cover'/>
                            <form style={{display: "flex", gap: "25px", flexWrap: "wrap", width: "80%"}} >
                                <SimpleGrid columns={2} spacing={10}>
                                    <FormControl>
                                        <FormLabel>Character name</FormLabel>
                                        <Input type="text" placeholder="e.g. Cloud Man" />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Character Avatar</FormLabel>
                                        <Input type="file" onChange={onChangePreview}/>
                                    </FormControl>
                                </SimpleGrid>
                                {/* FOR GRABBING POWER  */}
                                <SimpleGrid columns={2} spacing={10}>
                                    <VStack h={'90%'} overflowY={'scroll'} pl={'5'} style={{direction: "rtl"}}>
                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disableCombat} onClick={() => {
                                                setInfCombat(rerollChars[currentArrayIndex].combat);
                                                setDisCombat(true);
                                                setIndex(currentArrayIndex == 7 ? currentArrayIndex :currentArrayIndex + 1);
                                             }} >
                                                <img src={disableCombat ? '/images/crimsonos/game/SELECTION/combat2.png' : '/images/crimsonos/game/SELECTION/combat1.png'}/>
                                            </Box>  
                                            <Input type='text' disabled={disableCombat} value={infCombat} placeholder=''/>
                                        </Flex>
                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disableDurability} onClick={() => {
                                                setInfDura(rerollChars[currentArrayIndex].durability);
                                                setDisDura(true);
                                                setIndex(currentArrayIndex == 7 ? currentArrayIndex :currentArrayIndex + 1);
                                             }} >
                                                <img src={disableDurability ? '/images/crimsonos/game/SELECTION/Durability2.png' : '/images/crimsonos/game/SELECTION/Durability1.png'}/>
                                            </Box>  
                                            <Input type='text' disabled={disableDurability} value={infDurability} placeholder=''/>
                                        </Flex>
                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disableHeight} onClick={() => {
                                                setInfHeight(rerollChars[currentArrayIndex].height);
                                                setDisHeight(true);
                                                setIndex(currentArrayIndex == 7 ? currentArrayIndex :currentArrayIndex + 1);
                                             }} >
                                                <img src={disableHeight ? '/images/crimsonos/game/SELECTION/height2.png' : '/images/crimsonos/game/SELECTION/height1.png'}/>
                                            </Box>  
                                            <Input type='text' disabled={disableHeight} value={infHeight} placeholder=''/>
                                        </Flex>
                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disableIntelligence} onClick={() => {
                                                setInfIntelli(rerollChars[currentArrayIndex].intelligence);
                                                setDisIntelli(true);
                                                setIndex(currentArrayIndex == 7 ? currentArrayIndex :currentArrayIndex + 1);
                                             }} >
                                                <img src={disableIntelligence ? '/images/crimsonos/game/SELECTION/intelligence2.png' : '/images/crimsonos/game/SELECTION/intelligence1.png'}/>
                                            </Box>  
                                            <Input type='text' disabled={disableIntelligence} value={infIntelligence} placeholder=''/>
                                        </Flex>

                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disablePower} onClick={() => {
                                                setInfPower(rerollChars[currentArrayIndex].power);
                                                setDisPower(true);
                                                setIndex(currentArrayIndex + 1);
                                             }} >
                                                <img src={disablePower ? '/images/crimsonos/game/SELECTION/power2.png' : '/images/crimsonos/game/SELECTION/power1.png'}/>
                                            </Box>  
                                            <Input type='text' disabled={disablePower} value={infPower} placeholder=''/>
                                        </Flex>

                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disableSpeed}  onClick={() => {
                                                setInfSpeed(rerollChars[currentArrayIndex].speed);
                                                setDisSpeed(true);
                                                setIndex(currentArrayIndex == 7 ? currentArrayIndex :currentArrayIndex + 1);
                                             }} >
                                                <img src={disableSpeed ? '/images/crimsonos/game/SELECTION/speed2.png' : '/images/crimsonos/game/SELECTION/speed1.png'}/>
                                            </Box>  
                                            <Input type='text' disabled={disableSpeed} value={infSpeed} placeholder=''/>
                                        </Flex>
                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disableStrength} onClick={() => {
                                                ssetInfsStren(rerollChars[currentArrayIndex].strength);
                                                setDisStren(true);
                                                setIndex(currentArrayIndex == 7 ? currentArrayIndex :currentArrayIndex + 1);
                                             }} >
                                                <img src={disableStrength ? '/images/crimsonos/game/SELECTION/Strength2.png' : '/images/crimsonos/game/SELECTION/Strength1.png'}/>
                                            </Box>  
                                            <Input type='text' disabled={disableStrength} value={infStrength} placeholder=''/>
                                        </Flex>
                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disableWeight} onClick={() => {
                                                setInfWeight(rerollChars[currentArrayIndex].weight);
                                                setDisWeight(true);
                                                setIndex(currentArrayIndex == 7 ? currentArrayIndex :currentArrayIndex + 1);
                                             }} >
                                                <img src={disableWeight ? '/images/crimsonos/game/SELECTION/weight2.png' : '/images/crimsonos/game/SELECTION/weight1.png'}/>
                                            </Box>  
                                            <Input type='text' disabled={disableWeight} value={infWeight} placeholder=''/>
                                        </Flex>
                                    </VStack>
                                    <VStack alignContent={'center'} justifyContent={'center'}  mb={'50'}>
                                        <Image src={`${rerollChars[currentArrayIndex].imagePrefix}/lg/${rerollChars[currentArrayIndex].imageSuffix}`} borderRadius='full' boxSize='150px'/>
                                        <Text fontSize='3xl' style={{textShadow: "3px 3px black"}}>{rerollChars[currentArrayIndex].name}</Text>
                                        <HStack gap={'25'}>
                                            <VStack w={'auto'}>
                                                <h1 style={{textShadow: "3px 3px black"}} >WEIGHT: {rerollChars[currentArrayIndex].weight}</h1>
                                                <h1 style={{textShadow: "3px 3px black"}} >HEIGHT: {rerollChars[currentArrayIndex].height}</h1>
                                                <h1 style={{textShadow: "3px 3px black"}} >INTELLIGENCE: {rerollChars[currentArrayIndex].intelligence}</h1>
                                                <h1 style={{textShadow: "3px 3px black"}} >STRENGTH: {rerollChars[currentArrayIndex].strength}</h1>
                                            </VStack>
                                            <VStack w={'auto'}>
                                            <h1 style={{textShadow: "3px 3px black"}} >DURABILITY: {rerollChars[currentArrayIndex].durability}</h1>
                                            <h1 style={{textShadow: "3px 3px black"}} >COMBAT: {rerollChars[currentArrayIndex].combat}</h1>
                                            <h1 style={{textShadow: "3px 3px black"}} >POWER: {rerollChars[currentArrayIndex].power}</h1>
                                            <h1 style={{textShadow: "3px 3px black"}} >SPEED: {rerollChars[currentArrayIndex].speed}</h1>
                                            </VStack>
                                        </HStack>
                                    </VStack>
                                </SimpleGrid>
                                
                            </form>
                        </VStack>
                    </Box>
                    

                }

                    

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