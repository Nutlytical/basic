const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const axios = require('axios');
const passport = require("passport");
const { facebookPassportConfig, googlePassportConfig } = require("./passport");

facebookPassportConfig();
googlePassportConfig();

const app = express();
app.use(cors());

// parse application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.post("/signin/facebook", async (req, res) => {
//   console.log("Request -->", req.body.user);

//   const CLIENT_ID = "API_KEY"; // from facebook developer
//   const CLIENT_SECRET = "API_KEY"; // from facebook developer

//   try {
//     const response = await axios({
//       method: "get",
//       url: `https://graph.facebook.com/v6.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&fb_exchange_token=${req.body.user.accessToken}`,
//     });
//     const result = response.data;
//     console.log("Result -->", result);

//     // If (result) --> process signup (new user) / signin (exiting user)
//   } catch (error) {}
// });

// app.post("/signin/google", async (req, res) => {
//   console.log("Request -->", req.body.user);

//   try {
//     // Handle user as appropriate --> signup(new user) / signin(existing user)
//   } catch (error) {}
// });

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "http://localhost:3000",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("User -->", req.user);
    const user = req.user;
    // Handle user with database --> new user (sign up --> create new user) / signin
    // Send jwt token back to frontend --response / res.cookies

    res.redirect("http://localhost:3000");
  }
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:3000",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("User -->", req.user);
    const user = req.user;
    // Handle user with database --> new user (sign up --> create new user) / signin
    // Send jwt token back to frontend --response / res.cookies

    res.redirect("http://localhost:3000");
  }
);

app.listen(4000, () => console.log("Server started"));

// use npm install passport@^0.4.1
