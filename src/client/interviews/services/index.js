import { API } from '../../shared/helpers';
import { createBaseURL } from '../../shared/utils';

const url = createBaseURL('interviews');
const service = new API();

const InterviewsService = {
  fetchInterviews: () => service.get({ url }),
  fetchInterview: id => service.get({ url: `${url}/${id}` }),
  updateInterview: (id, data) => service.put({ url: `${url}/${id}`, data }),
  addInterview: data => service.post({ url, data }),
  removeInterview: id => service.delete({ url: `${url}/${id}` }),
};

export default InterviewsService;
