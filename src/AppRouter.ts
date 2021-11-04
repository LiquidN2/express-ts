import { Router } from 'express';

export class AppRouter {
  private static instance: Router;

  // returns a global router
  static getInstance(): Router {
    if (!AppRouter.instance) AppRouter.instance = Router();

    return AppRouter.instance;
  }
}
