const successResponse = (data) => {
  return {
    success: true,
    message: 'success',
    data: data
  }
}

const errorResponse = (message) => {
  return {
    success: false,
    message: message,
    data: {}
  }
}

module.exports = {
  successResponse,
  errorResponse
}