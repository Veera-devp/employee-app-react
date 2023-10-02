import * as dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import express from 'express';
import morgan from 'morgan';
import jobRouter from './routers/jobRouter.js';


dotenv.config();
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/',(req,res)=>
{
  console.log(req);
  res.json({message:'data recived',data:req.body});
});

app.use('/api/v1/jobs', jobRouter);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});


const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server running on PORT ${port}....`);
});
