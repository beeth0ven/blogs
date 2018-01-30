
const saveUserAndToken = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

const clearUserAndToken = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const getUserAndToken = () => {
  const userString = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  if (userString && token) {
    const user = JSON.parse(userString);
    return { user, token }
  }

  return { };
};

export {
  saveUserAndToken,
  clearUserAndToken,
  getUserAndToken,
};