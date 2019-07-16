import { User } from './interface'
import mongoose, { Schema, Document } from 'mongoose'

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const UserModel = mongoose.model<IUser>('User', UserSchema)

export interface IUser extends Document, User {}

export const getUsers = (): Promise<User[]> =>
  UserModel.find({})
    .then(users => users)
    .catch(err => err)

export const createUser = (user: User) => UserModel.create(user)

export const findUser = (user: Partial<User>) => UserModel.findOne(user)

export default UserModel
