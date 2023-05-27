import { Component, useEffect, useState}  from 'react';
import { Box, Center, Container, Text, Image, SimpleGrid } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useNavigate } from 'react-router-dom';
import CGGameplay from '../CGGameplay';
import axios from 'axios';


let supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_ANON_PUBLIC_SUPABASE
);

/**
 * This React Component serves as the main handler of the CGGameplay Component which contains the logic and animation for our battle and character selecting.
 * Essentially, the role of this component is to allow access to the gameplay component of the web application IF you are authenticated.
 *
 * If you are not authenticated, you are not allowed to access the gameplay and have to be authenticated,
 * @returns 
 */
export default function GameplayWindow()
{
    const [userdata, setData] = useState({});
    const [loading, setLoading] = useState(true)
    const [userProfile, setProfile] = useState({})

    /**
     * This useEffect basically runs on each startup of this component.
     * When a user tries to access this section, we grab both the session and the userdata discord information.
     * 
     * If you have BOTH the userdata and session, you are allowed to go in to have some fun,
     * If one of them are not available, due to session on sticking for 30 minutes max, you get kicked out and lands you on the login page.
     */
    useEffect(() => {
        async function getUserData()
        {
            const userData = {}
            await supabase.auth.getUser().then((value) => {
                if(value.data?.user)
                {
                    userData['discord'] = value.data.user
                    setProfile({ avatar: value.data.user.user_metadata.avatar_url, fullname: value.data.user.user_metadata.full_name })
                }
            })

            await supabase.auth.getSession().then((value) => {
                userData['session'] = value.data.session

                if (value.data.session?.provider_token)
                {   

                    // As we need the provider token for calling the DB. We grab the provider token provided by Supabase, use it
                    // as our headers for axios, and use that add our discord user entry to the DB.
                    axios.defaults.headers.common['Authorization'] = `Bearer ${value.data.session.provider_token}`

                    axios.post(`${process.env.REACT_APP_FETCH_BASE}/login`);
                }

                else
                {
                    window.location.replace("/login");
                }
            })

            setData({discord: userData.discord, session: userData.session})

            // As a fail safe, this checks if one of them does not provide the necessary details to continue on.
            if (!userData.discord || !userData.session.provider_token)
            {
                window.location.replace("/login");
            }


            setLoading(false);
        };

        getUserData();


    }, [])

        return(
            <Container maxW="100%" h={"100vh"}>
                { loading && 
                
                    <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "35%", left: "32%", zIndex: 100}}>
                        <img src='/images/crimsonos/crimsonos_retriving.gif' alt=""/>
                    </div>
                
                }

                {!loading &&
                    <div left={'15px'} style={{minWidth: "250px",
                        minHeight: "200px",
                        padding: "13px",
                        display: "inline-block",
                        position: "absolute",
                        top: "72.3%",
                        left: "76%"}}>
                            
                            <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "24.3%", left: "7%"}}>
                                <Image borderRadius='full' boxSize='125px' objectFit='cover' src={userProfile.avatar} />
                                <Text fontSize='1xl'>
                                    {userProfile.fullname}
                                </Text>
                            </div>


                        <img src='/images/crimsonos/crimsonuser.png' alt=""/>
                    </div>
                }
                <CGGameplay name={userProfile.fullname}/>
            </Container>
            
        )


}