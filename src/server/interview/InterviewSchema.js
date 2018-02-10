import mongoose from 'mongoose';

const InterviewSchema = new mongoose.Schema({
  role: {type: String, required: true},
  company: {type: String, required: true},
}, {collection: 'app.interviews'});

export default InterviewSchema;
