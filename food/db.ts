import mongoose, { Schema, Document } from 'mongoose'
import { Food, WithId } from './interfaces'

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

export const getFoodsFromDb = (page, perPage) =>
  FoodModel.find({})
    .limit(perPage)
    .skip((page - 1) * perPage)
    .then(foods => foods)
    .then(mapFoods)
    .catch(err => Promise.reject(new Error(err)))

const mapFoods = foods =>
  foods.map(food => {
    const { __v, ...rest } = food.toObject()
    return rest
  })

export const getOneFood = (food: Partial<WithId<Food>>) =>
  FoodModel.findOne(food)

export const saveFood = (food: Food) => FoodModel.create(food)

export const updateFood = (food: Food, id) =>
  FoodModel.updateOne({ _id: id }, food)

export const removeFood = (food: Food) => FoodModel.deleteOne(food)

export default FoodModel
