import connectToDatabase from '../../db'
import { dataResponse, errorResponse } from '../../utils'
import { getUsers } from '../db'

export const handler = () =>
  connectToDatabase()
    .then(getUsers)
    .then(dataResponse)
    .catch(errorResponse('internal'))
