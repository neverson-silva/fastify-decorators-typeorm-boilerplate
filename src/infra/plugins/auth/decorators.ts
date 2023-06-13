export function Roles(...roles: string[]): MethodDecorator | ClassDecorator {
  return function (target: any, propertyKey: string | symbol) {
    Reflect.defineMetadata('roles', roles, target, propertyKey)
  }
}
export function Allowed(...roles: string[]): MethodDecorator | ClassDecorator {
  return function (target: any, propertyKey: string | symbol) {
    Reflect.defineMetadata('roles', roles, target, propertyKey)
  }
}

export function Denied(...roles: string[]): MethodDecorator | ClassDecorator {
  return function (target: any, propertyKey: string | symbol) {
    Reflect.defineMetadata('deniedRoles', roles, target, propertyKey)
  }
}

export function Public() {
  return function (target: any, propertyKey?: string | symbol) {
    // @ts-ignore
    Reflect.defineMetadata('isPublic', true, target, propertyKey)
  }
}
