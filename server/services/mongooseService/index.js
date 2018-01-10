import Mongoose from 'mongoose';
import articleSchema from "./articleSchema";
import userSchema from "./userSchema";
import config from "./config";

Mongoose.connect(`mongodb://${config.hostname}/${config.env}`);
const Article = Mongoose.model('Article', articleSchema, 'articles');
const User = Mongoose.model('User', userSchema, 'pubUsers');

export { Article, User };