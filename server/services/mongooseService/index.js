import Mongoose from 'mongoose';
import articleSchema from "./articleSchema";
import userSchema from "./userSchema";
import {config, getDBUser} from "./config";

Mongoose.connect(`mongodb://${config.hostname}:${config.port}/${config.env}`, getDBUser());
const Article = Mongoose.model('Article', articleSchema, 'articles');
const User = Mongoose.model('User', userSchema, 'pubUsers');

export { Article, User };