const express = require('express');
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:8080',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.DOMAIN,
  secret: process.env.CLIENT_SECRET
};

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));

// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  )
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});


const port = process.env.PORT || 8080;
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/layout");



app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});