import connectToDatabase from '../../db'
import { findUser } from '../../user/db'
import { dataResponse, errorResponse } from '../../utils'
import bcrypt from 'bcryptjs-then'

import { signToken } from '../utils'

export const handler = event =>
  connectToDatabase()
    .then(() => loginUser(JSON.parse(event.body)))
    .then(dataResponse)
    .catch(errorResponse('internal'))

const loginUser = eventBody =>
  findUser({ email: eventBody.email })
    .then(user =>
      !user
        ? Promise.reject(new Error('User with that email does not exits.'))
        : comparePassword(eventBody.password, user.password, user._id),
    )
    .then(token => ({ auth: true, token: token }))

const comparePassword = (eventPassword, userPassword, userId) =>
  bcrypt
    .compare(eventPassword, userPassword)
    .then(passwordIsValid =>
      !passwordIsValid
        ? Promise.reject(new Error('The credentials do not match.'))
        : signToken(userId),
    )
