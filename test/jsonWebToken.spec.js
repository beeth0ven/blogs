import jsonWebToken from 'jsonwebtoken';

describe('Json Web Token', () => {

  it('should test jsonWebToken', () => {

    const secret = 'JWT_SECRET_DEV';
    const userInfo = {
      username: 'admin',
      role: 'editor'
    };

    const token = jsonWebToken.sign(userInfo, secret);
    const bearerToken = `Bearer ${token}`;
    const matches = bearerToken.match(/^(\S+)\s+(\S+)$/ );
    const [_, schema, matchedToken] = matches;
    const verifiedToken = jsonWebToken.verify(matchedToken, secret);
    const { username, role } = verifiedToken;

    console.info('matchedToken', matchedToken);

    expect(schema).toEqual('Bearer');
    expect(matchedToken).toEqual(token);
    expect({ username, role }).toEqual(userInfo);
  })

});