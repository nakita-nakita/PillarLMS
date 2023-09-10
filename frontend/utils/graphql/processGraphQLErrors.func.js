// foundationAuth_forgotPassword_error0001:Email is missing.

export const processGraphQLErrors = ({ response }) => {
  
  if(!response.errors) {
    return {
      success: true
    }
  }

  const readableError = response.errors[0].message.split(':')

  return {
    success: false,
    error: readableError[1],
    message: readableError[2],
  }
}