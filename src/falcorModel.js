import falcor from 'falcor';
import FalcorDataSource from 'falcor-http-datasource';
import Subject from "./internal/Subject";

class PublishingAppDataSource extends FalcorDataSource {

  onBeforeRequest(config) {
    const token = localStorage.token;
    const username = localStorage.username;
    const role = localStorage.role;

    if (token && username && role) {
      config.headers['token'] = token;
      config.headers['username'] = username;
      config.headers['role'] = role;
    }
  }
}

const errorSubject = new Subject();

const model = new falcor.Model({
  source: new PublishingAppDataSource('/model.json'),
  errorSelector: (path, error) => {
    errorSubject.onNext({ errorValue: error.value, path });
    error.$expires = -1000 * 60 * 2;
    return error;
  }
});

export default model;
export {errorSubject};


