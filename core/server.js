var cors               = require('cors');
var morgan             = require('morgan');
var express            = require('express');
var bodyParser         = require('body-parser');
var path               = require('path');
var { server }         = require('../configuration');
var { WebSocket }      = require('../controllers/websocket');
var Playlist           = require("../controllers/playlistController");
var { Classifier }     = require('../controllers/discoverController');
var { Authentication } = require('./authentication');


morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
    ].join(' ')
});

var app  = express();
var http = require('http').Server(app);

global.ws = new WebSocket(http);
global.playlist = new Playlist;
global.classifier = new Classifier;
global.classifier.load();

app.use(morgan('combined'));
app.use(cors({origin:true,credentials:true}));
app.options(cors({origin:true,credentials:true}));

//  Environment variables
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var authentication = new Authentication([
  '/',
  '/api/login',
  '/api/register',
  '/api/contact-us'
]);
app.use((req, res, next) => authentication.verify(req, res, next));

app.use('/api/discover', require('../routes/discover'));
app.use('/api/playlist', require('../routes/playlist'));
app.use('/api/user',     require('../routes/users'));
app.use('/api',          require('../routes/api'));
app.use('/',             require('../routes/public'));

app.set('port', server.port);
app.set('name', server.name);
app.set('env_mode', server.env_mode)

process.on("uncaughtException", function (err) {
    console.log({data: 'uncaughtException', error: err.stack});
});

http.listen(app.get('port'), function () {
    console.log('\033[0;32m[SERVER]\033[0m ' + app.get('name') + ' server running...');
    console.log('\033[0;32m[SERVER]\033[0m Port: ' , app.get('port'));
    console.log('\033[0;32m[SERVER]\033[0m Mode: ' , app.get('env_mode'));
    console.log('\033[0;32m[SERVER]\033[0m ' + new Date());
});

process.on('SIGTERM', function () {
    process.exit(0);
});