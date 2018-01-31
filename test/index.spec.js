import jsonWebToken from 'jsonwebtoken';

describe('index', () => {

  it('should test jsonWebToken', () => {

    const secret = 'JWT_SECRET_DEV';
    const userInfo = {
      username: 'admin',
      role: 'editor'
    };

    const token = jsonWebToken.sign(userInfo, secret);
    const bearerToken = `Bearer ${token}`;
    const parsedToken = bearerToken.split(' ')[1];
    const verifiedToken = jsonWebToken.verify(parsedToken, secret);
    const { username, role } = verifiedToken;

    expect(parsedToken).toEqual(token);
    expect({ username, role }).toEqual(userInfo);
  })

});