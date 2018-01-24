import mongoose from 'mongoose';

const connectMongoose = () => {

  mongoose.connect('mongodb://localhost/local')
    .then(() => console.log('mongoose connect success.'))
    .catch(error => console.error('mongoose connect fail:', error));
};

export default connectMongoose;