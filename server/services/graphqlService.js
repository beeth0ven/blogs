import {graphiqlExpress, graphqlExpress} from "apollo-server-express/dist/expressApollo";
import schema from "../graphql/schema";


const graphqlService = graphqlExpress({schema});
const graphiqlService = graphiqlExpress({endpointURL: '/graphql'});

export {graphqlService, graphiqlService};