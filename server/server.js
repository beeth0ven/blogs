import express from 'express';
import { PORT } from './config';
import { dataSourceRoute } from "./services/falcorService";
import connectMongoose from "./services/mongooseService/index";
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/model.json', dataSourceRoute);
app.use(express.static('dist'));

connectMongoose();
app.listen(PORT, () => console.info('Start listen on:', PORT));

export default app;