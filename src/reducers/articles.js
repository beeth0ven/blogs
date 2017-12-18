
const articles = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ARTICLES':
      return {...action.data};
    default:
      return state;
  }
};

export default articles;