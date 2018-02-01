import express from 'express';
import { PORT } from './config';
import corsService from "./services/corsService";
import falcorRouteService from "./services/falcorRouteService";
import connectMongoose from "./services/mongooseService/index";
import bodyParser from 'body-parser';

const app = express();

app.use(corsService);
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/model.json', falcorRouteService);

connectMongoose();
app.listen(PORT, () => console.info('Start listen on:', PORT));

export default app;