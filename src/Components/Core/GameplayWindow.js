import { Component, useEffect, useState}  from 'react';
import { Box, Center, Container, Text } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useNavigate } from 'react-router-dom';


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


export default function GameplayWindow()
{
    const bgStyle = {
        backgroundImage: "url('/images/crimsonos/crimson_signin.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }

    const [userdata, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(async () => {
        async function getUserData()
        {
            const userData = {}
            await supabase.auth.getUser().then((value) => {
                if(value.data?.user)
                {
                    userData['discord'] = value.data.user
                }
            })

            await supabase.auth.getSession().then((value) => {
                userData['session'] = value
            })

            return userData;
        };

        const data = await getUserData();
        setData(data);
        setLoading(false);

        if (!data.discord)
        {
            window.location.replace("/login");
        }

        


    }, [])


        return(
            <Container style={style}>
                <Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} p={4} color='white' style={bgStyle}>
                    {!loading && <img src={userdata.discord.user_metadata.avatar_url}/>}
                    {!loading && <Text>{userdata.discord.user_metadata.full_name}</Text>}
                </Box>
                <img src='/images/crimsonos/CrimsonOS_Window_BASE.png' alt=""/>
            </Container>
        )


}