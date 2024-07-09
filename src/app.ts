import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';


export const app: Application = express();


app.use(cors());
app.use(express.json());
app.use('/api', router)

const test = (req: Request, res: Response) => {
  const a = 'Hello from the Nexus Workspace'
  res.send(a)
}

app.get('/', test)

export default app