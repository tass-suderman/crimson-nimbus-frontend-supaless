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

let supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_ANON_PUBLIC_SUPABASE
);

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
                            window.location.replace("/gameplay");
                        }
        
                    })
                })
                
        supabase.auth.onAuthStateChange(async (event) => {
            console.log(event)
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

    async function discordAuth(supabase)
    {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                //  redirectTo: 'https://the-legendary-cloud-guardian.uc.r.appspot.com/gameplay',
                redirectTo: 'http://localhost:3000/gameplay',
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