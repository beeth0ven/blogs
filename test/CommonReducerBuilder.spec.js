

import CommonReducerBuilder from "../src/libaries/public/CommonReducerBuilder";

describe('ReducerBuild', () => {
  it('should test ReducerBuild', () => {

    const builder = new CommonReducerBuilder({
      path: 'newArticle',
      defaultElement: null
    });

    const reducer = builder.createReducer();
    const actions = builder.createActions();
    const { onExecuting, onSuccess, onError, onClear } = actions;

    expect(builder.ON_EXECUTING).toEqual('@newArticle/ON_EXECUTING');
    expect(builder.ON_SUCCESS).toEqual('@newArticle/ON_SUCCESS');
    expect(builder.ON_ERROR).toEqual('@newArticle/ON_ERROR');
    expect(builder.ON_CLEAR).toEqual('@newArticle/ON_CLEAR');

    expect(onExecuting()).toEqual({
      type: '@newArticle/ON_EXECUTING'
    });
    expect(onSuccess(1)).toEqual({
      type: '@newArticle/ON_SUCCESS',
      data: 1
    });
    expect(onError('Some Error')).toEqual({
      type: '@newArticle/ON_ERROR',
      error: 'Some Error'
    });
    expect(onClear()).toEqual({
      type: '@newArticle/ON_CLEAR'
    });
  })
});