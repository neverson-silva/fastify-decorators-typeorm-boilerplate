import { FastifyRequest } from 'fastify'
import { EAuthDecorators } from '@plugins/auth/available-auth.enum'
import {
  ForbiddenException,
  UnauthorizedException,
} from '@infra/exceptions/http.exception'

export async function verifyIsAuth({
  request,
  controller,
  method,
  controllerInstance,
}: {
  controller: any
  controllerInstance: any
  method: any
  request: FastifyRequest
}) {
  const publicClass = Reflect.getMetadata(EAuthDecorators.PUBLIC, controller)
  const publicMethod = Reflect.getMetadata(
    EAuthDecorators.PUBLIC,
    controllerInstance,
    method
  )

  if (publicClass || publicMethod) {
    return true
  }

  try {
    await request.jwtVerify()
  } catch (e) {
    throw new UnauthorizedException('Credenciais inválidas')
  }

  if (!request.user) {
    throw new UnauthorizedException('Credenciais inválidas')
  }
}

export function verifyIsAuthorized({
  request,
  controller,
  controllerInstance,
  method,
}: {
  controller: any
  controllerInstance: any
  method: any
  request: FastifyRequest
}) {
  if (!request.user) {
    throw new ForbiddenException('Acesso não autorizado')
  }

  const user: Record<string, any> = request.user as Record<string, any>

  const roles = [
    ...[Reflect.getMetadata(EAuthDecorators.ROLES, controller) ?? []],
    ...[Reflect.getMetadata(EAuthDecorators.ROLES, controller, method) ?? []],
    ...[
      Reflect.getMetadata(EAuthDecorators.ROLES, controllerInstance, method) ??
        [],
    ],
    ...[Reflect.getMetadata(EAuthDecorators.ROLES, controllerInstance) ?? []],
  ]

  const denied = [
    ...[Reflect.getMetadata(EAuthDecorators.DENIED, controller) ?? []],
    ...[Reflect.getMetadata(EAuthDecorators.DENIED, controller, method) ?? []],
  ]

  const hasRole = (roles: string[], userRoles: string[]) => {
    return userRoles.some((role) => roles.includes(role))
  }

  if (roles.length && !hasRole(roles, user.roles)) {
    throw new ForbiddenException('Acesso não autorizado')
  }

  if (roles.length && hasRole(denied, user.roles)) {
    throw new ForbiddenException('Acesso a esta funcionalidade negado!')
  }
  return true
}
