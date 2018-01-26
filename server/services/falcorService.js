import FalcorExpress from 'falcor-express';
import Router from 'falcor-router';
import routes from "../routes";

const dataSourceRoute = FalcorExpress
  .dataSourceRoute((request, response) => new Router(routes));

export { dataSourceRoute };
