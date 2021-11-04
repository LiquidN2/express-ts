import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { NextFunction, Request, Response, RequestHandler } from 'express';

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction): void {
    if (!req.body) {
      res.status(422).send('invalid request');
      return;
    }

    keys.forEach((key: string): void => {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    });

    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function): void {
    const router = AppRouter.getInstance();

    // loop through each method in the instance prototype
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      // Get the path from metadata
      const path: MetadataKeys = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );

      // get the method from metadata
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      // get the middlewares from metadata;
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      // get body validator
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requiredBodyProps);

      if (!path || !method) return;

      router[method](
        `${routePrefix}${path}`,
        ...middlewares,
        validator,
        routeHandler
      );
    }
  };
}
