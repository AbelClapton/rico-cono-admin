const errors = {
  required: 'Field must be filled in',
  email: 'Invalid e-mail address',
}

export const useValidators = () => {
  const required = (val: string | number): boolean | string => {
    if (typeof val === 'string' && val.length > 0) return true
    if (typeof val === 'number' && !isNaN(val)) return true
    return errors.required
  }

  const email = (email: string): boolean | string => {
    return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email) || errors.email
  }

  const match = (a: unknown, b: unknown, message: string): boolean | string => {
    return a === b || message
  }

  return { required, email, match }
}
