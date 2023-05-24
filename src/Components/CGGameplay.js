import { Component, useEffect, useState}  from 'react';
import { Box, Center, Container, Text, HStack, Stack, VStack, Image, Flex, Heading, FormControl, FormLabel, Input, Button, SimpleGrid, Spacer } from '@chakra-ui/react';
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
        const [loading, setLoading] = useState(true);

        useEffect(() => {
        
            // Get stuff from the database. Especially determining how many characters that this user has created
            async function determineCustomCharNum()
            {
                axios.get('/characters/user').then(function (response)
                {
                    setCustomChar(response.data.length) 
                    setLoading(false);
                })
            }

            determineCustomCharNum();

        }, [])


        return (

            <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} p={4} color='white' style={{ 
                backgroundImage: "url('/images/crimsonos/game/cg_menu.png')",
            }}>

            {
                loading &&
                <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "32%", left: "18%", zIndex: 100}}>
                    <img src='/images/crimsonos/crimsonos_processing.gif' alt=""/>
                </div>
            }

            {
                !loading &&
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
            }

                   
            </Box>
        )
    }

    
    //React Subcomponent for the creating char
    function CreateCharPage()
    {
       const [loading, setLoading] = useState(true);
       const [preview, setPreview] = useState(null);
       const [success, setSuccess] = useState(false);
       const [transWin, setTransWin] = useState(false);
       const [transmit, setTrans] = useState('/images/crimsonos/crimsonos_transmit.gif')
       
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

       //Setting up google cloud bucket

        useEffect(() => {
            async function fetchChars()
            {
                //fetch stuff goes here....annddddddd
                axios.get('/character/newroll').then(function (response) {
                    setChars(response.data);
                    setLoading(false)
                });

            }


            fetchChars();
            
        }, [])


        const onChangePreview = e => {
            setPreview(URL.createObjectURL(e.target.files[0]));
        }

        async function handleSubmit(event) {
            event.preventDefault();

            setTransWin(true)

            const newUserData = {
                name:  event.target.name.value,
                weight: parseInt(event.target.weight.value),
                height: parseInt(event.target.height.value),
                intelligence: parseInt(event.target.intelligence.value),
                strength: parseInt(event.target.strength.value),
                durability: parseInt(event.target.durability.value),
                combat: parseInt(event.target.combat.value),
                power: parseInt(event.target.power.value),
                speed: parseInt(event.target.speed.value),
                url: 'boogle'
            }

            await axios.post('/character/new', newUserData).then(() => {
                setTrans('/images/crimsonos/trasnmit6.png');
                setSuccess(true);
            });
         }


        return (
            <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} p={4} color='white' style={{ 
                backgroundImage: "url('/images/crimsonos/game/createfighter_bg.png')",
            }}>
                <Box as='button' onClick={() => {setMenu(true); setViewChar(false); } }>
                        <img src={'/images/crimsonos/game/xbutton.png'} alt="" />
                </Box>  

                {
                        (!loading && transWin) &&
                        <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "32%", left: "18%", zIndex: 100}}>
                            {
                                success &&
                                <Box as='button' onClick={() => {setViewChar(false); setViewBattle(true) } } position={'absolute'} left={'35%'} bottom={'10%'}>
                                    <img src={'/images/crimsonos/battleupbtn.png'} alt="" style={{width: "40%"}}/>
                                </Box>  

                            }
                            <img src={transmit} alt=""/>
                        </div>
                }

                {
                    loading &&
                    <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "32%", left: "18%", zIndex: 100}}>
                        <img src='/images/crimsonos/crimsonos_processing.gif' alt=""/>
                    </div>
                }

                {
                   
                    (!loading && !transWin)  &&
                    
                    <Box id={'FORM CONTROL'} w='100%' >
 
                        <VStack mt={4}>
                            <Image src={preview == null ? '/images/crimsonos/game/default-pic.png' : preview} boxSize='95px'  borderRadius='full' objectFit='cover'/>
                            <form style={{display: "flex", gap: "25px", flexWrap: "wrap", width: "80%"}} onSubmit={handleSubmit}>
                                <SimpleGrid columns={2} spacing={10}>
                                    <FormControl isRequired>
                                        <FormLabel>Character name</FormLabel>
                                        <Input type="text" name='name' placeholder="e.g. Cloud Man" />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Character Avatar</FormLabel>
                                        <Input type="file" accept='image/png, image/jpeg' name='avatar' onChange={onChangePreview}/>
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
                                            <FormControl isRequired>
                                                <Input type='text' name='combat' disabled={disableCombat} value={infCombat} placeholder=''/>
                                            </FormControl>
                                        </Flex>
                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disableDurability} onClick={() => {
                                                setInfDura(rerollChars[currentArrayIndex].durability);
                                                setDisDura(true);
                                                setIndex(currentArrayIndex == 7 ? currentArrayIndex :currentArrayIndex + 1);
                                             }} >
                                                <img src={disableDurability ? '/images/crimsonos/game/SELECTION/Durability2.png' : '/images/crimsonos/game/SELECTION/Durability1.png'}/>
                                            </Box>  
                                            <FormControl isRequired>
                                                <Input type='text' name='durability' disabled={disableDurability} value={infDurability} placeholder=''/>
                                            </FormControl>

                                        </Flex>
                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disableHeight} onClick={() => {
                                                setInfHeight(rerollChars[currentArrayIndex].height);
                                                setDisHeight(true);
                                                setIndex(currentArrayIndex == 7 ? currentArrayIndex :currentArrayIndex + 1);
                                             }} >
                                                <img src={disableHeight ? '/images/crimsonos/game/SELECTION/height2.png' : '/images/crimsonos/game/SELECTION/height1.png'}/>
                                            </Box>  
                                            <FormControl isRequired>
                                                <Input type='text' name='height' disabled={disableHeight} value={infHeight} placeholder=''/>
                                            </FormControl>
                                        </Flex>
                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disableIntelligence} onClick={() => {
                                                setInfIntelli(rerollChars[currentArrayIndex].intelligence);
                                                setDisIntelli(true);
                                                setIndex(currentArrayIndex == 7 ? currentArrayIndex :currentArrayIndex + 1);
                                             }} >
                                                <img src={disableIntelligence ? '/images/crimsonos/game/SELECTION/intelligence2.png' : '/images/crimsonos/game/SELECTION/intelligence1.png'}/>
                                            </Box>  
                                            <FormControl isRequired>
                                                <Input type='text' name='intelligence' disabled={disableIntelligence} value={infIntelligence} placeholder=''/>
                                            </FormControl>
                                        </Flex>

                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disablePower} onClick={() => {
                                                setInfPower(rerollChars[currentArrayIndex].power);
                                                setDisPower(true);
                                                setIndex(currentArrayIndex + 1);
                                             }} >
                                                <img src={disablePower ? '/images/crimsonos/game/SELECTION/power2.png' : '/images/crimsonos/game/SELECTION/power1.png'}/>
                                            </Box>  
                                            <FormControl isRequired>
                                                <Input type='text' name='power' disabled={disablePower} value={infPower} placeholder=''/>
                                            </FormControl>
                                        </Flex>

                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disableSpeed}  onClick={() => {
                                                setInfSpeed(rerollChars[currentArrayIndex].speed);
                                                setDisSpeed(true);
                                                setIndex(currentArrayIndex == 7 ? currentArrayIndex :currentArrayIndex + 1);
                                             }} >
                                                <img src={disableSpeed ? '/images/crimsonos/game/SELECTION/speed2.png' : '/images/crimsonos/game/SELECTION/speed1.png'}/>
                                            </Box>  
                                            <Input type='text' name='speed' disabled={disableSpeed} value={infSpeed} placeholder=''/>
                                        </Flex>
                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disableStrength} onClick={() => {
                                                ssetInfsStren(rerollChars[currentArrayIndex].strength);
                                                setDisStren(true);
                                                setIndex(currentArrayIndex == 7 ? currentArrayIndex :currentArrayIndex + 1);
                                             }} >
                                                <img src={disableStrength ? '/images/crimsonos/game/SELECTION/Strength2.png' : '/images/crimsonos/game/SELECTION/Strength1.png'}/>
                                            </Box>  
                                            <FormControl isRequired>
                                                <Input type='text' name='strength' disabled={disableStrength} value={infStrength} placeholder=''/>
                                            </FormControl>
                                        </Flex>
                                        <Flex gap={'25px'}>
                                            <Box as='button' type={'button'} disabled={disableWeight} onClick={() => {
                                                setInfWeight(rerollChars[currentArrayIndex].weight);
                                                setDisWeight(true);
                                                setIndex(currentArrayIndex == 7 ? currentArrayIndex :currentArrayIndex + 1);
                                             }} >
                                                <img src={disableWeight ? '/images/crimsonos/game/SELECTION/weight2.png' : '/images/crimsonos/game/SELECTION/weight1.png'}/>
                                            </Box>
                                            <FormControl isRequired>
                                                <Input type='text' name='weight' disabled={disableWeight} value={infWeight} placeholder=''/>
                                            </FormControl>
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
                                
                                <Box as='button' position={'absolute'} top={'93%'} left={'42%'} type={'submit'} disabled={transWin}>
                                    <img src={'/images/crimsonos/game/SELECTION/transmitbtn.png'} style={{width: "30%"}}/>
                                </Box> 
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
            const [charsToFight, setChars] = useState([])
            const [yourChars, setYoursChars] = useState([])
            const [currentArrayIndex, setIndex] = useState(0);

            useEffect(() => {
                async function fetchChars()
                {
                    await axios.get('/character/newroll/')
                    .then(function (response)
                    {
                            setChars(response.data) 
                    })

                    await axios.get('/characters/user').then(function (response)
                    {
                        console.log(response.data)
                        setYoursChars(response.data) 
                        
                    })

                    setLoading(false);
                }

                fetchChars();

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

                    {
                        !loading &&

                        <Container w={'100%'} m={0}>
                            <HStack  w={'100%'}>
                                <VStack alignContent={'center'} justifyContent={'center'} mt={'70'} >
                                        <Image src={`${charsToFight[currentArrayIndex].imagePrefix}/lg/${charsToFight[currentArrayIndex].imageSuffix}`} borderRadius='full' boxSize='200px'/>
                                        <HStack gap={'25'}>
                                            <VStack w={'auto'}>
                                                <h1 style={{textShadow: "3px 3px black"}} >WEIGHT: {charsToFight[currentArrayIndex].weight}</h1>
                                                <h1 style={{textShadow: "3px 3px black"}} >HEIGHT: {charsToFight[currentArrayIndex].height}</h1>
                                                <h1 style={{textShadow: "3px 3px black"}} >INTELLIGENCE: {charsToFight[currentArrayIndex].intelligence}</h1>
                                                <h1 style={{textShadow: "3px 3px black"}} >STRENGTH: {charsToFight[currentArrayIndex].strength}</h1>
                                            </VStack>
                                            <VStack w={'auto'}>
                                            <h1 style={{textShadow: "3px 3px black"}} >DURABILITY: {charsToFight[currentArrayIndex].durability}</h1>
                                            <h1 style={{textShadow: "3px 3px black"}} >COMBAT: {charsToFight[currentArrayIndex].combat}</h1>
                                            <h1 style={{textShadow: "3px 3px black"}} >POWER: {charsToFight[currentArrayIndex].power}</h1>
                                            <h1 style={{textShadow: "3px 3px black"}} >SPEED: {charsToFight[currentArrayIndex].speed}</h1>
                                            </VStack>
                                        </HStack>
                                        <Spacer/>
                                        <Spacer/>
                                        <Spacer/>
                                        <Spacer/>
                                        <Spacer/>
                                        <Spacer/>
                                        <Text fontSize='4xl'  style={{textShadow: "3px 3px black"}}>{charsToFight[currentArrayIndex].name}</Text>
                                        
                                </VStack>
                                
                                <VStack alignContent={'center'} justifyContent={'center'} pt={'71'} >
                                    <HStack>
                                        <Box as='button' onClick={() => {setIndex(currentArrayIndex != 0 ? currentArrayIndex - 1 : currentArrayIndex)} }>
                                            <img src={'/images/crimsonos/game/lbutton.png'} alt="" />
                                        </Box>  
                                        <Image src={`${charsToFight[currentArrayIndex].imagePrefix}/lg/${charsToFight[currentArrayIndex].imageSuffix}`} borderRadius='full' boxSize='200px'/>
                                        <Box as='button' onClick={() => {setIndex(currentArrayIndex != charsToFight.length - 1 ? currentArrayIndex + 1 : currentArrayIndex)} }>
                                            <img src={'/images/crimsonos/game/rbutton.png'} alt="" />
                                        </Box>  
                                    </HStack>
                                        
                                        <HStack gap={'25'}>
                                            <VStack w={'auto'}>
                                                <h1 style={{textShadow: "3px 3px black"}} >WEIGHT: {charsToFight[currentArrayIndex].weight}</h1>
                                                <h1 style={{textShadow: "3px 3px black"}} >HEIGHT: {charsToFight[currentArrayIndex].height}</h1>
                                                <h1 style={{textShadow: "3px 3px black"}} >INTELLIGENCE: {charsToFight[currentArrayIndex].intelligence}</h1>
                                                <h1 style={{textShadow: "3px 3px black"}} >STRENGTH: {charsToFight[currentArrayIndex].strength}</h1>
                                            </VStack>
                                            <VStack w={'auto'}>
                                            <h1 style={{textShadow: "3px 3px black"}} >DURABILITY: {charsToFight[currentArrayIndex].durability}</h1>
                                            <h1 style={{textShadow: "3px 3px black"}} >COMBAT: {charsToFight[currentArrayIndex].combat}</h1>
                                            <h1 style={{textShadow: "3px 3px black"}} >POWER: {charsToFight[currentArrayIndex].power}</h1>
                                            <h1 style={{textShadow: "3px 3px black"}} >SPEED: {charsToFight[currentArrayIndex].speed}</h1>
                                            </VStack>
                                        </HStack>
                                        <Spacer/>
                                        <Spacer/>
                                        <Spacer/>
                                        <Spacer/>
                                        <Spacer/>
                                        <Spacer/>
                                        <Text fontSize='4xl'  style={{textShadow: "3px 3px black"}}>{charsToFight[currentArrayIndex].name}</Text>
                                        
                                </VStack>

                            
                            





                                    
                            </HStack>
                        </Container>





                    }
                        
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