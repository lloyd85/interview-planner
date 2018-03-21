import { API } from '../../shared/helpers';
import { createBaseURL } from '../../shared/utils';

const loginURL = createBaseURL('login');
const forgotPasswordURL = createBaseURL('forgot');
const resetURL = createBaseURL('reset');
const service = new API();

const AuthService = {
  loginUser: data => service.post({ url: loginURL, data }),
  createPasswordToken: data => service.post({ url: forgotPasswordURL, data }),
  getPasswordToken: token => service.get({ url: `${resetURL}/${token}` }),
  updatePassword: (token, data) => service.post({ url: `${resetURL}/${token}`, data }),
};

export default AuthService;
