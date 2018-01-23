import express from 'express';
import { PORT } from './config';
import { dataSourceRoute } from "./services/falcorService";

const app = express();

app.use('/model.json', dataSourceRoute);
app.use('/static', express.static('dist'));

app.listen(PORT, () => console.info('Start listen on:', PORT));

export default app;