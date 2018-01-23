import { Model } from 'falcor';
import FalcorHttpDataSource from 'falcor-http-datasource';

export default new Model({
  source: new FalcorHttpDataSource('/model.json')
});