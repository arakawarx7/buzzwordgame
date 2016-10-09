const request = require('supertest');
const app = require('../server');
const chai = require('chai');
chai.should();

const agent = request.agent(app);
const qs = require('querystring');

describe('BuzzWords', _ => {

  describe('GET /buzzwords', _ => {

    it('should respond with empty list, []', done => {
      agent
        .get('/buzzwords')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.deep.equal([]);
          done();
        });
    });
  });

  describe('POST /buzzwords', _ => {
    it('should save new buzzwords', done => {
      agent
        .post('/buzzwords')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(qs.stringify({ buzzWord : 'cat', points : 10 }))
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.deep.equal({ success : true });

          // verify it has been added
          agent
            .get('/buzzwords')
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              res.body.should.deep.equal([
                {
                  buzzWord: "cat",
                  points: 10
                }
              ]);
              done();
            });
        });
    });
  });

  describe('PUT /buzzwords', _ => {
    it('should update a buzzword', done => {
      agent
        .put('/buzzwords')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(qs.stringify({ buzzWord : 'cat' }))
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.deep.equal({
            "success": true,
            "newScore": 10
          });
          done();
        });
    });
  });

  describe('DELETE /buzzwords', _ => {
    it('should delete a buzzword', done => {
      agent
        .delete('/buzzwords')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(qs.stringify({ buzzWord : 'cat' }))
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.deep.equal({ success : true });

          // verify it has been deleted
          agent
            .get('/buzzwords')
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              res.body.should.deep.equal([]);
              done();
            });

        });
    });
  });
});