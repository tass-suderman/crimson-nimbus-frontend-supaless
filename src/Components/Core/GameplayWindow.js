import { Component, useEffect, useState}  from 'react';
import { Box, Center, Container, Text, Image, SimpleGrid } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useNavigate } from 'react-router-dom';
import CGGameplay from '../CGGameplay';


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

    const bgStyle2 = {
        backgroundImage: "url('/images/crimsonos/crimsonuser.png')",
        width: "22%",
        height: "20%",
    }

    const [userdata, setData] = useState({});
    const [loading, setLoading] = useState(false)
    const [userProfile, setProfile] = useState({})
    const navigate = useNavigate();

    useEffect(async () => {
        async function getUserData()
        {
            const userData = {}
            await supabase.auth.getUser().then((value) => {
                if(value.data?.user)
                {
                    userData['discord'] = value.data.user
                    setProfile({ avatar: value.data.user.user_metadata.avatar_url, fullname: value.data.user.user_metadata.full_name })
                    console.log(value.data.user);
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


        // setData(bruh);
    }, [])

        return(
            <Container maxW="100%" h={"100vh"}>
                {!loading &&
                    <div left={'15px'} style={{minWidth: "250px",
                        minHeight: "200px",
                        padding: "13px",
                        display: "inline-block",
                        position: "absolute",
                        top: "72.3%",
                        left: "76%"}}>
                            
                            <div style={{display: "flex", gap: "20px", alignItems:"center", justifyContent: "center", position: "absolute", top: "24.3%", left: "7%"}}>
                                <Image borderRadius='full' boxSize='125px' objectFit='cover' src={userProfile.avatar} alt='Dan Abramov' />
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