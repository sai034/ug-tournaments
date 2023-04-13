const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.d21edqd.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

/**
 * get User details by email id 
 * @param {string} email 
 * @returns {Object}
 */
const getUser = async (email) => {
    const record = await client.db("ug-tournaments").collection("User").findOne({email})
    return record
}

/**
 * Creates a user from the given user object 
 * @param {Object} userObject 
 */
const createUser = async (userObject) => {
    const record = await client.db("ug-tournaments").collection("User").insertOne(userObject)
}

/**
 * get User registered tournaments by userId
 * @param {string} userId 
 * @returns {Object}
 */
const getRegisteredTournaments = async (userId) => {
    const record = await client.db("ug-tournaments").collection("user_tournament_map").findOne({userId})
    return record
}

/**
 * Add a tournament to user 
 * @param {string} userId 
 * @param {string} tournamentName 
 */
const addTournamentToUser = async (userId, tournamentName) => {
    const record = await client.db("ug-tournaments").collection("user_tournament_map").insertOne({ userId: userId, tournamentNames: [tournamentName] })
}

/**
 * Update user tournaments
 * @param {string} userId 
 * @param {string[]} tournamentNames 
 */
const updateUserTournaments = async (userId, tournamentNames) => {
    const record = await client.db("ug-tournaments").collection("user_tournament_map").updateOne({ userId }, {$set: { tournamentNames }})
}

/**
 * get user details by userId
 * @param {string} userId 
 * @returns {Object}
 */
const getUserById = async (userId) => {
    const record = await client.db("ug-tournaments").collection("User").findOne({_id: new ObjectId(userId)})
    return record
}

module.exports = { getUser, createUser, getRegisteredTournaments, addTournamentToUser, updateUserTournaments, getUserById }


