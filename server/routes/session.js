import { error as $error, atom as $atom } from 'falcor-json-graph';
import {createSaltedPassword, createToken} from "../libaries/internal/jsonWebToken/index";
import User from "../services/mongooseService/User";

const MONGODB_DUPLICATE_KEY = 11000;

const session = (request, response) => [
  {
    route: 'register',
    call: async (callPath, params) => {

      const [{ username, password, email, role }] = params;

      const user = new User({
        username,
        password: createSaltedPassword(password),
        email,
        role: role || 'editor'
      });

      try {
        const savedUser = await user.save();
        return {
          path: ['register', 'newUserId'],
          value: savedUser.toObject()._id.toString()
        }
      } catch (error) {
        switch (error.code) {
          case MONGODB_DUPLICATE_KEY:
            return {
              path: ['register', 'newUserId'],
              value: $error('Username has been registered!')
            };
          default:
            throw error;
        }
      }
    }
  },
  {
    route: 'login',
    call: async (callPath, params) => {

      const [{ username, password }] = params;
      const saltedPassword = createSaltedPassword(password);
      const user = await User.findOne(
        { $and: [{ username }, { password: saltedPassword}] },
        ['_id', 'username', 'role', 'email']
      );

      if (user) {
        return [
          {
            path: ['login', 'user'],
            value: $atom(user.toObject())
          },
          {
            path: ['login', 'token'],
            value: createToken(username, user.role)
          }
        ]
      } else {
        return [
          {
            path: ['login', 'user'],
            value: $error('Username or Password is incorrect.')
          },
          {
            path: ['login', 'token'],
            value: null
          }
        ]
      }
    }
  }
];

export default session;