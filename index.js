
import 'dotenv/config';
import "regenerator-runtime/runtime";
import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import Router from './src/routes/route';

// mongoose.connect('mongodb+srv://mongoadmin:4G3mHY8McXGq4C9t@cluster0-h449g.mongodb.net/artisthat?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
const server = http.createServer(app)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Range'
  );
  res.header(
    'Access-Control-Expose-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Range'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(fileUpload());
app.use((req, res, next) => {
  next();
});

const port = process.env.PORT || 4000
new Router(app);

server.listen(port, () => console.log(`Social app listening on port ${port}!`))


