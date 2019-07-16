import mongoose, { Schema, Document } from 'mongoose'
import { Food } from './interfaces'

const FoodSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  descrtiption: { type: String, required: false },
  amount: {
    required: true,
    type: {
      mass: { type: Number, required: false },
      volume: { type: Number, required: false },
    },
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
})

const FoodModel = mongoose.model<IFood>('Food', FoodSchema)

export type IFood = Document & Food

export const getFoodsFromDb = () =>
  FoodModel.find({})
    .then(foods => foods)
    .catch(err => Promise.reject(new Error(err)))

export const getOneFood = (food: Partial<Food>) => FoodModel.findOne(food)

export const saveFood = (food: Food) => FoodModel.create(food)

export const removeFood = (food: Food) => FoodModel.deleteOne(food)

export default FoodModel
