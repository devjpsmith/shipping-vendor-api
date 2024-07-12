const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const authConfig = require('./auth.config');

const router  = express.Router();
const app = express();
const port = 4000;

const checkJwt = auth({
    audience: authConfig.audience,
    issuerBaseURL: authConfig.authority,
});

app.use(checkJwt);
app.use((req, res, next) => {
    const { auth } = req;
    const { username, sub, name, scope } = auth.payload;
    req.user = { username, sub, name, scope };
    next();
})

function scoped(s) {
    return function (req, res, next) {
        const { scope } = req.auth.payload;
        const scopes = scope.split(' ');
        if (scopes.length < 1 || !scopes.includes(s)) {
            console.log(`Scope ${s} not found in token`);
            res.status(403).json({});
        }
        next();
    }
}

router.get('/',
    scoped('auctionApp'),
    function(req, res) {
        res.json(req.user);
    }
);

app.use('/', router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});