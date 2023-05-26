# The Legendary Cloud Guardian
![alt text](https://i.ibb.co/Nt2BJBN/Cloud-Guardian-logo.png)
https://the-legendary-cloud-guardian.uc.r.appspot.com/

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
You can see that the the base URL is substituted with `${process.env.REACT_APP_FETCH_BASE}`. This is where most of our configuration authentication token goes.

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
### Google Cloud and Google App Engine Configuration
Before we start deploying this web application to the Google App Engine, ensure that you have the following items before we proceed this section:
* Google Cloud Account (It is tied with your regular Google Account, so you can use your account to access Google Cloud Services)
* Google Cloud CLI (You can follow the instruction to install it. [Download here!](https://cloud.google.com/sdk/docs/install "Download here!"))'
* Google Cloud Project (After you tied your Google Account with Google Cloud and activate their free trial, create a project to store your App Engine into [More information here](https://cloud.google.com/resource-manager/docs/creating-managing-projects "More information here!"))

1. On your console, in the search bar, type in `App Engine` and select `App Engine` in the results. (**Make sure you have selected your Project!**)
2. In the Welecome to App Engine screen, select `Create Application`.
3. In the Create App screen, in the configure application section, select the closes region to your area and leave the Identity and API access empty. Press Next
4. Upon pressing the next button, it will say `Creating application...`.

After a couple of minutes later (usually a minute or so), we have successfully created our App Engine. Now, onto the Supabase Authentication.

### Supabase Authentication Setup
Before we start doing some Subapase setup, create an account with them first. [More information here](https://app.supabase.com/sign-up "More information here!")

1. On your Supabase console, press `+ New Project`.
2. In the Create a new project section, fill your name, select `Generate a password` in the Database password (We are not going to use this, anyways), and select a region and pricing plan appropriate with you.
3. After it created and initializes the project, head over to the menu on the left, and press `Authentication`
4. In the Authentication section, in the submenu of it, select `URL Configuration`.
5. In the Site URL, you will be greeted with Site URL and Redirect URLs. We will edit this as we progress in the deployment section later on. But for now, we will add localhost:3000 for our development application.
6. In the Redirect URLs, press the `Remove` button next to the `https://localhost:3000`. (This is because, by default, React uses `http` NOT `https`.
7. In the Remove URL section, press `Remove URL`
8. In the Redirect URLs, press the `Add URL` button.
9. In the Add a new URL section, in the URL section, type in `http://localhost:3000` and press `Add URL`
10. Repeat Steps 9-10 to add `http://localhost:3000/gameplay`
11. After that, go to the menu bar in the left side of your screen, and select `Project Settings`
12. In the Project Settings sub menu, select `API`
13. In the API Settings, take note the following variables
* Project URL
* Project API keys
(We will use this to talk our react client to our authentication system)

Now that we have set up our Supabase Authentication, lets head over to create our discord authentication system.


### Discord Authentication Setup
The only prequiste here is to create a Discord account. [Register here!](https://discord.com/register "Register here!").

1. Head over to this [link to open up your Discord Developer Console](https://discord.com/developers/applications "link to open up your Discord Developer Console").
2. In the Applications section, press `New Application`.
3. In the Create an Application section, type any name you want, select the checkbox to agree with the ToS, and press `Create`.
4. After creating it, in the menu bar on the left, press `OAuth2`.
5. In the OAuth2 section, take note of the Client ID and Client Secret and copy it. **DO NOT DISTRIBUTE!**

Now that we have our Discord Client Secret key, let's head back to our Supabase console. (You haven't closed it yet, right?)
1. Head over to the menu on the left, and press `Authentication`.
2. In the Authentication submenu, select `Providers`.
3. In the Providers section, in the Auth Providers, scroll down to see `Discord`. Press that.
4. In that section, enable Discord Provider by pressing the slide button. Paste the copied Client ID and Client Secret to the appropriate text field.
5. Take note of the Redirect URL and copy it.

With our redirect URL copied, let's head back to the Discord Developer Portal.
1. In the OAuth2 section, in the Redirect section, press the `Add Redirect`.
2. Place your Subapase Redirect URL in here.

With it, we have configured our Supabase. Now this is where we configure our repository.
### Configuring Key Authentication Variables in the repository
As always, let us start off by cloning this repository to your local directory in your computer. For more information how to clone a repository from GitHub, follow this [link](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository "link")

You got it cloned? Let us proceed with an IDE of your choice.
1. In the root folder of the repository, which should include public and src folders, add a ".env" file into there. Within that .env file, it should include the following:
```
REACT_APP_SUPABASE_URL=YOUR SUPABASE URL YOU JUST COPIED
REACT_APP_ANON_PUBLIC_SUPABASE=YOUR SUPABASE ANON PUBLIC YOU JUST COPIED
REACT_APP_FETCH_BASE=https://cloud-nimbus-backend.uc.r.appspot.com
```
2. After that, save it.
3. In `` src/Components/Core/LoginWindow.js`` and in this section of the code:
```javascript
 async function discordAuth(supabase)
    {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
              //redirectTo: 'https://the-legendary-cloud-guardian.uc.r.appspot.com/gameplay',
              redirectTo: 'http://localhost:3000/gameplay',
            },
        })

    }
```
Ensure that the localhost is not commented out, but the appspot is. We will replace this later on.

4. After that, in your IDE's console, type `npm i` to install the required packages and eventually, type ``npm start`` to test whether or not it is working correctly.

With that, you have a version of our application that is running locally but connecting with our Supabase authentication and Google Cloud SQL through our deployed backend server<br><br>
***IF YOU HAVE NOT DEPLOYED YOUR BACKEND SERVER YET, FOLLOW TASS'S REPOSITORY'S INSTRUCTION FOR MORE INFORMATION ABOUT DEPLOYING YOUR BACKEND SERVER***<br>
**If you do however created a new SQL and backend server, replaced the `REACT_APP_FETCH_BASE` with your own appspot url of that backend server**

Is it working as expected? Now let's deploy it :)<br><br>
5. In your IDE's console, type `gcloud init` and follow the given prompts. (It may be different depending if you have used GCloud Cli before and has your Google account authenticated with it)
<img src="https://i.ibb.co/dmkz57y/Screenshot-2023-05-26-105353.png" width="800" />

6. After that, to obtain our target url to be placed in our Supabase URL configuration and our redirectTO discordAuth function, type `gcloud app deploy`.
7. You will be greeted with a lot of information, but focus on the Target URL value. Copy it and press `n` to stop deploying.
8.  In `` src/Components/Core/LoginWindow.js`` and in this section of the code:
```javascript
 async function discordAuth(supabase)
    {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
              //redirectTo: 'https://the-legendary-cloud-guardian.uc.r.appspot.com/gameplay',
              redirectTo: 'http://localhost:3000/gameplay',
            },
        })

    }
```
Comment out the localhost line, uncomment the appspot one and replace it with your appspot. The format should be like `https://<COPIED TARGET URL>/gameplay` <br>

9. After that, head over back to your Supabase.<br>
10. In the Supabase console, in the menu on the left side, press ``Authentication``<br>
11. In the Authentication submenu, press ``URL Configuration``<br>
12. In that section, replace the Site URL with your copied Target URL and press `Save`<br>
13. In the Redirect URLs section, add an entry to include these infomation
* ``https://<COPIED TARGET URL>/``
* ``https://<COPIED TARGET URL>/gameplay``
14. After that, head back to your IDE.
15. Ensuring that everything works from game functionality and any database functionality, type in your IDE's command console ``npm run build`` to create a production version of our application.
Since we have provided our app.yaml configuration file in this repository, you do not have to worry about creating one.
16. After it has been built, type in your console ``gcloud app deploy`` and press ``Y`` when prompted to continue.
17. It will take a long time, so make yourself a Coffee...or drink another can of Monster as it uploads and deploys your website to Google Cloud
18. After a while, you will be greeted with a information that the deployment has been successfull. Type in your IDE console ``gcloud app browse`` to determine your Target URL. 
19. Copy or select it to access your recently deployed application.

**CONGRATS! YOUR APPLICATION HAS BEEN DEPLOYED TO YOUR OWN GOOGLE APP ENGINE WITH CONFIGURATIONS TIED TO YOU SPECIFICALLY!**

## Credits
Thanks again to Tass Suderman for setting up the SQL and Google App Service for the backend server. I know it is hard, so kudos for you, Tass!<br><br>
Also thanks to Wade for this assignment. It is quite fun and learned more how PaaS works in our web application as a whole.

