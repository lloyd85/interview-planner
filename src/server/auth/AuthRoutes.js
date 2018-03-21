import Express from 'express';
import {
  authenticateMockUser,
  authenticateUser,
  createPasswordToken,
  getPasswordToken,
  updatePassword,
} from '../auth/AuthController';

const authRoutes = Express.Router();
const authMockRoutes = Express.Router();

authRoutes.post('/login', authenticateUser);
authRoutes.post('/forgot', createPasswordToken);
authRoutes.get('/reset/:token', getPasswordToken);
authRoutes.post('/reset/:token', updatePassword);

authMockRoutes.post('/login', authenticateMockUser);
// authMockRoutes.get('/logout', logoutUser);
// authMockRoutes.post('/forgot', createPasswordToken);
// authMockRoutes.get('/reset/:token', getPasswordToken);
// authMockRoutes.post('/reset/:token', updatePassword);

export { authMockRoutes, authRoutes };
