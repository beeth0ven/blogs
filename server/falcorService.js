import falcorExpress from 'falcor-express';
import Router from 'falcor-router';
import publishingAppRoutes from './routes';

const modelJson = '/model.json';
const dataSourceRoute = falcorExpress
  .dataSourceRoute((request, response) =>  new Router(publishingAppRoutes));

export { modelJson, dataSourceRoute }