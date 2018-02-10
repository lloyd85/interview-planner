import Express from 'express';
import mongoose from 'mongoose';
import config from '../config';

const app = new Express();
const mongoURI = config.mongoURI[app.settings.env];

mongoose.Promise = global.Promise;

mongoose.connect(mongoURI, (error, res) => {
  if (error) {
    console.log(`Error connecting to the database. ${error}`);
  } else {
    console.log(`Connected to ${mongoURI}`);
  }
});

export default mongoose;