
// const articleMock = {
//   '987654': {
//     articleTitle: 'Lorem ipsum - article one',
//     articleContent: 'Here goes the content of the article'
//   },
//   '123456': {
//     articleTitle: 'Lorem ipsum - article two',
//     articleContent: 'Sky is the limit, the content goes here.'
//   }
// };

const article = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ARTICLES':
      return {...action.data};
    default:
      return state;
  }
};

export default article;