import Express from 'express';
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  removeUser,
  getMockUser,
  getMockUsers,
  addMockUser,
  updateMockUser,
  removeMockUser,
} from '../user/UserController';
import { isAuthenticated } from '../middleware';

const userRoutes = Express.Router();
const userMockRoutes = Express.Router();

userRoutes.get('/users', getUsers);
// userRoutes.get('/users', isAuthenticated, getUsers);
userRoutes.get('/users/:id', getUser);
userRoutes.post('/users', addUser);
userRoutes.put('/users/:id', updateUser);
userRoutes.delete('/users/:id', removeUser);

userMockRoutes.get('/users', getMockUsers);
userMockRoutes.get('/users/:id', getMockUser);
userMockRoutes.post('/users', addMockUser);
userMockRoutes.put('/users/:id', updateMockUser);
userMockRoutes.delete('/users/:id', removeMockUser);

export { userRoutes, userMockRoutes };
