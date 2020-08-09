import mongoose from 'mongoose';
import IUser from './user.interface'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  private_key: {
    type: String,
    required: true
  },
  public_key: {
    type: String,
    required: true
  }
  
}, {
  collection: "users"
})

const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema)
export default userModel;