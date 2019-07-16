import connectToDatabase from '../../db'
import { dataResponse, errorResponse } from '../../utils'
import UserModel from '../../user/db'

export const handler = event =>
  connectToDatabase()
    .then(() => getUser(event.requestContext.authorizer.principalId))
    .then(dataResponse)
    .catch(errorResponse('internal'))

const getUser = userId =>
  UserModel.findById(userId, { password: 0 })
    .then(user => {
      if (!user) throw 'No user found.'
      return user
    })
    .catch(err => Promise.reject(new Error(err)))
