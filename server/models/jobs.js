var dbConnect = require('./db-connect');

module.exports = {
  getAll: getAll
};

function getAll(done) {
  dbConnect(function connectHandler(err, db) {
    if(err){
      done(err, null);
      return;
    }
    db.collection('jobs')
      .find()
      .toArray(done);
  });
}
