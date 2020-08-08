import mongoose from 'mongoose';

/**
 * ? Wrapper function that connects
 * ? to the database on api api route
 * ? that we want
 * */
const connectDb = handler => async (req, res) => {
    // ? check if mongo is connected
    if (mongoose.connections[0].readyState !== 1) {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    return handler(req, res);
};
// ? Confirm if the database is connected
const db = mongoose.connection;

db.once('open', () => {
    console.log('connected to mongo')
}); 

export default connectDb;
