const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60,
    keys: ['key1', 'key2'],
  })
);

passport.use(
  new googleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      done(null, profile);
    }
  )
);

//save session to cookie
passport.serializeUser((user, done) => {
  //Cookie is populated by user id
  done(null, user.id);
});

//read session from cookie
passport.deserializeUser((id, done) => {
  //We can use the data recieved from the cookie to do some DB lookup stuff
  //The data recieved from the cookie is populated in the req.user property
  done(null, id);
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: true,
    successRedirect: '/home',
    failureRedirect: '/someErrorPage',
  }),
  (req, res) => {
    console.log('Callback called');
  }
);

//Middleware to see if user is logged in

const isLoggedIn = (req, res, next) => {
  //passport gives us an isAuthenticated function on the request object
  const isUserLoggedIn = req.isAuthenticated() && req.user;
  if (!isUserLoggedIn) {
    return res.send('You must be logged in');
  }

  next();
};

//passport gives us a logout function on the request function also, this unsets the session in the browser and deletes the set cookie
app.get('/auth/logout', (req, res, next) => {
  req.logout();
});

//Use the middleware to see if logged in
app.get('/secret', isLoggedIn, (req, res, next) => {
  res.send('This is a protected endpoint');
});

app.listen(3000);
