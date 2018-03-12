import {makeExecutableSchema} from "graphql-tools/dist/index";
import {resolvers, typeDefs} from "./article";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;