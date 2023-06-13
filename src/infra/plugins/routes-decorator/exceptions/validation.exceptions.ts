export class ValitationException extends Error {
  valitations: string[]
  constructor(message: string, validations: string[] = []) {
    super(message)
    this.valitations = validations
  }
}
