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


module.exports = { isUserAlreadyRegisteredForSport, tournamentToPageMap }