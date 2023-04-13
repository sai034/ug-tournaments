const nodemailer = require("nodemailer")
// require('dotenv').config()

 let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    },
  });

  const getEmailSubject = (mailType, tournamentName) => {
    return mailType === "WELCOME" ? 
        "Welcome to UG Tournaments" :
        `You are Successfully registered for ${tournamentName} in UG Tournaments`
  }

  const getEmailBody = (mailType, tournamentName, user) => {
    return mailType === "WELCOME" ?
        `<div>Hello <b>${user}</b><br/><br/></br></br><div>Welcome to UG Tournaments. You are successfully registered with us. You will now able to participate in various tournaments organised by UG Tournaments</div><br/><div>Please go through our website to understand more about the tournaments, schedule, prize money, and much more </div><br/>Regards,<br/><b>Team UG Tournaments</b>` : 
        `<div>Hello <b>${user}</b><br/><br/></br></br><div>You are now successfully registered for ${tournamentName} in UG Tournaments. Please go through our website to know more details about the tournament regarding the schedule, rules, prize money and much more</div><br/><div>We wish you all the very best for the event!!</div><br/>Regards,<br/><b>Team UG Tournaments</b>`
  }

  /**
   * send email to users via nodemailer 
   * @param {string} user string
   * @param {"WELCOME" | "REGISTER"} mailType 
   * @param {string | null} tournamentName // null in case of welcome email
   */
  const sendMail = async (user, mailType, tournamentName, email) => {
    await transporter.sendMail({
        from: '"UG Tournaments " <ug.tournaments.india@gmail.com>',
        to: email,
        subject: getEmailSubject(mailType, tournamentName),
        html: getEmailBody(mailType, tournamentName, user)
    });
  }
  
  

  module.exports = { sendMail }
