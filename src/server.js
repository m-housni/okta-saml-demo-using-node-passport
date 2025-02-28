const express = require("express");
const passport = require("passport");
const SamlStrategy = require("passport-saml").Strategy;
const fs = require("fs");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
app.use(express.json());

// Rate Limiter
// TODO: fix the too many requests error
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

// SAML Strategy Configuration
passport.use(
  new SamlStrategy(
    {
      entryPoint: process.env.SAML_ENTRYPOINT, // From Okta Metadata
      issuer: process.env.SAML_ISSUER, // SP Entity ID
      callbackUrl: "http://localhost:3000/auth/saml/callback",
      cert: fs.readFileSync("./okta.cert", "utf-8"), // Okta X.509 Certificate
    },
    (profile, done) => {
      console.log("SAML Profile:", profile);
      return done(null, profile);
    }
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
    console.log("SAML Callback User:", req.user);
    res.send(`Welcome, ${req.user.nameID}!`);
  }
);

// Server Start
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
