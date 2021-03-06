import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

type Decorator = (target: any, key: string, desc: PropertyDescriptor) => void;
type DecoratorGenerator = (path: string) => Decorator;
interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(requestMethod: string): DecoratorGenerator {
  return function (path: string): Decorator {
    return function (
      target: any,
      key: string,
      desc: RouteHandlerDescriptor
    ): void {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, requestMethod, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
