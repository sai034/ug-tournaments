const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rqttow1.mongodb.net/?retryWrites=true&w=majority`
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.d21edqd.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

/**
 * 
 * @returns {Object} User 
 */
const getUser = async (email) => {
    const record = await client.db("ug-tournaments").collection("User").findOne({email})
    return record
}

const createUser = async (userObject) => {
    const record = await client.db("ug-tournaments").collection("User").insertOne(userObject)
}

const getRegisteredTournaments = async (userId) => {
    const record = await client.db("ug-tournaments").collection("user_tournament_map").findOne({userId})
    return record
}

const addTournamentToUser = async (userId, tournamentName) => {
    const record = await client.db("ug-tournaments").collection("user_tournament_map").insertOne({ userId: userId, tournamentNames: [tournamentName] })
}

const updateUserTournaments = async (userId, tournamentNames) => {
    const record = await client.db("ug-tournaments").collection("user_tournament_map").updateOne({ userId }, {$set: { tournamentNames }})
}

const getUserById = async (userId) => {
    const record = await client.db("ug-tournaments").collection("User").findOne({_id: new ObjectId(userId)})
    return record
}

module.exports = { getUser, createUser, getRegisteredTournaments, addTournamentToUser, updateUserTournaments, getUserById }


