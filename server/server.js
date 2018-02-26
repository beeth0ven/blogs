import express from 'express';
import {PORT, SSL_CERT_PATH, SSL_KEY_PATH} from './config';
import corsService from "./services/corsService";
import falcorRouteService from "./services/falcorRouteService";
import connectMongoose from "./services/mongooseService/index";
import bodyParser from 'body-parser';
import https from 'https';
import fs from 'fs';

const app = express();

app.use(corsService);
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/model.json', falcorRouteService);
app.use('/static', express.static('dist'));

connectMongoose();
// app.listen(PORT, () => console.info('Start listen on:', PORT));

const httpsOptions = {
  key: fs.readFileSync(SSL_KEY_PATH),
  cert: fs.readFileSync(SSL_CERT_PATH)
};

const server = https.createServer(httpsOptions, app)
  .listen(PORT, () => console.info('Start listen on:', PORT));

export default server;