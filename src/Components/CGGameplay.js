import { Component, useEffect, useState}  from 'react';
import { Box, Center, Container, Text, HStack, Stack, VStack, Image, Flex, Heading, FormControl, FormLabel, Input, Button, SimpleGrid, Spacer, Fade, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer } from '@chakra-ui/react';
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


/**
 * This is the main React component of the The Cloud Guardian
 * Includes fetching and setting data to the backend server.
 * 
 * @param {} props 
 * @returns 
 */
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
                axios.get(`${process.env.REACT_APP_FETCH_BASE}/characters/user`).then(function (response)
                {
                    console.log(response);
                    const data= response.data.filter(char => char.isActive)
                    setCustomChar(data.length) 
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
       const [battleInfo, setBattle] = useState({});


        useEffect(() => {
            async function fetchChars()
            {
                //fetch stuff goes here....annddddddd
                axios.get(`${process.env.REACT_APP_FETCH_BASE}/character/newroll`).then(function (response) {
                    
                    //For buffer purposes to avoid any erros
                    const data = response.data;
                    data[data.length] = data[data.length - 1];
                    console.log(data);
                    setChars(data);
                    setLoading(false)
                });

            }


            fetchChars();
            
        }, [])


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
                url: preview
            }

            await axios.post(`${process.env.REACT_APP_FETCH_BASE}/character/new`, newUserData).then(() => {
                setTrans('/images/crimsonos/trasnmit6.png');
                setSuccess(true);
            });
         }

         console.log(currentArrayIndex)


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
                                <SimpleGrid columns={2} spacing={20} alignContent={'center'} justifyContent={'center'}>
                                    <FormControl isRequired>
                                        <FormLabel>Character name</FormLabel>
                                        <Input type="text" name='name' placeholder="e.g. Cloud Man" maxLength={'12'}/>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Character Avatar Photo URL</FormLabel>
                                        <Input type="text"  name='avatar' onChange={(e)=> {setPreview(e.target.value);}}/>
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
                                                <Input type='text' name='combat' disabled={true} value={infCombat} placeholder=''/>
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
                                                <Input type='text' name='durability' disabled={true} value={infDurability} placeholder=''/>
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
                                                <Input type='text' name='height' disabled={true} value={infHeight} placeholder=''/>
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
                                                <Input type='text' name='intelligence' disabled={true} value={infIntelligence} placeholder=''/>
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
                                                <Input type='text' name='power' disabled={true} value={infPower} placeholder=''/>
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
                                            <Input type='text' name='speed' disabled={true} value={infSpeed} placeholder=''/>
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
                                                <Input type='text' name='strength' disabled={true} value={infStrength} placeholder=''/>
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
                                                <Input type='text' name='weight' disabled={true} value={infWeight} placeholder=''/>
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
           
            const [loading, setLoading] = useState(false);
            const [viewCharSelection, setCharSelection] = useState(true);
            const [curUserChar, setCurUserChar] = useState(null);
            const [viewFight, setViewFight] = useState(false);
            const [battle, setBattle]= useState(null);
            const [characterArray, setCharArray] = useState([]);
            const [viewAnimation, setAnimation] = useState(false);
            const [showYourChar, setYourChar] = useState(false);
            const [showOpponent, setShowOpponent] = useState(false);
            const [showFlashBang, setFlashBang] = useState(false);
            const [viewWin, setViewWin] = useState(false);
            const [viewLose, setViewLose] = useState(false);
            const [rerollStats, setViewRerollStats] = useState(false)
            const [referenceChar, setRefChar] = useState(null)
            const [disableAll, setDisableAll] = useState(false)
            
            /**
             * A Put request used to determine which character to fight, the fight mechanism, and determine which has won the round!
             */
            async function fetchBattle()
            {
                setLoading(true);
                axios.put(`${process.env.REACT_APP_FETCH_BASE}/character/battle/${curUserChar.id}`).then(function (response)
                {
                            // After it calculates, it saves the results (including the two characters (you and villian)) to the state.
                            setBattle(response.data);
                            setLoading(false);
                });

            }


            useEffect(() => {
                setLoading(true)

                // This portion fetches from the database a series of active and not killed users from the database to allow
                // users to select a character that is alive and ready to ifght
                axios.get(`${process.env.REACT_APP_FETCH_BASE}/characters/user`).then(function (response)
                {
                    const data = response.data.filter(char => char.isActive)
                    setCharArray(data)
                    setLoading(false)
                });

            }, [])

            // React Sub-sub component for selecting your characters!
            function CharSelectionView()
            {

                // When you press different characters in the character selection screen, this function fires everytime
                // to change the current character information
                function changeCurrentCharacter(id)
                {
                    setCurUserChar(characterArray.find(item => item.id == id))
                }

                //If the animation to run the fancy "Let's us fight" banner is set to true, this fires in 1.6 seconds to switch scene and call fetch battle.
                if (viewAnimation)
                {
                    setTimeout(async () => 
                    {
                        setCharSelection(false);
                        setViewFight(true);
                        setAnimation(false);
                        await fetchBattle()
                    }, 1600)
                }


                return (
                    <Box w='96.6%' h='90.4%'pos="absolute" top={'52.2px'} left={'15px'} color='white' style={{ backgroundImage: "url('/images/crimsonos/game/choose_character_bg.png')"}} id={'bruh'}>
                         <Box position={'absolute'}  as='button' onClick={() => {setMenu(true); setViewBattle(false); setCharSelection(false); }} p={'3'} zIndex={'100000'}>
                                <img src={'/images/crimsonos/game/xbutton.png'} alt="" />
                        </Box>  
                        
                        {
                            viewAnimation &&
                            <Box width='' id='letsfight'>
                                <img src="/images/crimsonos/game/charselection/letthefight.png"/>
                            </Box>
                        }
                        

                        {
                            !loading && 
                            <VStack p={0} m={0} w='100%'>
                                <HStack w='100%'>
                                        {
                                            characterArray.length == 0 &&
                                             <Box mt={'100'} ml={'25%'} p={'4'} justifyContent={'center'} style={{backgroundColor: "rgba(0, 0, 0, .5) "}}>
                                                <img src={'/images/crimsonos/game/charselection/notfound.png'}  />
                                             </Box>
                                        }
                                        {
                                            characterArray.length > 0 &&
                                            <Box mt={'100'} ml={'10'} p={'4'} style={{backgroundColor: "rgba(0, 0, 0, .5)"}}>
                                            <SimpleGrid columns={2} spacing={2} overflowY={'scroll'} h={'320px'} pr={2}>
                                                {

                                                    characterArray.map(char => (<Box as='button' height='100px' width='200px' onClick={() => {changeCurrentCharacter(char.id)}} 
                                                                                disabled={!char.isActive} style={{filter: char.isActive ? "none": "grayscale(100%)", backgroundImage: `url("${char.url}")`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                                                                                
                                                                                >
                                                                                    <Text textAlign={'center'} key={char.id} mt={'35%'} ml={'5%'} style={{textDecoration: char.isActive ? "none": "line-through", textShadow: "3px 3px black"}}>{char.name}</Text>
                                                                                </Box>))
                                                }                            
                                            </SimpleGrid>
                                        </Box>
                                        }

                                        {
                                            characterArray.length > 0 &&
                                            <Box pt={'100'} pl={'20'}>
                                                <Image src={curUserChar == null ? '/images/crimsonos/game/charselection/unknown.png' : curUserChar.url} boxSize='300px' objectFit='cover'/>
                                                <Text fontSize='3xl' style={{textShadow: "3px 3px black"}}>{curUserChar == null ? "" : curUserChar.name}</Text>
                                            </Box>
                                        }
                                </HStack>

                                {
                                    (curUserChar != null && characterArray.length > 0) &&
                                    <Box w={'full'} pt={'5'} pl={550}>
                                         <Box as='button' type={'button'} position={'absolute'} top={'70%'} left={'20%'} onClick={() => {setAnimation(true) }}>
                                            <img src={'/images/crimsonos/game/charselection/fightbtn.png'} style={{width: "80%"}}/>
                                        </Box> 
                                        <Box  w={'auto'}  style={{backgroundColor: "rgba(0, 0, 0, .5) "}} p={'2'}>
                                            
                                            <HStack gap={'25'} w={'100%'} >
                                                <VStack w={'auto'}>
                                                    <h1 style={{textShadow: "3px 3px black"}} >WEIGHT: {curUserChar.weight}</h1>
                                                    <h1 style={{textShadow: "3px 3px black"}} >HEIGHT: {curUserChar.height}</h1>
                                                    <h1 style={{textShadow: "3px 3px black"}} >INTELLIGENCE: {curUserChar.intelligence}</h1>
                                                    <h1 style={{textShadow: "3px 3px black"}} >STRENGTH: {curUserChar.strength}</h1>
                                                </VStack>
                                                <VStack w={'auto'}>
                                                <h1 style={{textShadow: "3px 3px black"}} >DURABILITY: {curUserChar.durability}</h1>
                                                <h1 style={{textShadow: "3px 3px black"}} >COMBAT: {curUserChar.combat}</h1>
                                                <h1 style={{textShadow: "3px 3px black"}} >POWER: {curUserChar.power}</h1>
                                                <h1 style={{textShadow: "3px 3px black"}} >SPEED: {curUserChar.speed}</h1>
                                                </VStack>
                                            </HStack>
                                        </Box>
                                    </Box>
                                }
                        
                            </VStack>

                        }
                    </Box>
                )
            }

             // React Sub-sub component for selecting your characters!
             function FightSelectionView(props)
             {

                // This series of setTimeouts are fired to delay the scene switching and
                // determining if the battle state was a win or not.
                setTimeout(() => {
                    setYourChar(true)
                }, 200);

                setTimeout(() => {
                    setShowOpponent(true)
                }, 800);

                setTimeout(() => {
                    setFlashBang(true)
                }, 1800);

                setTimeout(() => {
                    setViewFight(false);
                    setCharSelection(false);
                    setFlashBang(false);

                    if (!loading)
                    {
                        if (battle.win)
                        {
                            setViewWin(true);
                        }
                        else
                        {
                            setViewLose(true);
                        }
                    }
                   
                }, 3000)


                    return (
                        <Box w='96.6%' h='90.4%'pos="absolute" top={'52.2px'} left={'15px'} color='white' style={{ backgroundImage: "url('/images/crimsonos/game/battleground_bg.png')"}} id={'bruh'}>
                                {
                                    (showFlashBang) &&
                                    <Box w={'100%'} h={'100%'} position="absolute" zIndex={'1000'} bg='white' id='flashbang'></Box>
                                }
                                {
                                    (battle != null && viewFight) &&
                                    <VStack w={'auto'} position={'absolute'} pl={'5%'} pt={'20%'} id={'villian'} display={showYourChar ? 'flex' : 'none'}>
                                        <Image boxSize='280px' borderRadius='full' objectFit='cover' src={battle ? `${battle.c1.url}` : ""} alt=""/>
                                        <Text fontSize='4xl' textAlign={'center'} style={{textShadow: "3px 3px black"}}>{battle.c1.name}</Text>
                                    </VStack>
                                }
                                { (battle != null && viewFight) &&
                                    <VStack w={'auto'} pl={'62%'} pt={'20%'} id={'villian'} display={showOpponent  ? 'flex' : 'none'}>
                                        <Image boxSize='280px' borderRadius='full' objectFit='cover' src={battle ? `${battle.c2.imagePrefix}/lg/${battle.c2.imageSuffix}` : ""} alt=""/>
                                        <Text fontSize='4xl' textAlign={'center'} style={{textShadow: "3px 3px black"}}>{battle.c2.name}</Text>
                                    </VStack>
                                }

                        
                        </Box>
                    )
             }

            // Small Subcomponent to allow users to reroll ONLY ONE stats!
            function RerollChar()
            {

                async function rerollChar(statnum)
                {
                    setLoading(true);
                    
                    await axios.put(`${process.env.REACT_APP_FETCH_BASE}/character/reroll/?charID=${curUserChar.id}&stat=${statnum}`).then(function (response)
                    {
                        setCurUserChar(response.data.c1)
                        setRefChar(response.data.c2);

                    });

                    setDisableAll(true);
                    setLoading(false);
                    
                }

                if (viewAnimation)
                {
                    setTimeout(async () => 
                    {
                        setCharSelection(false);
                        setViewFight(true);
                        setAnimation(false);
                        setViewRerollStats(false)
                        await fetchBattle()
                    }, 1600)
                }



                return (
                    <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} color='white' style={{ 
                        backgroundImage: "url('/images/crimsonos/game/rerollstat_bg.png')",
                    }}>
                        {
                            viewAnimation &&
                            <Box width='' id='letsfight'>
                                <img src="/images/crimsonos/game/charselection/letthefight.png"/>
                            </Box>
                        }
                        {
                            !loading &&
                            <div>
                                <Box as='button' type={'button'} position={'absolute'} top={'26%'} left={'40%'} onClick={() => {setAnimation(true) }} style={{width: "20%"}}>
                                    <img src={'/images/crimsonos/game/winloseselection/contbtn.png'}/>
                                </Box> 
                                <HStack>
                                    <SimpleGrid columns={2} spacing={10} mt={'12%'} ml={'5%'}>
                                        <VStack h={'90%'} w={'75%'} style={{direction: "rtl"}}>
                                            <Image src={curUserChar ?  curUserChar.url : '/images/crimsonos/game/charselection/unknown.png'}  borderRadius='full' boxSize='130px' />
                                            <Text fontSize='xl'>{curUserChar ? curUserChar.name : "?"}</Text>
                                            <Flex gap={'25px'}>
                                                <Box as='button' type={'button'} disabled={disableAll} onClick={() => {rerollChar(1)}} style={{width: "80%"}}>
                                                    <img src={disableAll ? '/images/crimsonos/game/SELECTION/height2.png' : '/images/crimsonos/game/SELECTION/height1.png'} />
                                                </Box>  
                                                <FormControl isRequired style={{width: "80%"}}>
                                                    <Input type='text' name='combat' disabled={true} value={curUserChar ? curUserChar.height : ""} placeholder=''/>
                                                </FormControl>
                                            </Flex>

                                            <Flex gap={'25px'}>
                                                <Box as='button' type={'button'} disabled={disableAll} onClick={() => {rerollChar(2)}} style={{width: "80%"}}>
                                                    <img src={disableAll ? '/images/crimsonos/game/SELECTION/weight2.png' : '/images/crimsonos/game/SELECTION/weight1.png'} />
                                                </Box>  
                                                <FormControl isRequired style={{width: "80%"}}>
                                                    <Input type='text' name='combat' disabled={true} value={curUserChar ? curUserChar.weight : ""} placeholder=''/>
                                                </FormControl>
                                            </Flex>

                                            <Flex gap={'25px'}>
                                                <Box as='button' type={'button'} disabled={disableAll} onClick={() => {rerollChar(3)}} style={{width: "80%"}}>
                                                    <img src={disableAll ? '/images/crimsonos/game/SELECTION/intelligence2.png' : '/images/crimsonos/game/SELECTION/intelligence1.png'} />
                                                </Box>  
                                                <FormControl isRequired style={{width: "80%"}}>
                                                    <Input type='text' name='combat' disabled={true} value={curUserChar ? curUserChar.intelligence : ""} placeholder=''/>
                                                </FormControl>
                                            </Flex>

                                            <Flex gap={'25px'}>
                                                <Box as='button' type={'button'} disabled={disableAll} onClick={() => {rerollChar(4)}} style={{width: "80%"}}>
                                                    <img src={disableAll ? '/images/crimsonos/game/SELECTION/Strength2.png' : '/images/crimsonos/game/SELECTION/Strength1.png'} />
                                                </Box>  
                                                <FormControl isRequired style={{width: "80%"}}>
                                                    <Input type='text' name='combat' disabled={true} value={curUserChar ? curUserChar.strength : ""} placeholder=''/>
                                                </FormControl>
                                            </Flex>

                                            <Flex gap={'25px'}>
                                                <Box as='button' type={'button'} disabled={disableAll} onClick={() => {rerollChar(5)}} style={{width: "80%"}}>
                                                    <img src={disableAll ? '/images/crimsonos/game/SELECTION/speed2.png' : '/images/crimsonos/game/SELECTION/speed1.png'} />
                                                </Box>  
                                                <FormControl isRequired style={{width: "80%"}}>
                                                    <Input type='text' name='combat' disabled={true} value={curUserChar ? curUserChar.speed : ""} placeholder=''/>
                                                </FormControl>
                                            </Flex>

                                            <Flex gap={'25px'}>
                                                <Box as='button' type={'button'} disabled={disableAll} onClick={() => {rerollChar(6)}} style={{width: "80%"}}>
                                                    <img src={disableAll ? '/images/crimsonos/game/SELECTION/Durability2.png' : '/images/crimsonos/game/SELECTION/Durability1.png'} />
                                                </Box>  
                                                <FormControl isRequired style={{width: "80%"}}>
                                                    <Input type='text' name='combat' disabled={true} value={curUserChar ? curUserChar.durability : ""} placeholder=''/>
                                                </FormControl>
                                            </Flex>

                                            <Flex gap={'25px'}>
                                                <Box as='button' type={'button'} disabled={disableAll} onClick={() => {rerollChar(7)}} style={{width: "80%"}}>
                                                    <img src={disableAll ? '/images/crimsonos/game/SELECTION/combat2.png' : '/images/crimsonos/game/SELECTION/combat1.png'} />
                                                </Box>  
                                                <FormControl isRequired style={{width: "80%"}}>
                                                    <Input type='text' name='combat' disabled={true} value={curUserChar ? curUserChar.combat : ""} placeholder=''/>
                                                </FormControl>
                                            </Flex>
                                            <Flex gap={'25px'}>
                                                <Box as='button' type={'button'} disabled={disableAll} onClick={() => {rerollChar(8)}} style={{width: "80%"}}>
                                                    <img src={disableAll ? '/images/crimsonos/game/SELECTION/power2.png' : '/images/crimsonos/game/SELECTION/power1.png'} />
                                                </Box>  
                                                <FormControl isRequired style={{width: "80%"}}>
                                                    <Input type='text' name='combat' disabled={true} value={curUserChar ? curUserChar.power : ""} placeholder=''/>
                                                </FormControl>
                                            </Flex>
                                        </VStack>

                                        <VStack h={'90%'} w={'100%'} pl={'5'} gap={'4px'}>
                                            <Image src={referenceChar ? `${referenceChar.imagePrefix}/lg/${referenceChar.imageSuffix}` : '/images/crimsonos/game/charselection/unknown.png'}  borderRadius='full' boxSize='130px' />
                                            <Text fontSize='xl'>{referenceChar ? referenceChar.name : "?"}</Text>
                                            <Flex gap={'25px'}>
                                                <Text fontSize='xl'>Height: {referenceChar ? referenceChar.height : "?"} </Text>
                                            </Flex>

                                            <Flex gap={'25px'}>
                                                <Text fontSize='xl'>Weight: {referenceChar ? referenceChar.weight : "?"} </Text>
                                            </Flex>

                                            <Flex gap={'25px'}>
                                                <Text fontSize='xl'>Intelligence: {referenceChar ? referenceChar.intelligence : "?"} </Text>
                                            </Flex>

                                            <Flex gap={'25px'}>
                                                <Text fontSize='xl'>Strength: {referenceChar ? referenceChar.strength : "?"} </Text>
                                            </Flex>

    
                                            <Flex gap={'25px'}>
                                                <Text fontSize='xl'>Speed: {referenceChar ? referenceChar.speed : "?"} </Text>
                                            </Flex>

                                            <Flex gap={'25px'}>
                                                <Text fontSize='xl'>Durability: {referenceChar ? referenceChar.durability : "?"} </Text>
                                            </Flex>

                                            <Flex gap={'25px'}>
                                                <Text fontSize='xl'>Combat: {referenceChar ? referenceChar.combat : "?"} </Text>
                                            </Flex>

                                            <Flex gap={'25px'}>
                                            <Text fontSize='xl'>Power: {referenceChar ? referenceChar.power : "?"} </Text>
                                            </Flex>
                                        </VStack>
                                    </SimpleGrid>
                                </HStack> 
                            </div>
                            
                        
                        }
                        
                    </Box>

                );
            }

            // A Small react component that fires when the character has lose the round
            function Loser()
            {
                const [showStats, setShowStats] = useState(false);


                setTimeout(() => {
                    setShowStats(true)
                }, 900)

                return (
                    <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} color='white' style={{ 
                        backgroundImage: "url('/images/crimsonos/game/youlosebg.png')",
                    }}>
 
                            <Box width='' id='fightsplash'>
                                <img src="/images/crimsonos/game/charselection/youlose.png"/>
                            </Box>

                            
                            { showStats &&
                            
                                <Box position={'absolute'} w={'100%'} h={'100%'}>
                                    <Box as='button' position={'absolute'} p={'4'} mt={'61%'} onClick={() => {setMenu(true); setViewLose(false); setViewBattle(false);} } zIndex={'100000'}>
                                        <img src={'/images/crimsonos/game/winloseselection/scoreboard.png'} alt="" width={'30%'}/>
                                    </Box>  
                                    <HStack  mt={'3%'} ml={'2%'} position={'absolute'} style={{backgroundColor: "rgba(0, 0, 0, .5) "}} p={'20px'} w={'auto'} h={'auto'} borderRadius='lg'>
                                        <Image src={ battle.c1.url } objectFit={'cover'}  borderRadius='full' boxSize={'175px'}/>
                                        <VStack pl={'20px'}>
                                            <Text style={{textShadow: "3px 3px black"}} fontSize='2xl' textAlign={'left'} w={'100%'}>{battle.c1.name}</Text>
                                            <Text style={{textShadow: "3px 3px black"}} fontSize='xl' textAlign={'left'} w={'100%'}>Character VP:</Text>
                                            <Text style={{textShadow: "3px 3px black"}} fontSize='6xl' textAlign={'left'} w={'100%'}>{battle.c1VP.toFixed(2)}</Text>
                                        </VStack>
                                    </HStack>

                                    <HStack position={'absolute'} mt={'45%'} ml={'50%'} style={{backgroundColor: "rgba(0, 0, 0, .5) "}} p={'20px'} w={'auto'} h={'auto'} borderRadius='lg'>
                                        <Image src={`${battle.c2.imagePrefix}/lg/${battle.c2.imageSuffix}`} objectFit={'cover'}  borderRadius='full' boxSize={'175px'}/>
                                        <VStack pl={'20px'}>
                                            <Text style={{textShadow: "3px 3px black"}} fontSize='2xl' textAlign={'left'} w={'100%'}>{battle.c2.name}</Text>
                                            <Text style={{textShadow: "3px 3px black"}} fontSize='xl' textAlign={'left'} w={'100%'}>Character VP:</Text>
                                            <Text style={{textShadow: "3px 3px black"}} fontSize='6xl' textAlign={'left'} w={'100%'}>{battle.c2VP.toFixed(2)}</Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                        }

                    </Box>
                )
            }

            // A Small react component that fires when the character has won the round. Option to reroll their stats.
            function Win()
            {
                const [showStats, setShowStats] = useState(false);

                setTimeout(() => {
                    setShowStats(true)
                }, 900)



                return (
                    <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} color='white' style={{ 
                        backgroundImage: "url('/images/crimsonos/game/youwinbg.png')",
                    }}>
                            <Box position={'absolute'}  as='button' onClick={() => {setMenu(true); setViewWin(false); setViewBattle(false) }} p={'3'} zIndex={'100000'}>
                                <img src={'/images/crimsonos/game/xbutton.png'} alt="" />
                            </Box>  

                            <Box width='' id='fightsplash'>
                                <img src="/images/crimsonos/game/charselection/youwin.png"/>
                            </Box>

                            { 
                                showStats &&
                            
                                <Box position={'absolute'} w={'100%'} h={'100%'}>
                                    <Box as='button' position={'absolute'} p={'4'} mt={'61%'} onClick={() => {setViewWin(false); setViewFight(false); setViewRerollStats(true); setDisableAll(false);
                setRefChar(null);} } zIndex={'100000'}>
                                        <img src={'/images/crimsonos/game/winloseselection/rerollbtn.png'} alt="" width={'30%'}/>
                                    </Box>  
                                    <HStack  mt={'3%'} ml={'2%'} position={'absolute'} style={{backgroundColor: "rgba(0, 0, 0, .5) "}} p={'20px'} w={'auto'} h={'auto'} borderRadius='lg'>
                                        <Image src={ battle.c1.url } objectFit={'cover'}  borderRadius='full' boxSize={'175px'}/>
                                        <VStack pl={'20px'}>
                                            <Text style={{textShadow: "3px 3px black"}} fontSize='2xl' textAlign={'left'} w={'100%'}>{battle.c1.name}</Text>
                                            <Text style={{textShadow: "3px 3px black"}} fontSize='xl' textAlign={'left'} w={'100%'}>Character VP:</Text>
                                            <Text style={{textShadow: "3px 3px black"}} fontSize='6xl' textAlign={'left'} w={'100%'}>{battle.c1VP.toFixed(2)}</Text>
                                        </VStack>
                                    </HStack>

                                    <HStack position={'absolute'} mt={'45%'} ml={'50%'} style={{backgroundColor: "rgba(0, 0, 0, .5) "}} p={'20px'} w={'auto'} h={'auto'} borderRadius='lg'>
                                        <Image src={`${battle.c2.imagePrefix}/lg/${battle.c2.imageSuffix}`} objectFit={'cover'}  borderRadius='full' boxSize={'175px'}/>
                                        <VStack pl={'20px'}>
                                            <Text style={{textShadow: "3px 3px black"}} fontSize='2xl' textAlign={'left'} w={'100%'}>{battle.c2.name}</Text>
                                            <Text style={{textShadow: "3px 3px black"}} fontSize='xl' textAlign={'left'} w={'100%'}>Character VP:</Text>
                                            <Text style={{textShadow: "3px 3px black"}} fontSize='6xl' textAlign={'left'} w={'100%'}>{battle.c2VP.toFixed(2)}</Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                            
                            }

                    </Box>
                )
            }

    
            return (
                <Box>
                    {
                        loading &&
                        <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} p={4} color='white'>
                            <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "32%", left: "18%", zIndex: 100}}>
                                <img src='/images/crimsonos/crimsonos_processing.gif' alt=""/>
                            </div>
                        </Box>
                    }
                    {
                        rerollStats &&
                        <RerollChar/>
                    }
                    {
                        viewLose &&
                        <Loser/>
                    }
                    {
                        viewWin &&
                        <Win/>
                    }

                    {
                        viewCharSelection &&
                        <CharSelectionView/>
                    }

                    {
                        viewFight &&
                        <FightSelectionView />
                    }
                </Box>
            )
            
        }




    //React subcomponent for determining high scores of each user's characters!
    function ScorePage()
    {
        const [loading, setLoading] = useState(true);
        const [viewLocalScore, setViewLocalScore] = useState(true);
        const [viewNationalScore, setViewNationalScore] = useState(false)

        //State variables for setting up our local and national character scores
        const [localScores, setLocal] = useState([]);
        const [nationalScores, setNational] = useState([]);
    
        useEffect(() => {

            async function initialScoreSet()
            {
                axios.get(`${process.env.REACT_APP_FETCH_BASE}/characters/?sortby=wins&limit=10&sortorder=DESC`).then(function (response) 
                {
                    //This is for setting for local data
                    const data = response.data.filter(indEntry => indEntry.creator.userName === props.name)
                    setLocal(data);

                    //The rest of the national data goes here
                    setNational(response.data)

                    setLoading(false);
                })
            }

            initialScoreSet();

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

                    <HStack position={'absolute'} w={'50%'} mt={'60px'} ml={'22%'} zIndex={'100000'}>
                        <Box as='button' onClick={() => {setViewLocalScore(true); setViewNationalScore(false)} } w={'50%'}>
                                <img src={ viewLocalScore ? '/images/crimsonos/game/scoreboard/local2.png' : '/images/crimsonos/game/scoreboard/local1.png'} alt="" w={'50%'}/>
                        </Box>
                        <Box as='button' onClick={() => {setViewLocalScore(false); setViewNationalScore(true)} } w={'50%'}>
                                <img src={ viewNationalScore ? '/images/crimsonos/game/scoreboard/national2.png' : '/images/crimsonos/game/scoreboard/national1.png'} alt=""/>
                        </Box>    
                    </HStack>


                {
                    viewLocalScore && !loading &&
                    <Box w={'90%'} position={'absolute'} mt={'60px'}     h={'auto'} p={'20px'}>
                        <TableContainer w={'90%'} position={'absolute'} mt={'50px'} ml={'60px'} >
                            <Table variant='striped' colorScheme='white'>
                                <Thead>
                                    <Tr>
                                        <Th fontSize='xl' style={{textShadow: "3px 3px white"}}>AVATAR</Th>
                                        <Th fontSize='xl' style={{textShadow: "3px 3px white"}}>NAME</Th>
                                        <Th  fontSize='xl' style={{textShadow: "3px 3px white"}}>WINS</Th>
                                        <Th fontSize='xl' style={{textShadow: "3px 3px white"}}>OWNER</Th>
                                    </Tr>
                                </Thead>
                            </Table>
                        </TableContainer>

                        <TableContainer w={'90%'} position={'absolute'} mt={'90px'} ml={'60px'} overflowY={'scroll'} style={{height: "400px"}}>
                            <Table variant='striped' colorScheme='white'>
                                <Tbody>
                                    {
                                        localScores.map(indScores => (
                                            <Tr  style={{backgroundColor: "rgba(0, 0, 0, .5) "}} p={'20px'}>
                                                <Td><Image src={indScores.url} boxSize='50px'  borderRadius='full' objectFit='cover'/></Td>
                                                <Td><Text textAlign={'center'} style={{textShadow: "3px 3px black"}}>{indScores.name}</Text></Td>
                                                <Td><Text textAlign={'center'} style={{textShadow: "3px 3px black"}}>{indScores.wins}</Text></Td>
                                                <Td>
                                                    <HStack justifyContent={'center'}>
                                                        <Image src={indScores.creator.avatar} boxSize='50px'  borderRadius='full' objectFit='cover'/>
                                                        <Text textAlign={'center'} style={{textShadow: "3px 3px black"}}>{indScores.creator.userName}</Text>
                                                    </HStack>
                                                </Td>
                                            </Tr>
                                        ))
                                    }

                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                
                        
                }

                {
                    viewNationalScore && !loading &&
                    <Box w={'90%'} position={'absolute'} mt={'60px'}     h={'auto'} p={'20px'}>
                        <TableContainer w={'90%'} position={'absolute'} mt={'50px'} ml={'60px'} >
                            <Table variant='striped' colorScheme='white'>
                                <Thead>
                                    <Tr>
                                        <Th fontSize='xl' style={{textShadow: "3px 3px white"}}>AVATAR</Th>
                                        <Th fontSize='xl' style={{textShadow: "3px 3px white"}}>NAME</Th>
                                        <Th  fontSize='xl' style={{textShadow: "3px 3px white"}}>WINS</Th>
                                        <Th fontSize='xl' style={{textShadow: "3px 3px white"}}>OWNER</Th>
                                    </Tr>
                                </Thead>
                            </Table>
                        </TableContainer>

                        <TableContainer w={'90%'} position={'absolute'} mt={'90px'} ml={'60px'} overflowY={'scroll'} style={{height: "400px"}}>
                            <Table variant='striped' colorScheme='white'>
                                <Tbody>
                                    {
                                        nationalScores.map(indScores => (
                                            <Tr  style={{backgroundColor: "rgba(0, 0, 0, .5) "}} p={'20px'}>
                                                <Td><Image src={indScores.url} boxSize='50px'  borderRadius='full' objectFit='cover'/></Td>
                                                <Td><Text textAlign={'center'} style={{textShadow: "3px 3px black"}}>{indScores.name}</Text></Td>
                                                <Td><Text textAlign={'center'} style={{textShadow: "3px 3px black"}}>{indScores.wins}</Text></Td>
                                                <Td>
                                                    <HStack justifyContent={'center'}>
                                                        <Image src={indScores.creator.avatar} boxSize='50px'  borderRadius='full' objectFit='cover'/>
                                                        <Text textAlign={'center'} style={{textShadow: "3px 3px black"}}>{indScores.creator.userName}</Text>
                                                    </HStack>
                                                </Td>
                                            </Tr>
                                        ))
                                    }

                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                
                        
                }
                



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