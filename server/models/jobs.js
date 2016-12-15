var dbConnect = require('./db-connect');

module.exports = {
    getAll: getAll,
    create: create
};

/**
 * getAll function that gets all Jobs on the DB and sends them back as an array
 * @param  {Function} done Callback function
 * @return {void}
 */
function getAll(done) {
    dbConnect(function connectHandler(err, db) {
        if (err) {
            done(err, null);
            return;
        }
        db.collection('jobs')
            .find()
            .toArray(done);
    });
}

/**
 * Creates a POST to create a job and send it to the API
 * @param {Function} done Callback Function
 * @return {void}
 */
function create(data, done) {
    dbConnect(function createHandler(err, db) {
        if (err) {
            done(err);
        }
        data.createTime = Date.now();
        db.collection('jobs')
            .insert(data, done);

    })
}
