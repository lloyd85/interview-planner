import Express from 'express';

const interviewRoutes = Express.Router();
const interviewMockRoutes = Express.Router();

import {
  getInterviews,
  getInterview,
  addInterview,
  updateInterview,
  removeInterview,
  getMockInterviews,
  getMockInterview,
  addMockInterview,
  updateMockInterview,
  removeMockInterview,
} from './InterviewController';

interviewRoutes.get('/interviews', getInterviews);
interviewRoutes.get('/interviews/:id', getInterview);
interviewRoutes.post('/interviews', addInterview);
interviewRoutes.put('/interviews/:id', updateInterview);
interviewRoutes.delete('/interviews/:id', removeInterview);

interviewMockRoutes.get('/interviews', getMockInterviews);
interviewMockRoutes.get('/interviews/:id', getMockInterview);
interviewMockRoutes.post('/interviews', addMockInterview);
interviewMockRoutes.put('/interviews/:id', updateMockInterview);
interviewMockRoutes.delete('/interviews/:id', removeMockInterview);

export { interviewRoutes, interviewMockRoutes };
