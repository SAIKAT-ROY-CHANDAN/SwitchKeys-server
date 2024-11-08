import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFoundRoute';


export const app: Application = express();


app.use(express.json());
app.use(cors());
app.use('/api', router)

const test = (req: Request, res: Response) => {
  const a = 'Hello from the Switch'
  res.send(a)
}

app.get('/', test)
app.use(globalErrorHandlers)
app.use(notFound)

export default app