const OktaJwtVerifier = require('@okta/jwt-verifier');
const { joinAbsoluteUrlPath, arrayIncludesNested } = require('./common');
const config = require('./config');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.ISSUER,
  clientId: process.env.CLIENT_ID
})

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      //throw new Error('You must send an Authorization header');
      throw new Error('Unauthorized');
    }

    const [authType, token] = authorization.trim().split(' ');
    if (authType !== 'Bearer') {
      throw new Error('Expected a Bearer token');
    }

    const { claims } = await oktaJwtVerifier.verifyAccessToken(token, 'api://default');
    if (!(arrayIncludesNested(claims.scp, process.env.AUTHCODE_FLOW_SCOPE.split(' ')) ||
      (arrayIncludesNested(claims.scp, process.env.IMPLICIT_FLOW_SCOPE.split(' '))))) {
      throw new Error('Could not verify the proper scope');
    }
    next();
  } catch (error) {
    //const loginUrl = joinAbsoluteUrlPath(`${req.protocol}://${req.get("host")}`, "login");
    const loginUrl = joinAbsoluteUrlPath(`${config.BASE_PATH}`, "login");
    res.location(loginUrl);
    res.status(401).send(error.message);
  }
}
