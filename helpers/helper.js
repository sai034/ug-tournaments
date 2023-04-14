/**
 * boolean check if the user id registered to a tournament
 * @param {string[]} tournamentNames 
 * @param {string} currentTournamentToRegister 
 * @returns {boolean}
 */
const isUserAlreadyRegisteredForSport = (tournamentNames, currentTournamentToRegister) => {
    return tournamentNames.includes(currentTournamentToRegister)
}

/**
 * tournament name to the EJS page map
 * @param {string} tournamentName 
 * @returns string
 */
const tournamentToPageMap = (tournamentName) => {
    switch (tournamentName) {
        case "BADMINTON": return "gfbadminton"
        case "BASKETBALL": return "gfbasketball"
        case "FOOTBALL": return "gffootball"
        case "CRICKET": return "gfcricket"
        case "HOCKEY": return "gfhockey"
        case "KABADDI": return "gfkabaddi"
        case "KHOKHO": return "gfkh"
        case "MARATHON": return "gfmarathon"
        case "THROWBALL": return "gfthrowball"
        case "VOLLEYBALL": return "gfvolleyball"
    }
}

/**
 * email regex validation
 * @param {string} email 
 * @returns boolean
 */
const isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}


module.exports = { isUserAlreadyRegisteredForSport, tournamentToPageMap, isValidEmail }