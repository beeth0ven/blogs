import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { modelJson, dataSourceRoute } from './services/falcorService';
import {handleServerSideRender} from "./services/renderService";


const app = express();
app.server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(modelJson, dataSourceRoute);
app.use('/static', express.static('dist'));
app.use(handleServerSideRender);

app.server.listen(process.env.PORT || 3000);
console.log(`Stated on port ${app.server.address().port}`);

export default app;