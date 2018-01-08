
export default class Subject {

  observers = [];

  subscribe = (observer) => {
    this.observers.push(observer)
  };

  onNext = (value) => {
    this.observers.forEach((observer) => observer.onNext(value))
  };
}