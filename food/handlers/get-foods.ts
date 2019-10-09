import connectToDatabase from '../../db'
import { getFoodsFromDb } from '../db'
import { dataResponse, errorResponse } from '../../utils'

export const handler = (event) => {
  const { page = 1, perPage = 10 } = event.queryStringParameters || {}

  return connectToDatabase()
    .then(() => getFoodsFromDb(+page || 1, +perPage || 10))
    .then(dataResponse)
    .catch(errorResponse('internal'))
}
