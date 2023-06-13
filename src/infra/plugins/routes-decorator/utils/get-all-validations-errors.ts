import { ValidationError } from 'class-validator'

export function getAllValidationErrors(
  errors: ValidationError[],
  parentPath = ''
): [string, string[]] {
  let errorString = ''
  const allErrorMessages: string[] = []
  for (const error of errors) {
    if (error.constraints) {
      const constraints = Object.values(error.constraints)
      const propertyPath = parentPath
        ? `${parentPath}.${error.property}`
        : error.property
      const errorMessages = constraints.map(
        (constraint) => `${propertyPath}: ${constraint}`
      )
      allErrorMessages.push(...errorMessages)
      errorString += errorMessages.join(', ') + '. '
    }
    if (error.children && error.children.length > 0) {
      const nestedErrors = getAllValidationErrors(
        error.children,
        error.property
      )
      if (nestedErrors) {
        allErrorMessages.push(...nestedErrors[1])
        errorString += (errorString ? ', ' : '') + nestedErrors[0] + '. '
      }
    }
  }
  return [errorString.trim(), allErrorMessages]
}
