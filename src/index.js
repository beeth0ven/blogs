import React from 'react';
import { render } from 'react-dom';
import {store, history} from "./app/store";
import Root from "./layouts/Root";

render(
  (<Root store={store} history={history}/>),
  document.getElementById('root')
);


// import jsonWebToken from 'jsonwebtoken';
//
// const secret = 'JWT_SECRET_DEV';
// const userInfo = {
//   username: 'admin',
//   role: 'editor'
// };
//
// const token = jsonWebToken.sign(userInfo, secret, { expiresIn: 60 });
// const bearerToken = `Bearer ${token}`;
// const parsedToken = bearerToken.split(' ')[1];
// try {
//   const verifiedToken = jsonWebToken.verify(parsedToken, secret);
//   console.log('verifiedToken', verifiedToken);
// } catch (error) {
//   console.error('Verify Error', error);
// }
//
// console.log('token', token);
// console.log('bearerToken', bearerToken);
// console.log('parsedToken', parsedToken);

