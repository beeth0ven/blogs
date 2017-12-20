import { User } from "../services/mongooseService";
import {createSaltedPassHash, createToken} from "../internal/jwt";

export default [
  {
    route: ['login'],
    call: (callPath, args) => {
      const { username, password } = args[0];
      const saltedPassHash = createSaltedPassHash(password);
      const userStatementQuery = {
        $and: [
          { 'username': username },
          { 'password': saltedPassHash }
        ]
      };

      return User.find(userStatementQuery, (error) => {
        if (error) throw error
      })
        .then(result => {
          if (result.length) {
            const role = result[0].role;
            const token = createToken(username, role);

            return [
              {
                path: ['login', 'token'],
                value: token
              },
              {
                path: ['login', 'username'],
                value: username
              },
              {
                path: ['login', 'role'],
                value: role
              },
              {
                path: ['login', 'error'],
                value: false
              }
            ]
          }

          return [
            {
              path: ['login', 'token'],
              value: 'INVALID'
            },
            {
              path: ['login', 'error'],
              value: 'NO USER FOUND, incorrect login information'
            }
          ]
        })
    }
  },
  {
    route: ['register'],
    call: (callPath, args) => {
      const newUserObj = args[0];
      newUserObj.password = createSaltedPassHash(newUserObj.password);
      const newUser = new User(newUserObj);
      return newUser.save((error) => { if (error) return error })
        .then((newRes) => {

          const newUserDetail = newRes.toObject();
          if (newUserDetail._id) {
            const newUserId = newUserDetail._id.toString();

           return [
             {
               path: ['register', 'newUserId'],
               value: newUserId
             },
             {
               path: ['register', 'error'],
               value: false
             }
           ];
          }

          return [
            {
              path: ['register', 'newUserId'],
              value: 'INVALID'
            },
            {
              path: ['register', 'error'],
              value: 'Registration failed - no id has been created'
            }
          ];
        }).catch(reason => console.error(reason));
    }
  }
]