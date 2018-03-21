import { API } from '../../shared/helpers';
import { createBaseURL } from '../../shared/utils';

const url = createBaseURL('users');
const service = new API();

const UsersService = {
  fetchUsers: () => service.get({ url }),
  fetchUser: id => service.get({ url: `${url}/${id}` }),
  updateUser: (id, data) => service.put({ url: `${url}/${id}`, data }),
  addUser: data => service.post({ url, data }),
  removeUser: id => service.delete({ url: `${url}/${id}` }),
};

export default UsersService;
