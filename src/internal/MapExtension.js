
export const mapMap = (aMap, transform) => {
  let mappedValues = [];
  for (const [key, value] of aMap) {
    const mappedValue = transform(key, value);
    mappedValues.push(mappedValue)
  }
  return mappedValues
};

export const deletedMap = (aMap, key) => {
  let newMap = new Map([...aMap]);
  newMap.delete(key);
  return newMap;
};