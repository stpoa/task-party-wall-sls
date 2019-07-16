import jwt from 'jsonwebtoken'

export const signToken = id =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
