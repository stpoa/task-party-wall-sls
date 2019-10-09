import connectToDatabase from '../../db'
import { dataResponse, errorResponse } from '../../utils'
import { findUser, createUser } from '../../user/db'
import { signToken } from '../utils'
import bcrypt from 'bcryptjs-then'

export const handler = event =>
  connectToDatabase()
    .then(() => registerUser(JSON.parse(event.body)))
    .then(dataResponse)
    .catch(errorResponse('not-found'))

const checkIfUserExist = ({ email, name, password }) =>
  findUser({ email })
    .then(found =>
      found
        ? Promise.reject(new Error('User with that email exists.'))
        : bcrypt.hash(password, 8),
    )
    .then(password => createUser({ name, email, password }))

const tokenResponse = user => {
  const token = signToken(user._id)
  console.log({ user, token })
  return ({ auth: true, token })
}

const registerUser = eventBody =>
  validateInput(eventBody)
    .then(checkIfUserExist)
    .then(tokenResponse)

const validateInput = ({ password, name, email }) => {
  if (!isPasswordValid(password)) {
    return Promise.reject('Password needs to be longer than 8 characters.')
  }

  if (!isNameValid(name))
    return Promise.reject(
      new Error('Username error. Username needs to longer than 5 characters'),
    )

  if (!isEmailValid(email))
    return Promise.reject(
      new Error('Email error. Email must have valid characters.'),
    )

  return Promise.resolve({ name, email, password })
}

const isPasswordValid = password => password && password.length >= 7
const isNameValid = name => name && name.length > 5 && typeof name === 'string'
const isEmailValid = email => email && typeof email === 'string'
