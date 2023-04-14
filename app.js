const express = require("express")
const app = express();
const { getUser, createUser, getRegisteredTournaments, addTournamentToUser, updateUserTournaments, getUserById } = require("./config/db")
const { isUserAlreadyRegisteredForSport, tournamentToPageMap, isValidEmail } = require('./helpers/helper')
const { sendMail } = require("./mail/mailer")

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: 'false'}))

app.use(require("express-session")({
	secret: "my lill secret",
	resave: false,
	saveUninitialized: false
}));

app.use(express.static('public'));
const routes = require('./routes/route')
app.use('/', routes);


/**
 * User Sign Up
 */
app.post("/signup", async (req, res) => {
    console.log("signing up.....")
	try {
		const { pass, confirmpass, email } = req.body
		if (!isValidEmail(email)) {
			res.render("signup", {error: "Please enter a Valid Email"});
			res.status(400).send()
		} else if (pass !== confirmpass) {
			res.render("signup", {error: "Passwords dont match! Please re-try"});
			res.status(400).send()
		} else {
			const email = req.body.email
			console.log("The email is ", email)
	
			const user = await getUser(email)
			console.log({user});
			if (user !== null) {
				res.render("signup", {error: "User already exists"});
				res.status(400).send()
			}
			console.log("not an existing user, signing up ");
			delete req.body.confirmpass
			delete req.body.submit
			await createUser(req.body)
			res.render("logi1", {signUpSuccess: "Sign Up Successful! Please try logging in", error: ""})
		}
	} catch (error) {
		console.log("Error", error);
		res.status(500).send()
	}
	await sendMail(req.body.name, "WELCOME", null, req.body.email)
	res.status(200).send()
});

/**
 * User login
 */
app.post("/logi1", async function(req, res){
	console.log("logging in");
	try {
		console.log({body:req.body})
		const user = await getUser(req.body.email)
		console.log({user});
		if (user) {
		// matching password
		const result = req.body.password === user.pass;
		console.log({result});
		if (result) {
			req.session.user_id = user._id
			res.render("gfgh");
		} else {
			res.render("logi1", {signUpSuccess: "", error: "Username or Password is incorrect!!"})
			res.status(400).send()
		}
		} else {
			res.render("logi1", {signUpSuccess: "", error: "User doesn't exist!!"})
			res.status(400).send()
		}
	} catch (error) {
		res.render("logi1", {signUpSuccess: "", error: "Something went wrong! Please try after sometime"})
		console.log({error});
		res.status(400).send()
	}
});


/**
 * Register to an event in the tournament
 */
app.post("/eventRegister", async function(req, res){
	try {
		const userId = req.session.user_id
		const user = await getUserById(userId)
		const { name, email } = user
		const tournament_name_to_register = req.body.tournament

		// get user registered tournaments 
		const registeredTournaments = await getRegisteredTournaments(userId)
		const pageToRender = tournamentToPageMap(tournament_name_to_register)

		// if none registerd, then add a new row
		if (registeredTournaments == null) {
			await addTournamentToUser(userId, tournament_name_to_register)
			console.log("New user_tournament_map record created for user "+ userId+ " for tournament "+ tournament_name_to_register )
			res.render(pageToRender, {registerSuccess: "Registration Successful! Please check your email for more details", error: ""})

			// send event registered mail 
			await sendMail(name, "REGISTER", tournament_name_to_register, email)
		} else {
			// else update the row in the user_tournament_map collection
			let tournamentNames = registeredTournaments.tournamentNames

			// check if already registered to the sport
			const isUserAlreadyRegistered = isUserAlreadyRegisteredForSport(tournamentNames, tournament_name_to_register)
			if (isUserAlreadyRegistered) {
				// redirect to the source page, with the appropriate error message 
				res.render(pageToRender, {error: "Already Registered for this sport", registerSuccess: ""});

				// res.status(400).json({ error: "User Already registered to the sport" })
			} else {
				// if not already registered
				console.log("Updating user_tournament_map record created for user "+ userId+ " for tournament "+ tournament_name_to_register )
				tournamentNames.push(tournament_name_to_register)
				await updateUserTournaments(userId, tournamentNames)
				res.render(pageToRender, {registerSuccess: "Registration Successful! Please check your email for more details", error: ""})

				// send event registered mail 
				await sendMail(name, "REGISTER", tournament_name_to_register, email)
			}
		}
		res.status(200).send()
	} catch (error) {
		console.log({error});
		res.status(400).json({ error });
	}
});

/**
 * User Logout
 */
app.post("/logout", function (req, res) {
	delete req.session.user_id
	res.redirect('/logi1')
});

const port = process.env.PORT || 9090;
app.listen(port, function () {
	console.log(`Server Has Started on port ${port}`);
});
