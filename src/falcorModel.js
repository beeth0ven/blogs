import falcor from 'falcor';
import FalcorDataSource from 'falcor-http-datasource';

const falcorModel = new falcor.Model({
  source: new FalcorDataSource('/model.json')
});

export default falcorModel;

