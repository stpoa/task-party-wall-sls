const jwt = require('jsonwebtoken')

const generatePolicy = (principalId, effect, resource) => {
  const authResponse: any = {}
  authResponse.principalId = principalId
  if (effect && resource) {
    const policyDocument: any = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    const statementOne: any = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
    authResponse.context = { userId: principalId }
  }

  return authResponse
}

export const handler = (event, _, callback) => {
  const token = event.authorizationToken

  if (!token) return callback(null, 'Unauthorized')

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return callback(null, 'Unauthorized')

    return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn))
  })
}
