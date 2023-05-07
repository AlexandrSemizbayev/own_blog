import express from 'express';
import path from 'node:path';
// import { engine } from 'express-handlebars';
import {engine} from 'express-handlebars';
import dotenv from 'dotenv';
import {connectToDB} from './db/postgresql';
import routes from './routes/entry';

dotenv.config();

const app = express();

app.use(express.json());

app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'default',
}));
app.set('view engine', '.hbs');
// app.set('views', './views');
app.set("views", path.resolve(__dirname, "./views"));

app.use(routes);

// app.get('/', (req, res) => {
//     res.render('home');
// });

async function start() {
  try {
    console.log('try start');
    await connectToDB();
    console.log('connected');
    app.listen(3003,() => {
      console.log('port is 3003');
    });
  } catch (e) {
    console.log(e);
  }
}

start();
