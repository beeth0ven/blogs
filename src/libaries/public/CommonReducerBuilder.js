
class CommonReducerBuilder {

  constructor({path, defaultValue}) {
    this.defaultValue = defaultValue;
    this.ON_EXECUTING   = `@${path}/ON_EXECUTING`;
    this.ON_SUCCESS     = `@${path}/ON_SUCCESS`;
    this.ON_ERROR       = `@${path}/ON_ERROR`;
    this.ON_CLEAR       = `@${path}/ON_CLEAR`;
    this.empty          =  {
      value: defaultValue,
      isExecuting: false,
      error: null
    };
  }

  createActions = () => ({
    onExecuting: () => ({
      type: this.ON_EXECUTING
    }),
    onSuccess: (data) => ({
      type: this.ON_SUCCESS,
      data
    }),
    onError: (error) => ({
      type: this.ON_ERROR,
      error
    }),
    onClear: () => ({
      type: this.ON_CLEAR
    })
  });

  createReducer = () => (state = this.empty, action) => {
    switch (action.type) {
      case this.ON_EXECUTING:
        return {
          value: this.defaultValue,
          isExecuting: true,
          error: null
        };
      case this.ON_SUCCESS:
        return {
          value: action.data,
          isExecuting: true,
          error: null
        };
      case this.ON_ERROR:
        return {
          value: null,
          isExecuting: true,
          error: action.error
        };
      case this.ON_CLEAR:
        return this.empty;
      default:
        return state;
    }
  }
}


export default CommonReducerBuilder;