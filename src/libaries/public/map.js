import Falcor from 'falcor';

const newMapFromObject = (object) => {
  const rawArray = Object.keys(object)
    .map(key => [key, object[key]]);
  return new Map(rawArray);
};

const newMapFromFalcorObject = (object) => {
  const rawArray = Falcor.keys(object)
    .map(key => [key, object[key]]);
  return new Map(rawArray);
};

const newArrayFromMap = (aMap, transform) => {
  return Array.from(aMap.entries())
    .map(([key, value]) => transform(key, value))
};

export { newMapFromObject, newMapFromFalcorObject, newArrayFromMap };