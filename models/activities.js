const mongoose = require('mongoose');

//create a schema for activities

const activitySchema = mongoose.Schema({
      activity_name:{
            type: String,
            required: true
      },
      create_date:{
            type: Date,
            default: Date.now,
            required: true
      },
      quantity:{
            type: Number,
            required: true
      }
});

var Activitiy = module.exports = mongoose.model('Activity', activitySchema);

// get Activities

module.exports.getActivities = function(callback, limit){
  Activity.find(callback).limit(limit);
}

// get Activity

module.exports.getActivityById = function(id, callback){
  Activity.findById(id, callback);
}

//add activity

module.exports.addActivity = function(activity, callback){
  Activity.create(activity, callback).limit;
}

//update activity

module.exports.updateActivity = function(id, activity, options, callback){
    var query = {_id: id};
    var update = {
        activity_name: activity.activity_name,
        create_date: activity.create_date,
        quantity: activity.quantity
    }

// delete activity

module.exports.removeActivity = function(id, callback){
  var query = {_id: id};
  Activity.remove(query, callback);
}

  Activity.findOneAndUpdate(query, update, uptions, callback).limit;
}
