import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    //TODO: Create DB config manager
    try {
        await mongoose.connect("mongodb://users-mongo-srv:27017/users");
        console.log('Connection to MongoDB');
    } catch (err) {
        console.log(err);
    }
}

app.listen(3000, () => {
    console.log('Listening on: ' + 3000);
});

start();
