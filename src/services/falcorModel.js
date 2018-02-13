import { Model } from 'falcor';
import FalcorHttpDataSource from 'falcor-http-datasource';
import * as localStorageService from "./localStorageService";
import {BASE_URL} from "../config";

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
  source: new AppHttpDataSource(`${BASE_URL}/model.json`, {
    crossDomain: true
  })
});