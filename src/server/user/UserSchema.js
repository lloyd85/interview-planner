import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dob: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  postcode: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,

}, { collection: 'app.users' });

export default UserSchema;
