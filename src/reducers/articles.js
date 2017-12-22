
const articles = (state = {}, action) => {
  console.log('reducer action', action);
  switch (action.type) {
    case 'ADD_ARTICLES':
      console.log('reducer articles', {...action.data});
      return {...action.data};
    default:
      console.log('reducer articles', state);
      return state;
  }
};

export default articles;