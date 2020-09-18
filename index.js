const Discord = require('discord.js')
const client = new Discord.Client()
const nameComponents = require("./NameComponents.json")
const token = require('./token.json').token
const channelConfig = require('./channelConfig.json')

client.login(token)
    .catch(console.log)

client.on('ready', () => {
    console.log('connected')
    init()
})

function generateChannelName() {
    const nomen = nameComponents.nomen[(Math.random() * nameComponents.nomen.length).toFixed(0) - 1]
    const adjective = nameComponents.adjectives[(Math.random() * nameComponents.adjectives.length).toFixed(0) - 1]

    if (nomen.article !== undefined && adjective !== undefined && nomen.name !== undefined) {
        switch (nomen.article) {
            case "der":
                return "Lukas' " + adjective + "er " + nomen.name
            case "die":
                return "Lukas' " + adjective + "e " + nomen.name
            case "das":
                return "Lukas' " + adjective + "es " + nomen.name
        }
    } else return undefined
}

function changeName(channelObject) {
    let nameFound = false
    while (!nameFound) {
        try {
            let name = generateChannelName();

            if (name !== undefined) {
                console.log(name)
                channelObject.setName(name)
                    .then(() => console.log("It works"))
                    .catch(console.log)
                nameFound = true
            }
        } catch (e) {
            console.log(e.stack)
        }
    }
}

function setNameChangeEnable(channelObject, intervalInMin) {
    changeName(channelObject)
    setInterval(() => {
        changeName(channelObject)
    }, intervalInMin * 60000)
}

function init() {
    Object.values(channelConfig).forEach(guild => {
        const guildObject = client.guilds.cache.get(guild.id)

        guild.channels.forEach(channel => {
            const channelObject = guildObject.channels.cache.get(channel)

            setNameChangeEnable(channelObject, 30)
        })
    })
}
