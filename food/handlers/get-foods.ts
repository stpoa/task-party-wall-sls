import connectToDatabase from '../../db'
import { getFoodsFromDb } from '../db'
import { dataResponse, errorResponse } from '../../utils'

export const handler = () =>
  connectToDatabase()
    .then(getFoodsFromDb)
    .then(dataResponse)
    .catch(errorResponse('internal'))
