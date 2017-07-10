const express = require('express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
Activity = require('./models/activities');

const users = {
  'ethan': 'test'
}

passport.use(new BasicStrategy(
  function(username, password, done) {
      const userPassword = users[username];
      if (!userPassword) { return done(null, false); }
      if (userPassword !== password) { return done(null, false); }
      return done(null, username);
  }
));

app.use(bodyParser.json());
//connect to mongoose

mongoose.connect('mongoosedb://localhost/statTracker');
const db = mongoose.connection;

//render home page and redirect to activities -----//

app.get('/', function(req, res){
  res.send('hey there')
  // res.redirect('/api/activities');
});

//--- Show a list of all activities I am tracking, and links to their individual pages -----------------------------//

app.get('/api/activities', function(req, res){
  Activity.getActivity(function(err, activities){
    if(err){
      throw err;
    }
      res.json(activities);
  });
})

//--- Create a new activity for me to track. ----------------------//

app.post('/api/activities', function(req, res){
  let activity = req.body.activity;
  let create_date = req.body.date;
  let quantity = req.body.quantity;
  Activity.addActivity(activity, function(err, activity){
    if(err){
      throw err;
    }
      res.json(activity);
  });
})

//--- Show information about one activity I am tracking, and give me the data I have recorded for that activity.  ----------------------//

app.get('/api/activities/:_id', function(req, res){
  Activities.getActivityById(req.params._id, function(err, activity){
    if(err){
      throw err;
    }
      res.json(activity);
  });
})

//--- Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data. --------------------------------//

app.put('/api/activities/:id', function(req, res){
  let id = req.params._id;
  let activities = req.body.activity;
  Activity.updateActivity(id, activity, {}, function(err, activity){
    if(err){
      throw err;
    }
      res.json(activity);
  });
})

//--- Delete one activity I am tracking. This should remove tracked data for that activity as well. --------------------------------//

app.delete('/api/activities/:id', function(req, res){
  let id = req.params._id;
  Activity.removeActivity(id, function(err, activity){
    if(err){
      throw err;
    }
      res.json(activity);
  });
})

//--- Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.. ----------------------//

app.post('/api/activities:id', function(req, res){
  let quantity = req.body.quantity;
  Activity.addActivityById(activity, function(err, activity){
    if(err){
      throw err;
    }
      res.json(activity);
  });
})

//--- Remove tracked data for a day. --------------------------------//

app.delete('/api/stats/:id', function(req, res){
  let id = req.params._id;
  Activity.removeStats(id, function(err, activity){
    if(err){
      throw err;
    }
      res.json(activity);
  });
})

app.get('/api/hello',
    passport.authenticate('basic', {session: false}),
    function (req, res) {
        res.json({"hello": req.user})
    }
);

app.listen(3000);
console.log('starting applicaiton.  Good job!');
