import Express from 'express';
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
import { isAuthenticated } from '../middleware';

const interviewRoutes = Express.Router();
const interviewMockRoutes = Express.Router();

interviewRoutes.get('/interviews', isAuthenticated, getInterviews);
interviewRoutes.get('/interviews/:id', getInterview);
interviewRoutes.post('/interviews', addInterview);
interviewRoutes.put('/interviews/:id', updateInterview);
interviewRoutes.delete('/interviews/:id', removeInterview);

interviewMockRoutes.get('/interviews', isAuthenticated, getMockInterviews);
interviewMockRoutes.get('/interviews/:id',isAuthenticated, getMockInterview);
interviewMockRoutes.post('/interviews', isAuthenticated, addMockInterview);
interviewMockRoutes.put('/interviews/:id', isAuthenticated, updateMockInterview);
interviewMockRoutes.delete('/interviews/:id', isAuthenticated, removeMockInterview);

export { interviewRoutes, interviewMockRoutes };
