import { Component, useEffect, useState}  from 'react';
import { Box, Center, Container, Text } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useNavigate, useParams } from 'react-router-dom';

const style = {
    minWidth: "1000px",
    padding: "0px",
    display: "inline-block",
    position: "absolute",
    top: "10%",
    left: "23%"
}

/**
 * Sets up the connection between this client application and to Supabase with our given Supabase URL and ANON PUBLIC Key.
 */
let supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_ANON_PUBLIC_SUPABASE
);

/**
 * This React Component served as a Login screen mechanism
 * for users havent been authenticated yet and uses Discord to sign up.
 * 
 * Or for those who tried to go /gameplay but not authenticated, so you get
 * sent back here.
 * @returns 
 */
export default function LoginWindow()
{
    const navigate = useNavigate();

    const bgStyle = {
        backgroundImage: "url('/images/crimsonos/crimson_signin.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }


    useEffect(async () => {
        //Now, we configure with the supabase to authenticate you!

                //Check whether or not you are already authenticated
                await supabase.auth.getUser().then(async (value) => {

                    await supabase.auth.getSession().then((valueses) => {

                        if(value.data.user && valueses.data.session.provider_token)
                        {
                            // This basically says, if you have a userdata and a provider token already made (maybe you already signed up already),
                            // you go straight ahead to the /gameplay
                            window.location.replace("/gameplay");
                        }
        
                    })
                })
                
        // One of the failsafe the supabase uses,
        // If you are not signed in, then you get routed to login.
        // Signed In? Route to Gameplay.        
        supabase.auth.onAuthStateChange(async (event) => {
            if (event == "SIGNED_IN")
            {
                navigate('/gameplay')
            }
            else
            {
                //Forward to login
                navigate('/login');

            }
        })

    }, [])

    // A Click Handler that authenticates current users with Discord through Supabase.
    async function discordAuth(supabase)
    {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                // If you want to change the redirectTo based on your production or development stage, do it here.
              redirectTo: 'https://the-legendary-cloud-guardian.uc.r.appspot.com/gameplay',
                // redirectTo: 'http://localhost:3000/gameplay',
            },
        })

    }


    return(
        <Container style={style}>
            <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} p={4} color='white' style={bgStyle}>
                <Box as='button' w={'25%'} pos="absolute" top={'85%'} left={'76%'} onClick={() => {discordAuth(supabase)} }>
                    <img src={'/images/crimsonos/discord_loginbutton.png'} alt="" />
                </Box>
            </Box>
            <img src='/images/crimsonos/CrimsonOS_Window_BASE.png' alt=""/>
        </Container>
    )
}