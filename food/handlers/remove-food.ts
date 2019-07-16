import connectToDatabase from '../../db'
import { getOneFood, removeFood } from '../db'
import { errorResponse, deleteResponse } from '../../utils'

export const handler = event =>
  connectToDatabase()
    .then(() => getOneFood({ _id: event.pathParameters.id }))
    .then(food => {
      if (!food) throw 'No such food in db'
      return food
    })
    .then(removeFood)
    .then(deleteResponse)
    .catch(errorResponse('internal'))
