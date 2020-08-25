export default {
    oidc: {
        clientId: '0oarllp0e0rDzv45G4x6',
        issuer: 'https://dev-820238.okta.com/oauth2/default',
        redirectUri: 'http://localhost:4200/implicit/callback',
        scopes: ['openid', 'profile', 'email'],
        pkce: true
        /*testing: {
            disableHttpsCheck: `${OKTA_TESTING_DISABLEHTTPSCHECK}`
        }*/
    },
    resourceServer: {
        usersUrl: 'http://localhost:3000/api/v1/users',
    },
};
