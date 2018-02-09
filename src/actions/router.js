import { push } from 'react-router-redux';

const pushLogin = () => push('/login');
const pushDashboard = () => push('/dashboard');
const pushNewArticleSuccess = () => push('/newArticleSuccess');
const pushUpdateArticleSuccess = () => push('/updateArticleSuccess');
const pushDeleteArticleSuccess = () => push('/deleteArticleSuccess');
const pushArticleNotFound = (_id) => push(`/articleNotFound/${_id}`);

export {
  pushLogin,
  pushDashboard,
  pushNewArticleSuccess,
  pushUpdateArticleSuccess,
  pushDeleteArticleSuccess,
  pushArticleNotFound,
};