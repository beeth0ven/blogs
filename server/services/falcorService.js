import falcorExpress from 'falcor-express';
import Router from 'falcor-router';
import publishingAppRoutes from '../routes/appRoutes';

const modelJson = '/model.json';
const dataSourceRoute = falcorExpress
  .dataSourceRoute((request, response) =>
    new Router(
      []
        .concat(publishingAppRoutes(request, response))
    )
  );

export { modelJson, dataSourceRoute }