import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <div>
      <h1>Hi There</h1>
    </div>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (): void =>
  console.log(`👂👂👂 Listening on port ${PORT} 👂👂👂`)
);
