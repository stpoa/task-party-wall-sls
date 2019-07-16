import connectToDatabase from '../../db'
import { saveFood } from '../db'
import { errorResponse, dataResponse } from '../../utils'
import { Food } from '../interfaces'

export const handler = event =>
  connectToDatabase()
    .then(
      validateInput({
        ...JSON.parse(event.body),
        owner: event.requestContext.authorizer.principalId,
      }),
    )
    .then(saveFood)
    .then(dataResponse)
    .catch(errorResponse('internal'))

const validateInput = (eventBody: any) => (): Promise<Omit<Food, '_id'>> => {
  const { name, descrtiption, price, amount, owner } = eventBody

  const hasWeightOrVolume = ({ mass, volume }) => (mass || volume) && !(mass && volume)

  return !name || !price || !amount || !owner || !hasWeightOrVolume(amount)
    ? Promise.reject('Invalid input')
    : Promise.resolve({ name, descrtiption, price, amount, owner })
}
