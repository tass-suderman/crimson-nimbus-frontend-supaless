import { useEffect }  from 'react';
import { Box, Container } from '@chakra-ui/react';
import {useCookies} from 'react-cookie'
import { useLocation, useNavigate } from 'react-router-dom';

interface UserInformation {
	accessToken: string;
	tokenType: string;
	expiry: number;
}

const LoginWindow = () => {
	const [cookies, setCookie] = useCookies(['user']);
	const navigate = useNavigate();
	const location = useLocation();

	async function loginUser(userInformation: UserInformation) {
		const {accessToken, tokenType, expiry} = userInformation;
		setCookie('user', {accessToken, tokenType}, {path: '/', maxAge: expiry});
		navigate('/gameplay');
	}

	const bgStyle = {
		backgroundImage: "url('/images/background/crimson_signin.png')",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
	}

	useEffect( () => {
		if(!cookies.user) {
			const search = new URLSearchParams(location.hash.substring(1));
			if (search.size === 4) {
				const tokenType = search.get('token_type') ?? false;
				const accessToken = search.get('access_token') ?? false;
				const expiryRes = search.get('expires_in') ?? false;
				const expiry = expiryRes ? parseInt(expiryRes, 10) : 0;
				if (tokenType && accessToken && expiry) {
					loginUser({tokenType, accessToken, expiry});
				}
			}
		}
		else{
			navigate('/gameplay');
		}
	}, [])

	return(
	<Container maxW="100%" h={"100vh"} padding={'0'} style={{backgroundImage: `url("/images/background/CrimsonOS_BG.png")`, backgroundRepeat: "repeat", backgroundSize: "cover"}}  >
			<Box w='96.6%' h='90.4%' pos="absolute" top={'52.2px'} left={'15px'} p={4} color='white' style={bgStyle}>
				<Box as='button' w={'25%'} pos="absolute" top={'85%'} left={'76%'} onClick={() => window.location=import.meta.env.VITE_REACT_APP_DISCORD_LOGIN_URL }>
					<img src={'/images/buttons/discord_loginbutton.png'} alt="" />
				</Box>
			</Box>
			<img src='/images/background/CrimsonOS_Window_BASE.png' alt=""/>
	</Container>
	)
}

export default LoginWindow;
