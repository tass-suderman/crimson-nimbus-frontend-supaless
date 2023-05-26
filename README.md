# The Legendary Cloud Guardian
![alt text](https://i.ibb.co/Nt2BJBN/Cloud-Guardian-logo.png)

## In a world torn apart by cyberattacks and crazy lumberjacks, a lone guardian takes to the clouds in order to fight back. That guardian is you.

### This portion is the Frontend portion of the Legenedary Cloud Guardian
The entire frontend portion of the Web-based game application is created with these cutting-edge front-end frameworks/tools:
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" width="120"/> <img src="https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/media/logo-colored@2x.png?raw=true" width="425"/> 

The entire frontend framework has been created through the use of React, aided with a flexible front-end component-based tool with Chakra.
<br><br>
In terms of calling the SQL Database from the backend server, of which are both deployed through **Google Cloud MySQL** and **Google App Engine**, this frontend application utilizes **Axios** to fetch, set, and modify data acquired from the database. More information about it down below.

<br><br>
For the backend server, follow my partner, Tass Suderman's repository: [Cloud Guardian Backend Server](https://github.com/tass-suderman/crimson-nimbus-backend)

## Table of Contents
* Behind The Scenes
  *  To Animate or not to Animate!
  *  Calling the Database
  *  Discord Authentication
* Deployment
  * Google App Engine
  * Discord
  * Supabase
  * Configuring Key Authentication Variables in the repository
  * Deploying the application to Google App Engine
* Credits

## Behind The Scenes
What started just a noble idea from a tik-tok post that Tass has suggested in the early days of brainstorming stages, cultimated to a 90s-esque web-application application program. The idea of the program is easily can be described by Tass herself:
```
The Legendary Cloud Guardian is a game inspired by a recent Tik Tok trend, wherein people use a filter shows a random character from a pool and they use the characters shown to create a narrative. Some examples of this trend include:

Building a team from the characters that appear
Speculating on how battles might play out between the characters that appear And, as this game depicts:
Drafting different attributes from the characters that appear to build the strongest character possible.
```
Hence, the idea was born and erected!

### To Animate or not to Animate!
<br><br>
<img src="https://i.ibb.co/303spGt/crimsonos-startup.gif" width="425"/> <img src="https://i.ibb.co/gykdXJJ/crimsonos-transmit.gif" width="425"/>
<br><br>
What's with the 90s-style MacOS like UI interface? It is mostly for nostalgic purposes and giving the game a base theme of somewhat 2000s and 1990s game that is roughed up, slow, and/or sometimes off. That was the idea of it. I wanted to make it more era appropriate. All of the window animation such as the processing database and the startup screen are all created from scratch, frame by frame, and created a GIF with it. What was the trick of using this animation in React. So, the trick is that, using the Crimson OS startup screen, when users the launch the program, a state of determining whether or not the CrimsonOSStartup component should appear was set up initially to be true. Using this code within React:
```javascript
    setTimeout(() => {
        setViewOSStartup(false);
        setLoginView(true);
    }, 1100);
```
this tells React that turn off the OS Startup component and turn on the login view. This method has been heavily used throughout the program for transition and animation eyecandy sake.

### Calling the Database
As aformentioned, this program uses Axios to do `GET, POST, PUT` operations to the backend server, which in turns retrieves or set data to the SQL server on behalf of our frontend program. Using Axios is quite simple, as long you know where to call it. Within the code of the repository, you will usually see them by itself in a function as a click handler if you want them to be called once such as this code:
```javascript

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
```
This example, when clicking a character stat to reroll in the reroll section, it updates the current stats of the current character in the state and statnum passed in, and after that places the newly-updated user in one state and the character of the stat you just yoinked in the second state. And after it is done doing all of those setting, it disables all of the buttons to avoid editing and stops the loading screen.
Another example is using it on a useEffect method. Example is this code:
```javascript
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
```
This basically means that every time this certain component start up, fetch up the highscores from the database, filter the local ones and place it on a state, store the unfiltered data into an another state, and after that, stop the loading. The `[]` means that this only runs ONCE! <br><br>
You can see that the the base URL is substituted with `${process.env.REACT_APP_FETCH_BASE}`. This is where most of our configuration authentication token goes. It's not secure since we have included the env file in the repository, but it is a good idea not to if you are doing this for real.

### Discord Authentication
<img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" width="150"/><img src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/205146/logo-light.png" width="425"/><br><br>

Ah yes, the Discord Authentication. While it can be done in the backend server and redirect calls and token in there, there are plenty of tools of handling authentication gracefully. Introducing, [Supabase](https://supabase.com/ "Supabase"). Supabase is an open-source alternative to Google's Firebase. It allows you to build a database, storage, and authentication products. In terms of Authentication, it offers services to a wide variety of providers like Email, Azure, Bitbucket, LinkedIn, and Discord. It is basically like the tradition OAuth services but has minimal effort and maybe less-headache enducing process.

<br><br>
Let's see how it works in terms in the code (The full setup is on the next section):

NOW, assuming we have these objects initialized with this code:
```javascript
let supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_ANON_PUBLIC_SUPABASE
);

```
This basically links up the Supabase in our code with our Supabase authentication services. We will talk about this more in the setup section.

In the Login section of the application:
```javascript

  import { createClient } from '@supabase/supabase-js'

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
```
This code essentially obtains information of both the current provider session token and the user itself. If you have them, reroute to the gameplay (since you already have been authenticated). If not, stay.

```javascript
    async function discordAuth(supabase)
    {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
              redirectTo: 'https://the-legendary-cloud-guardian.uc.r.appspot.com/gameplay',
            // redirectTo: 'http://localhost:3000/gameplay',
            },
        })

    }
  ```
 
  This onClick function tells us to authenticate ourselves with discord and if successful, redirectTo /gameplay.
  
  In the Gameplay section:
  ```   javascript
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

                    axios.defaults.headers.common['Authorization'] = `Bearer ${value.data.session.provider_token}`

                    axios.post(`${process.env.REACT_APP_FETCH_BASE}/login`);
                }

                else
                {
                    window.location.replace("/login");
                }
            })

            setData({discord: userData.discord, session: userData.session})

            if (!userData.discord || !userData.session.provider_token)
            {
                window.location.replace("/login");
            }


            setLoading(false);
        };

        getUserData();


    }, [])
 ```
This code basically does the same thing with the login but kinda different. It checks if there's a token and a user info. No info or token, go back to the login. HOWEVER, if you have the token needed, it calls Axios to place the current authenticated Discord user to the database for references.

By this point, that's how this react app authenticate its user with Discord. Now that we knew about the behind the scenes, how do we deploy all of this from scratch. Check out the next section!





## Deployment

## Credits

