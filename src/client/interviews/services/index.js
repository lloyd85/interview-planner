import { API } from '../../shared/helpers';
import { authHeader } from '../../auth/helpers';
import { createBaseURL } from '../../shared/utils';

const getTokenHeader = () => {
  const token = window.localStorage ?
    JSON.parse(JSON.parse(window.localStorage.getItem('persist:root')).auth).token : '';

  return authHeader(token);
};

const url = createBaseURL('interviews');
const service = new API();

const InterviewsService = {
  fetchInterviews: () => service.get({ url, headers: getTokenHeader() }),
  fetchInterview: id => service.get({ url: `${url}/${id}` }),
  updateInterview: (id, data) => service.put({ url: `${url}/${id}`, data }),
  addInterview: data => service.post({ url, data }),
  removeInterview: id => service.delete({ url: `${url}/${id}` }),
};

export default InterviewsService;
