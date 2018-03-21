import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server';
import InterviewModel from '../interview/InterviewModel';

const should = chai.should();

chai.use(chaiHttp);

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
      'role': 'Developer',
      'company': 'Coca Cola',
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
    const newInterviewData = {
      role: 'Developer',
      company: 'Coca Cola',
    };

    const newInterview = InterviewModel(newInterviewData);

    newInterview.save(newInterview, (err, data) => {
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
