import bcrypt from 'bcrypt';
import UserModel from '../user/UserModel';

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).select('-password');

    res.status(200).json({ results: users });
  } catch (error) {
    res.status(500).json({ error: new Error('Unknown server error when trying to retrieve Users') });
  }
};

export const getUser = async (req, res) => {
  const { params: { id } } = req;

  try {
    const user = await UserModel.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: new Error(`User with id ${id} not found`) });
    } else {
      res.status(200).json({ results: user });
    }
  } catch (error) {
    res.status(500).json({ error: new Error(`Unknown server error when trying to retrieve User with id ${id}`)});
  }
};

export const addUser = async (req, res) => {
  const { body } = req;

  try {
    const hash = await bcrypt.hash(body.password, 10);
    body.password = hash;
    const newUser = await UserModel.create(body);
    res.status(201).json({ message: `New User created with id ${newUser.id }` });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      res.status(409).json({ message: error.message });
    }
    res.status(500).json({ error: 'Unknown server error when trying to create User' });
  }
};

export const updateUser = async (req, res) => {
  const { params: { id }, body } = req;

  try {
    const user = await UserModel
      .findByIdAndUpdate(id, { $set: body }, { new: true })
      .select({ password: 0, __v: 0 });

    if (!user) {
      return res.status(404).json({ error: new Error(`User with id ${id} not found`) });
    } else {
      res.status(200).json({ message: 'User successfully updated', results: user });
    }
  } catch (error) {
    res.status(500).json({ error: new Error(`Unknown server error when trying to delete User with id ${id}`) });
  }
};

export const removeUser = async (req, res) => {
  const { params: { id } } = req;

  try {
    const user = await UserModel.findOneAndRemove({ _id: id });

    if (!user) {
      return res.status(404).json({ error: new Error(`User with id ${ id} not found`) });
    } else {
      res.status(204).json({ message: 'User successfully deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: new Error(`Unknown server error when trying to delete User with id ${id}`) });
  }
};


const mockResults = [
  {
    _id: '0',
    username: 'john.doe',
    password: 'password1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@noname.com',
    users: ['123']
  },
  {
    _id: '1',
    role: 'joe.bloggs',
    company: 'password2',
    firstName: 'Joseph',
    lastName: 'Bloggs',
    email: 'joseph.bloggs@noname.com',
    users: ['456']
  },
  {
    _id: '2',
    role: 'jane.doe',
    company: 'password3',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@noname.com',
    users: ['789'],
  },
  {
    _id: '3',
    role: 'admin',
    company: 'admin',
    firstName: 'Lloyd',
    lastName: 'Ntim',
    email: 'lloyd.ntim@noname.com',
    users: ['111']
  },
];

export const getMockUsers = (req, res) => {
  return res.status(200).json({ results: mockResults });
};

export const getMockUser = (req, res) => {
  const { params: { id } } = req;
  const results = mockResults.filter((result) => result._id === id)[0];

  if (results.length === 0) {
    return res.status(404).json({ error: new Error(`User with id ${id} not found`) });
  }
  return res.status(200).json({ results });
};

export const addMockUser = (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(500).json({ error: new Error('User could not be created') });
  }
  return res.status(201).json({ message: 'User has been added' });
};

export const updateMockUser = (req, res) => {
  const { params: { id }, body } = req;
  const results = mockResults
    .map(result => result._id === id ? { ...result, ...body } : result)
    .filter((result) => result._id === id)[0];

  if (results.length === 0) {
    return res.status(404).json({ error: new Error(`User with id ${id} not found`) });
  }
  return res.status(200).json({ results });
};

export const removeMockUser = (req, res) => {
  const { params: { id } } = req;
  const results = mockResults.filter((result) => result._id !== id);

  if (results.length === 0) {
    return res.status(404).json({ error: new Error(`User with id ${id} not found`) });
  }
  return res.status(204).json({ message: 'User has been removed' });
};
