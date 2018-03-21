import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import config from '../config';
import UserModel from '../user/UserModel';

const nodemailerMailgun = nodemailer.createTransport(mg(config.nodemailerAuth));

const createToken = user => jwt.sign({
    _id: user._id,
    username: user.username,
  },
  config.jwtSecret,
  { expiresIn: 60 * 2 });

export const authenticateUser = async (req, res) => {
  const { body: { username, password } } = req;

  try {
    const userArray = await UserModel.find({username});
    const user = userArray[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    if (!user) {
      return res.status(401).json({ message: `User with username ${username} not found` });
    }

    return res.status(200).json({ token: createToken(user), message: 'User logged in successfully' });

  } catch (error) {
    res.status(500).json({ error: new Error('Unknown server error when trying to log in User') });
  }
};

export const createPasswordToken = async (req, res, next) => {
  try {
    const buffer = await crypto.randomBytes(20);
    const token = buffer.toString('hex');
    const user = await UserModel.findOneAndUpdate(req.body, {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      }, { new: true });

    const mailOptions = {
      to: user.email,
      from: 'password-reset@lloydntim.com',
      subject: 'Password Reset',
      text: `Please find below the link you have requested to reset your password.
      \nhttp://localhost:3002/reset/${token}\n\n
      If you did not request this email and remember it your password ignore this email.`,
    };

    const messageSentSuccess = await nodemailerMailgun.sendMail(mailOptions);

    if (!buffer) {
      return res.status(401).json({ message: 'Token is invalid.' });
    }

    if (!messageSentSuccess) {
      return res.status(401).json({ message: 'Notification message could not be sent.' });
    }

    return res.status(200).json({
      message: `An email has been sent to ${user.email} with further instructions.`,
    });
  } catch (error) {
    next(error);
    res
      .status(500)
      .json({ error: new Error('Unknown server error when trying create password token') });
  }
};

export const getPasswordToken = async (req, res) => {
  try {
    const user = UserModel.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(401).json({ error: 'Password reset token is invalid or has expired.' });
    }

    return res.status(200).json({ token: createToken(user) });
  } catch (error) {
    res.status(500).json({ error: new Error('Unknown server error when trying get password token') });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await UserModel
      .findOneAndUpdate({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      }, {
        password: hash,
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined,
      });

    const mailOptions = {
      to: user.email,
      from: 'password-reset@lloydntim.com',
      subject: 'Password has been changed',
      text: `Hello,\n\n
        This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
    };

    const messageSentSuccess = await nodemailerMailgun.sendMail(mailOptions);

    if (!user) {
      req.status(401).json({ error: 'Password reset token is invalid or has expired.' });
    }

    if (!messageSentSuccess) {
      return res.status(401).json({ message: 'Notification message could not be sent.' });
    }

    res
      .status(200)
      .json({ token: createToken(user), message: 'Success! Your password has been changed.'});
  } catch (error) {
    res
      .status(500)
      .json({ error: new Error('Unknown server error when trying get password token') });
  }
};

const mockData = [
  {
    _id: '0',
    username: 'john.doe',
    password: 'password1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@noname.com',
    interviews: ['123']
  },
  {
    _id: '1',
    username: 'joe.bloggs',
    password: 'password2',
    firstName: 'Joseph',
    lastName: 'Bloggs',
    email: 'joseph.bloggs@noname.com',
    interviews: ['456']
  },
  {
    _id: '2',
    username: 'jane.doe',
    password: 'password3',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@noname.com',
    interviews: ['789']
  },
];

export const authenticateMockUser = (req, res) => {
  const { body: { username, password } } = req;
  const user = mockData.filter(result =>
    (result.username === username && result.password === password))[0];

  if (!user) {
    return res.status(404).json({ error: new Error(`User with username ${username} not found`) });
  }

  return res.status(200).json({ token: createToken(user), message: 'User logged in successfully' });
};
