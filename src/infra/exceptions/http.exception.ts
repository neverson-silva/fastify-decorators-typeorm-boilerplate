import { HttpStatus } from '@infra/plugins/routes-decorator/utils/http-status.enum'

export class HttpException extends Error {
  constructor(
    public readonly httpStatusCode: HttpStatus,
    public readonly message: string,
    public readonly description?: string,
    public readonly body?: any
  ) {
    super(message)
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.BAD_REQUEST, message, description, body)
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.UNAUTHORIZED, message, description, body)
  }
}

export class PaymentRequiredException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.PAYMENT_REQUIRED, message, description, body)
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.FORBIDDEN, message, description, body)
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.NOT_FOUND, message, description, body)
  }
}

export class MethodNotAllowedException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.METHOD_NOT_ALLOWED, message, description, body)
  }
}

export class NotAcceptableException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.NOT_ACCEPTABLE, message, description, body)
  }
}

export class RequestTimeoutException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.REQUEST_TIMEOUT, message, description, body)
  }
}

export class ConflictException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.CONFLICT, message, description, body)
  }
}

export class GoneException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.GONE, message, description, body)
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message, description, body)
  }
}

export class NotImplementedException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.NOT_IMPLEMENTED, message, description, body)
  }
}

export class BadGatewayException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.BAD_GATEWAY, message, description, body)
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.SERVICE_UNAVAILABLE, message, description, body)
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.GATEWAY_TIMEOUT, message, description, body)
  }
}

export class HttpVersionNotSupportedException extends HttpException {
  constructor(message: string, description?: string, body?: any) {
    super(HttpStatus.HTTP_VERSION_NOT_SUPPORTED, message, description, body)
  }
}
