const express = require('express');
const bodyParser = require('body-parser');
const xml = require('fast-xml-parser');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const router = express.Router();
const app = express();
const port = 3000;

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(`username: ${username}, password: ${password}`);
        done(null, user);
    }
    ));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text({ type: 'application/xml' }));
// app.use(passport.initialize());
app.use(function(req, res, next) {
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' });
    }
    next();
});

router.post('/1', (req, res) => {
    console.log('Route /1');
    console.log(`Body: ${JSON.stringify(req.body)}`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ total: 5.53 }));
    res.end();
});

router.post('/2', (req, res) => {
    console.log('Route /2');
    console.log(`Body: ${JSON.stringify(req.body)}`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ bamount: 4.99 }));
    res.end();
});

router.post('/3', (req, res) => {
    console.log('Route /3');
    console.log(`Text: ${req.body}`);
    if (xml.validate(req.body) === true) {
        var jsonObj = xml.parse(req.body);
        console.log(`Body: ${JSON.stringify(jsonObj)}`);
    }
    const j2xParser = new xml.j2xParser();
    res.writeHead(200, { 'Content-Type': 'application/xml' });
    res.write(j2xParser.parse({ xml: { quote: 5.25 } }));
    res.end();
});

app.use('/', router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
