async function discordAuth(supabase)
{
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord'
    });

    console.log(data);

    return data;
}

module.exports = [
    discordAuth
]