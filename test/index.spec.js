
const counter = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
};

class Store {

  constructor(reducer) {
    this.reducer = reducer;
    this.state = reducer(undefined, {});
    this.observers = [];
  };

  subscribe = (observer) => {
    this.observers.push(observer);
    observer.onNext(this.state)
  };

  dispatch = (action) => {
    this.state = this.reducer(this.state, action);
    this.notifyObservers()
  };

  notifyObservers = () => {
    this.observers.forEach(observer => observer.onNext(this.state))
  };

}

describe('index', () => {

  it('should test random', () => {
    const store = new Store(counter);

    store.subscribe({
      onNext: state => console.log('state', state)
    });

    store.dispatch({ type: 'INCREMENT' });
    store.dispatch({ type: 'DECREMENT' });
  })
});