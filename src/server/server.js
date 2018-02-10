import Express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { interviewRoutes, interviewMockRoutes } from './interview/InterviewRoutes';

const app = new Express();
const port = process.env.PORT || 3001;
const apiVersion = '1';

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(`/api/v${apiVersion}/`, interviewRoutes);
app.use(`/mock-api/v${apiVersion}/`, interviewMockRoutes);

const server = http.createServer(app);

server.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎 Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});

export default app;