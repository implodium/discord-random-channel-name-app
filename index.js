const nameComponents = require("./NameComponents.json")

function generateChannelName() {
    const nomen = nameComponents.nomen[(Math.random() * nameComponents.nomen.length).toFixed(0)]
    const adjective = nameComponents.adjectives[(Math.random() * nameComponents.adjectives.length).toFixed(0)]

    switch (nomen.article) {
        case "der":
            return "Lukas's " + adjective + "er " + nomen.name
        case "die":
            return "Lukas's " + adjective + "e " + nomen.name
        case "das":
            return "Lukas's " + adjective + "es " + nomen.name
    }
}

let nameFound;

setInterval(() => {
    nameFound = false
    while (!nameFound) {
        try {
            let name = generateChannelName();

            if (name !== undefined) {
                nameFound = true
                console.log(name)
            }
        } catch (e) {

        }
    }
}, 10000)
