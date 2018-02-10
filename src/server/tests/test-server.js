process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';
import InterviewModel from '../interview/InterviewModel';

const should = chai.should();

chai.use(chaiHttp);

describe('Interviews', () => {
  InterviewModel.collection.drop();

  beforeEach((done) => {
    const newInterview = new InterviewModel({
      role: 'Developer',
      company: 'Coca Cola'
    });

    newInterview.save((error) => {
      done();
    });
  });

/*
  afterEach((done) => {
    InterviewModel.collection.drop();
    done();
  });
*/

  it('should list ALL interviews on /api/v1/interviews GET', (done) => {
    chai.request(server)
      .get('/api/v1/interviews')
      .end((error, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('_id');
        res.body.data[0].should.have.property('role');
        res.body.data[0].should.have.property('company');
        res.body.data[0].role.should.equal('Developer');
        res.body.data[0].company.should.equal('Coca Cola');
        done();
      });
  });

  it('should list a SINGLE interview on /api/v1/interviews/<id> GET', (done) => {
    const newInterview = new InterviewModel({
      role: 'Developer',
      company: 'Mexxo',
    });

    newInterview.save((err, data) => {
      done();
      chai.request(server)
        .get(`/interviews/${data.id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('_id');
          res.body.data.should.have.property('company');
          res.body.data.should.have.property('role');
          res.body.data.role.should.equal('Developer');
          res.body.data.company.should.equal('Coca Cola');
          res.body.data._id.should.equal(data.id);
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
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('role');
        res.body.data.should.have.property('company');
        res.body.data.should.have.property('_id');
        res.body.data.role.should.equal('Java Developer');
        res.body.data.company.should.equal('Fanta');
        done();
      });
  });

  it('should update a SINGLE interview on /api/v1/interviews/<id> PUT', (done) => {
    chai.request(server)
      .get('/api/v1/interviews')
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/interviews/${res.body.data[0]._id}`)
          .send({'role': 'Tester'})
          .end((error, response) => {
            done();
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('data');
            response.body.data.should.be.a('object');
            response.body.data.should.have.property('role');
            response.body.data.should.have.property('_id');
            response.body.data.name.should.equal('Tester');
          });
      });
  });

  it('should delete a SINGLE interview on /api/v1/interviews/<id> DELETE', (done) => {
    chai.request(server)
      .get('/api/v1/interviews')
      .end((error, res) => {
        done();
        chai.request(server)
          .delete(`/api/v1/interviews/${res.body.data[0]._id}`)
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('message');
          });
      });
    InterviewModel.collection.drop();
  });
});
