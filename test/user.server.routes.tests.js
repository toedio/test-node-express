var chai = require('chai'),
chaiHttp = require('chai-http'),
should = chai.should();
chai.use(chaiHttp);

var userObj = {
  firstName: "Victor",
  lastName: "Clayton",
  password: "123456789",
  username: "asasaasas",
  email: "victor@victor.com.br"
};

describe('UserController', function() {
  it ('shoud create a user', function(done) {
    chai.request('http://localhost:3001')
    .post('/auth/signup')
    .send(userObj)
    .end(function (err, res) {
      should.not.exist(err);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('_id');
      res.body.should.have.property('displayName');
      res.body.should.have.property('username');
      res.body.should.have.property('firstName');
      res.body.should.have.property('lastName');
      res.body.should.have.property('email');
      res.body.should.have.property('roles');
      res.body.should.have.property('created');
      done();
    });
  });
});