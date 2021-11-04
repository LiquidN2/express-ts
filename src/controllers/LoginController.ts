import type { Request, Response } from 'express';
import { controller, get, post, use, bodyValidator } from './decorators';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

@controller('')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method='POST'>
        <div>
          <label for='email'>Email</label>
          <input type='email' id='email' name='email' />
        </div>
        <div>
          <label for='password'>Password</label>
          <input type='password' id='password' name='password' />
        </div>
        <button type='submit'>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: RequestWithBody, res: Response): void {
    const { email, password } = req.body;

    if (email === 'hi@hi.com' && password === 'password') {
      // marked as logged in
      req.session = { loggedIn: true };

      // redirect to root route
      res.redirect('/');

      return;
    }

    res.status(422).send('Invalid email or password');
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect('/');
  }
}
