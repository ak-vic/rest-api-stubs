const authOktaImplicitMiddleware = require('./authOktaImplicit');

module.exports = async (req, res, next) => {
    const api_key = req.query.api_key;
    if(!api_key || api_key !== process.env.API_KEY){
        authOktaImplicitMiddleware(req, res, next);
    }
    else
    {
        next();
    }
}