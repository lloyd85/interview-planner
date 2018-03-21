import InterviewModel from './InterviewModel';

export const getInterviews = async (req, res) => {
  try {
    const interviews = await InterviewModel.find({});
    res.status(200).json({ results: interviews });
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve Interviews' });
  }
};

export const getInterview = async (req, res) => {
  const { params: { id } } = req;

  try {
    const interview = await InterviewModel.findById(id);

    if (!interview) {
      return res.status(404).json({ error: new Error(`Interview with id ${id} not found`) });
    } else {
      res.status(200).json({ results: interview });
    }
  } catch (error) {
    res.status(500).json({ error: new Error(`Unknown server error when trying to retrieve Interview with id ${id}`)});
  }
};

export const addInterview = async (req, res) => {
  const { body: { role, company } } = req;

  try {
    const newInterview = await InterviewModel.create({ role, company });
    res.status(201).json({ message: `New Interview created with id ${newInterview.id }` });

  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      res.status(409).json({ message: error.message });
    }
    res.status(500).json({ error: 'Could not create Interview' });
  }
};

export const updateInterview = async (req, res) => {
  const { params: { id }, body } = req;

  try {
    const interview = await InterviewModel
      .findByIdAndUpdate(id, { $set: body }, { new: true });

    if (!interview) {
      return res.status(404).json({ error: new Error(`Interview with id ${id} not found`) });
    } else {
      res.status(200).json({ message: 'Interview successfully updated', results: interview });
    }
  } catch (error) {
    res.status(500).json({ error: new Error(`Unknown server error when trying to delete Interview with id ${id}`) });
  }
};

export const removeInterview = async (req, res) => {
  const { params: { id } } = req;

  try {
    const interview = await InterviewModel.findOneAndRemove({ _id: id });

    if (!interview) {
      return res.status(404).json({ error: new Error(`Interview with id ${ id} not found`) });
    } else {
      res.status(204).json({ message: 'Interview successfully deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: new Error(`Unknown server error when trying to delete Interview with id ${id}`) });
  }
};

const mockResults = [
  { _id: '123', role: 'Developer', company: 'Google' },
  { _id: '456', role: 'Teamlead', company: 'Facebook' },
  { _id: '789', role: 'Manager', company: 'Twitter' },
];

export const getMockInterviews = (req, res) => {
  return res.status(200).json({ results: mockResults });
};

export const getMockInterview = (req, res) => {
  const { params: { id } } = req;
  const results = mockResults.filter((result) => result._id === id)[0];

  if (results.length === 0) {
    return res.status(404).json({ error: new Error(`Interview with id ${id} not found`) });
  }
  return res.status(200).json({ results });
};

export const addMockInterview = (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(500).json({ error: new Error('Interview could not be created') });
  }
  return res.status(201).json({ message: 'Interview has been added' });
};

export const updateMockInterview = (req, res) => {
  const { params: { id }, body } = req;
  const results = mockResults
    .map(result => result._id === id ? { ...result, ...body } : result)
    .filter((result) => result._id === id)[0];

  if (results.length === 0) {
    return res.status(404).json({ error: new Error(`Interview with id ${id} not found`) });
  }
  return res.status(200).json({ results });
};

export const removeMockInterview = (req, res) => {
  const { params: { id } } = req;
  const results = mockResults.filter((result) => result._id !== id);

  if (results.length === 0) {
    return res.status(404).json({ error: new Error(`Interview with id ${id} not found`) });
  }
  return res.status(204).json({ message: 'Interview has been removed' });
};
