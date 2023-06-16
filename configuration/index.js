module.exports = {
    server: {
        name: 'MusicAll',
        port: process.env.SERVER_PORT | 80,
        env_mode: process.env.ENV_MODE | "development"
    },
    mongoData: {
        url: process.env.DB_SERVER_ADDR | "localhost",
        port: process.env.DB_SERVER_PORT | 63571,
        db: process.env.DB_DATABASE_NAME | "mongo",
        username: process.env.DB_USER_NAME,
        password: process.env.DB_USER_PASS
    },
    authentication: {
        secret: 'MusicForAllThePPL',
        algo: 'sha256',
        exp: 86400 //seconds
    },
    youtube: {
        installed: {
            client_id: "478702066109-cpc189i5gheck0h6qr1e7rl55drq3i3a.apps.googleusercontent.com",
            project_id: "decisive-scion-211811",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://www.googleapis.com/oauth2/v3/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_secret: "sZkbMwM-9uSiUnO47ttGgO4l",
            redirect_uris: ["urn:ietf:wg:oauth:2.0:oob","http://localhost"]
        }
    }
}