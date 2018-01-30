
import session from "./session";
import article from "./article";

const routes = (request, response) => [
  ...session(request, response),
  ...article(request, response),
];

export default routes;