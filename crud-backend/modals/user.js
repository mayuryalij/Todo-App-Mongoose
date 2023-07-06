import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullname: String,
  ph_number: Number,
  address: String
  
});

const user = model('user', userSchema);
export default user;