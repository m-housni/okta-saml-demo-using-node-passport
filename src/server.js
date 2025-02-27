const express = require("express");
const passport = require("passport");
const SamlStrategy = require("passport-saml").Strategy;
const fs = require("fs");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// SAML Strategy Configuration
passport.use(
  new SamlStrategy(
    {
      entryPoint: process.env.SAML_ENTRYPOINT, // From Okta Metadata
      issuer: process.env.SAML_ISSUER, // SP Entity ID
      callbackUrl: "http://localhost:3000/auth/saml/callback",
      cert: fs.readFileSync("./okta_cert.pem", "utf-8"), // Okta X.509 Certificate
    },
    (profile, done) => done(null, profile)
  )
);

// Serialize User
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());

// SAML Authentication Routes
app.get("/auth/saml", passport.authenticate("saml", { failureRedirect: "/" }));
app.post(
  "/auth/saml/callback",
  passport.authenticate("saml", { failureRedirect: "/", session: false }),
  (req, res) => {
    res.send(`Welcome, ${req.user.nameID}!`);
  }
);

// Server Start
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
