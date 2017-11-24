import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { modelJson, dataSourceRoute } from './falcorService';

const app = express();
app.server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json({extended: false}));
app.use(modelJson, dataSourceRoute);
app.use(express.static('dist'));

app.server.listen(process.env.PORT || 3000);
console.log(`Stated on port ${app.server.address().port}`);

export default app;