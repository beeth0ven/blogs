import FalcorExpress from 'falcor-express';
import Router from 'falcor-router';
import routes from "../routes";

const falcorRouteService = FalcorExpress
  .dataSourceRoute((request, response) => new Router(routes(request, response)));

export default falcorRouteService;
