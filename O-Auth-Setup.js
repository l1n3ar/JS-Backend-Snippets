const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');

const app = express();

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken) => {
      console.log(accessToken);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

app.get("/auth/google/callback, passport.authenticate("google"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
