export const errorResponse = (type: 'internal' | 'not-found') => () => ({
  statusCode: (() => {
    switch (type) {
      case 'not-found':
        return 404
      case 'internal':
        return 500
      default:
        500
    }
  })(),
  headers: { 'Content-Type': 'text/plain' },
  body: JSON.stringify({ message: type }),
})

export const dataResponse = data => ({
  statusCode: 200,
  body: JSON.stringify(data),
})

export const deleteResponse = () => ({
  statusCode: 200,
})
