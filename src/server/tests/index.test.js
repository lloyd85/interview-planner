import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';
import UserModel from '../user/UserModel';
import InterviewModel from '../interview/InterviewModel';

const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  UserModel.collection.drop();

  beforeEach(done => {
    const newUser = new UserModel({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john.doe',
      password: 'secret',
      email: 'johndoe@me.com',
      phone: '0791111111',
      dob: '01/01/1980',
      street: '12 Some Street',
      city: 'London',
      postcode: 'EC1 3WR',
    });

    newUser.save(error => done());
  });

  it('should list ALL users on /api/v1/users GET', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .end((error, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.results.should.be.a('array');
        res.body.results[0].should.have.property('_id');
        res.body.results[0].should.have.property('firstName');
        res.body.results[0].should.have.property('lastName');
        res.body.results[0].should.have.property('username');
        res.body.results[0].should.not.have.property('password');
        res.body.results[0].should.have.property('email');
        res.body.results[0].should.have.property('phone');
        res.body.results[0].should.have.property('dob');
        res.body.results[0].should.have.property('street');
        res.body.results[0].should.have.property('city');
        res.body.results[0].should.have.property('postcode');
        res.body.results[0].firstName.should.equal('John');
        res.body.results[0].lastName.should.equal('Doe');
        res.body.results[0].username.should.equal('john.doe');
        res.body.results[0].email.should.equal('johndoe@me.com');
        res.body.results[0].phone.should.equal('0791111111');
        res.body.results[0].dob.should.equal('01/01/1980');
        res.body.results[0].street.should.equal('12 Some Street');
        res.body.results[0].city.should.equal('London');
        res.body.results[0].postcode.should.equal('EC1 3WR');
        done();
      });
  });

  it('should list a SINGLE user on /api/v1/users/<id> GET', (done) => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'john.doe',
      password: 'secret',
      email: 'johndoe@me.com',
      phone: '0791111111',
      dob: '01/01/1980',
      street: '12 Some Street',
      city: 'London',
      postcode: 'EC1 3WR',
    };

    const newUser = new UserModel(userData);

    newUser.save((err, data) => {
      chai.request(server)
        .get(`/api/v1/users/${data._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.results.should.be.a('object');
          res.body.results.should.have.property('_id');
          res.body.results.should.have.property('firstName');
          res.body.results.should.have.property('lastName');
          res.body.results.should.have.property('username');
          res.body.results.should.not.have.property('password');
          res.body.results.should.have.property('email');
          res.body.results.should.have.property('phone');
          res.body.results.should.have.property('dob');
          res.body.results.should.have.property('street');
          res.body.results.should.have.property('city');
          res.body.results.should.have.property('postcode');
          res.body.results.firstName.should.equal('John');
          res.body.results.lastName.should.equal('Doe');
          res.body.results.username.should.equal('john.doe');
          res.body.results.email.should.equal('johndoe@me.com');
          res.body.results.phone.should.equal('0791111111');
          res.body.results.dob.should.equal('01/01/1980');
          res.body.results.street.should.equal('12 Some Street');
          res.body.results.city.should.equal('London');
          res.body.results.postcode.should.equal('EC1 3WR');
          res.body.results._id.should.contain(data._id);
          done();
        });
    });
  });

  it('should add a SINGLE user on /api/v1/users POST', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'john.doe',
      password: 'secret',
      email: 'johndoe@me.com',
      phone: '0791111111',
      dob: '01/01/1980',
      street: '12 Some Street',
      city: 'London',
      postcode: 'EC1 3WR',
    };

    chai.request(server)
      .post('/api/v1/users')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
        done();
      });
  });

  it('should update a SINGLE user on /api/v1/users/<id> PUT', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/users/${res.body.results[0]._id}`)
          .send({'firstName': 'Jane'})
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('results');
            response.body.results.should.be.a('object');
            response.body.results.should.have.property('firstName');
            response.body.results.should.have.property('_id');
            response.body.results.firstName.should.equal('Jane');
            done();
          });
      });
  });

  it('should delete a SINGLE user on /api/v1/users/<id> DELETE', (done) => {
    const newUserData = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'john.doe',
      password: 'secret',
      email: 'johndoe@me.com',
      phone: '0791111111',
      dob: '01/01/1980',
      street: '12 Some Street',
      city: 'London',
      postcode: 'EC1 3WR',
    };

    const newUser = UserModel(newUserData);

    newUser.save(newUser, (err, data) => {
      chai.request(server)
        .delete(`/api/v1/users/${data._id}`)
        .end((error, response) => {
          response.should.have.status(204);
          response.should.be.json;
          response.message.should.be.a('string');
          response.body.should.have.property('message');
          done();
        });
    });
    UserModel.collection.drop();
  });
});

describe('Interviews', () => {
  InterviewModel.collection.drop();

  beforeEach(done => {
    const newInterview = new InterviewModel({
      role: 'Developer',
      company: 'Coca Cola'
    });

    newInterview.save(error => done());
  });

  it('should list ALL interviews on /api/v1/interviews GET', (done) => {
    chai.request(server)
      .get('/api/v1/interviews')
      .end((error, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.results.should.be.a('array');
        res.body.results[0].should.have.property('_id');
        res.body.results[0].should.have.property('role');
        res.body.results[0].should.have.property('company');
        res.body.results[0].role.should.equal('Developer');
        res.body.results[0].company.should.equal('Coca Cola');
        done();
      });
  });

  it('should list a SINGLE interview on /api/v1/interviews/<id> GET', (done) => {
    const newInterview = {
      role: 'Developer',
      company: 'Coca Cola',
    };

    InterviewModel.create(newInterview, (err, data) => {
      chai.request(server)
        .get(`/api/v1/interviews/${data._id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.results.should.be.a('object');
          res.body.results.should.have.property('_id');
          res.body.results.should.have.property('company');
          res.body.results.should.have.property('role');
          res.body.results.role.should.equal('Developer');
          res.body.results.company.should.equal('Coca Cola');
          res.body.results._id.should.contain(data._id);
          done();
        });
    });
  });

  it('should add a SINGLE interview on /api/v1/interviews POST', (done) => {
    chai.request(server)
      .post('/api/v1/interviews')
      .send({'role': 'Java Developer', 'company': 'Fanta'})
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
        done();
      });
  });

  it('should update a SINGLE interview on /api/v1/interviews/<id> PUT', (done) => {
    chai.request(server)
      .get('/api/v1/interviews')
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/interviews/${res.body.results[0]._id}`)
          .send({'role': 'Tester'})
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('results');
            response.body.results.should.be.a('object');
            response.body.results.should.have.property('role');
            response.body.results.should.have.property('_id');
            response.body.results.role.should.equal('Tester');
            done();
          });
      });
  });

  it('should delete a SINGLE interview on /api/v1/interviews/<id> DELETE', (done) => {
    const interviewData = {
      role: 'Developer',
      company: 'Coca Cola'
    };

    const newInterview = new InterviewModel(interviewData);

    newInterview.save((err, data) => {
      chai.request(server)
        .del(`/api/v1/interviews/${data._id}`)
        .end((error, response) => {
          response.should.have.status(204);
          response.should.be.json;
          response.message.should.be.a('string');
          response.body.should.have.property('message');
          done();
        });
    });

    InterviewModel.collection.drop();
  });
});
