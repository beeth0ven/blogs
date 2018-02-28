import { Model } from 'falcor';
import FalcorHttpDataSource from 'falcor-http-datasource';
import * as localStorageService from "./localStorageService";
import {SERVER_BASE_URL} from "../config";
import ApolloClient from "apollo-client/ApolloClient";
import {InMemoryCache} from "apollo-cache-inmemory/lib/inMemoryCache";
import {HttpLink} from "apollo-link-http/lib/httpLink";

class AppHttpDataSource extends FalcorHttpDataSource {

  onBeforeRequest(config) {

    const { user, token } = localStorageService.getUserAndToken();
    if (user && token) {
      config.headers['authorization'] = `Bearer ${token}`;
      // console.info('token', token);
    }
  }
}

export default new Model({
  source: new AppHttpDataSource(`${SERVER_BASE_URL}/model.json`, {
    crossDomain: true
  })
});

export const client = new ApolloClient({
  link: new HttpLink({uri: `${SERVER_BASE_URL}/graphql`}),
  cache: new InMemoryCache()
});