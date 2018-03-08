import express from 'express';
import compression from 'compression';
import corsService from "./services/corsService";
import falcorRouteService from "./services/falcorRouteService";
import connectMongoose from "./services/mongooseService/index";
import bodyParser from 'body-parser';
import {createServer} from "./createServer";
import {graphiqlService, graphqlService} from "./services/graphqlService";
import {s3Service} from "./services/s3Service";

const app = express();

app.use(compression());
app.use(corsService);
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/model.json', falcorRouteService);
app.use('/graphql', graphqlService);
app.use('/graphiql', graphiqlService);
app.use('/s3', s3Service);
app.use('/static', express.static('dist'));

connectMongoose();

const server = createServer(app);

export default server;