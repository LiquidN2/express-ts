import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from './decorators';

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send('not permitted');
};

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response): void {
    if (req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <div>You're logged in</div>
          <a href='/logout'>Logout</a>
        </div>
      `);

      return;
    }

    res.redirect('/login');
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response): void {
    res.send('You are in protected route');
  }
}
