var express = require('express');
var router = express.Router();
var Puppy = require('../models/Puppy');
var User = require('../models/User');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');

var pages = ['index', 'submitpuppy', 'puppy', 'signup', 'login', 'logout']

fetchCurrentUser = function (req) {
  return new Promise(function(resolve, reject){

    if (req.session == null){
      resolve(null);
      return;
    }

    if (req.session.user == null) {
      resolve(null);
      return;
    }

    var userId = req.session.user;
    User.findById(userId, function(err, user){

        if ( err ) {
          reject(err);
          return;
        }
        resolve(user);
        return;
    });
  })
}

fetchPuppies = function(){
  return new Promise(function(resolve, reject){
    Puppy.find(null, function(err, puppies){
      if(err){
        reject(err);
        return;
      }
      resolve(puppies);
    })
  })
}

userLoggedInOrOut(user){
  return new Promise(function(resolve, reject){
    var link ='';
    var data = {};
    if (user == null) { // user not logged in
      link = '<li class="nav-item"><a href="/signup">Join</a></li>';
    } else {
      link = '<li class="nav-item"><a href="/signup">'+ user.name + '</a></li>';
    }

    data['menu'] = {
      account: link
    }
    return fetchPuppies();
  })
}

router.get('/', function(req, res, next) {

  var data = {};
  fetchCurrentUser(req)
  .then(function(user) {
    userLoggedInOrOut(user);
  })
  .then(function(puppies){
    data['puppies'] = puppies;
    res.render('index', data);
  })
  .catch(function(err){
    console.log("User not logged IN");
    res.render('error', err);
  })
  return;
});


router.get('/:page', function(req, res, next){
  var page = req.params.page

  if (pages.indexOf(page) == -1){ // error
    res.render('error', {message:'Page not found. Check your spelling.'})
    return;
  }

  if (page == 'logout'){
    req.session.reset()
    res.redirect('/')
    return;
  }


  var data = {};
  fetchCurrentUser(req)
  .then(function(user) {
    var link = '';
    if (user == null) { // user not logged in
      link = '<li class="nav-item"><a href="/signup">Join</a></li>';
    } else {
      link = '<li class="nav-item"><a href="/signup">'+ user.name + '</a></li>';
    }

    data['menu'] = {
      account: link
    }
    res.render(page, data);
    return;
  })
  .catch(function(err){
    console.log("User not logged IN");
    res.render('error', err);
  })

})

router.post('/:page', function(req, res, next){
  var page = req.params.page

  if (pages.indexOf(page) == -1){ // error
    res.render('error', {message:'Page not found. Check your spelling.'})
    return;
  }

  if (page == 'submitpuppy'){
    var data = req.body
    Puppy.create(data, function(err, puppy){
      if (err){
        res.render('error', err)
        return;
      }
      res.redirect('/') // it worked, go to home page
    })
  }
  else if (page == 'signup'){
    var data = req.body;

    // Intercept password, hash it, then enter to db
    var password = data.password; // plain text password
    var hashed = bcrypt.hashSync(password, 10);
    data['password'] = hashed; // replace with hashed pw


    User.create(data, function(err, user){
      if (err){
        res.render('error', err)
        return;
      }

      req.session.user = user._id;
      res.redirect('/');// it worked, go to home page
    })
  }
  else if (page == 'login'){
    var data = req.body;
//    console.log(JSON.stringify(data)) // {"email":"awef","password":"awef"}
    var formattedEmail = data.email.toLowerCase().trim();

    User.find({email: formattedEmail}, function(err, users){
      if (err){
        res.render('error', err)
        return;
      }

      if (users.length == 0){
        res.render('error', {message: 'User not found. Check spelling.'})
        return;
      }

      var user = users[0]
      console.log('USER: '+JSON.stringify(user));

      var passwordCorrect = bcrypt.compareSync(data.password, user.password)
      if (passwordCorrect == false){ // password failed
        res.render('error', {message: 'Wrong password.'})
        return;
      }

      // successful login
      req.session.user = user._id

      res.redirect('/');
      return;
    })
  }


})

module.exports = router;
