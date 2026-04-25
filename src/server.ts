import app from './app';
import { connectDB } from './util/db';


const start = async() => {
  
  await connectDB();
  
  app.listen(3000, () => {
    console.log('Server is up, 3000');
  })
}

start();