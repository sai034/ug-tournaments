const express = require("express")
const router = express.Router()

// Showing home page
router.get("/", function (req, res) {
	console.log("session id is ");
	console.log(req.session && req.session.user_id);
	req.session.user_id ? res.render("gfgh", {error: "", registerSuccess: ""}) : res.render("logi1", {signUpSuccess: "", error: ""});
});

router.get("/signup", function (req, res) {
	res.render("signup", { error: "" });
});

router.get("/logi1", function (req, res) {
	res.render("logi1", {signUpSuccess: "", error: ""});
});

router.get("/gfgh", checkAuth, function (req, res) {
	res.render("gfgh", {error: "", registerSuccess: ""});
});

router.get("/gfcricket", checkAuth, function (req, res) {
	res.render("gfcricket", { error: "", registerSuccess: ""});
});

router.get("/gffootball", checkAuth, function (req, res) {
	res.render("gffootball", {error: "", registerSuccess: ""});
});

router.get("/gfhockey", checkAuth, function (req, res) {
	res.render("gfhockey", {error: "", registerSuccess: ""});
});

router.get("/gfkabaddi", checkAuth, function (req, res) {
	res.render("gfkabaddi", {error: "", registerSuccess: ""});
});

router.get("/gfbadminton", checkAuth, function (req, res) {
	res.render("gfbadminton", {error: "", registerSuccess: ""});
});

router.get("/gfbasketball", checkAuth, function (req, res) {
	res.render("gfbasketball", {error: "", registerSuccess: ""});
});

router.get("/gfvolleyball", checkAuth, function (req, res) {
	res.render("gfvolleyball", {error: "", registerSuccess: ""});
});

router.get("/gfthrowball", checkAuth, function (req, res) {
	res.render("gfthrowball", {error: "", registerSuccess: ""});
});

router.get("/gfmarathon", checkAuth, function (req, res) {
	res.render("gfmarathon", {error: "", registerSuccess: ""});
});

router.get("/gfkh", function (req, res) {
	res.render("gfkh", {error: "", registerSuccess: ""});
});

router.get("/ugtt", function (req, res) {
	res.render("ugtt");
});

router.get("/sc1", function (req, res) {
	res.render("sc1");
});

router.get("/roadmap", function (req, res) {
	res.render("roadmap");
});

function checkAuth(req, res, next) {
	if (!req.session || !req.session.user_id) {
		// res.send('You are not authorized to view this page');
		res.redirect("/logi1")
	} else {
		next();
	}
}


module.exports = router