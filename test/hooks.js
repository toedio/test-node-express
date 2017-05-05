process.env.NODE_ENV='test'
process.env.PORT=3001

var db;

before('Starting server', function() {
  require('../server.js')(db);
  console.log(db);
});

after('Clean database', function() {
 console.log('acaboooooooou');
})