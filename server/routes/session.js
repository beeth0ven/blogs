import { error as $error } from 'falcor-json-graph';
import {createSaltedPassword} from "../libaries/internal/jsonWebToken/index";
import User from "../services/mongooseService/User";

const MONGODB_DUPLICATE_KEY = 11000;

const session = [
  {
    route: 'register',
    call: async (callPath, params) => {

      const [userInfo] = params;
      userInfo.role = userInfo.role || 'editor';
      userInfo.password = createSaltedPassword(userInfo.password);
      const user = new User(userInfo);

      try {
        const savedUser = await user.save();
        const newUserId = savedUser.toObject()._id.toString();
        return {
          path: ['register', 'newUserId'],
          value: newUserId
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
  }
];

export default session;