var dbConnect = require('./db-connect');
var ObjectID = require('mongodb').ObjectID;
var newData = {};

module.exports = {
    getAll: getAll,
    getOne: getOne,
    create: create,
    demolishOne: demolishOne

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
            .toArray(function mapData(err, data) {
                var mappedData = data.map(function(data) {
                    return {
                        'id': data._id,
                        'company': data.company,
                        'link': data.link
                    };
                });
                done(err, mappedData);
            });
    });
}

/**
 * Get one Job from the server
 * @param  {jobID}   jobID that will be received
 * @param  {Function} done callback function
 * @return {void}        
 */
function getOne(jobID, done) {
  dbConnect(function getOneHandler(err, db) {
    if (err) {
      done(err);
      return;
    }
    db.collection('jobs')
      .findOne({_id: ObjectID(jobID)}, function callback(err, data) {
        newData = {
          'id': data._id,
          'company': data.company,
          'notes': data.notes,
          'link': data.link,
          'createTime': data.createTime
        }
          done(null, newData);
      });

  })
};

/**
 * Creates a POST to create a job and send it to the API
 * @param {Function} done Callback Function
 * @return {void}
 */
function create(data, done) {
    dbConnect(function createHandler(err, db) {
        if (err) {
            done(err);
            return;
        }
        data.createTime = Date.now();
        db.collection('jobs')
            .insert(data, done);

    })
};

/**
 * Remove a job from the list of jobs
 * @param  {Object}   removed  Information that will be removed
 * @param  {Function} done callback function
 * @return {void}
 */
function demolishOne(removed, done) {
  dbConnect(function handler(err, db) {
    if(err) {
      console.error(err);
      done(err);
      return;
    }
    db.collection('jobs')
      .findOne({_id: ObjectID(removed)}, function cBack(err, data) {
        cleanData = {
          'id': data._id,
          'company': data.company,
          'notes': data.notes,
          'link': data.link,
          'createTime': data.createTime
        };
      });
      db.collection('jobs')
        .findOneAndDelete({_id: ObjectID(removed)})
        .then(function success(finish) {
          done(null, cleanData);
        }, function failure(value) {
          done(value, null);
        });

  })

};
