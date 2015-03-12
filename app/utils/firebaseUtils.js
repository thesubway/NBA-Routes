var Firebase = require('firebase');
var forge = "https://nba-routes1.firebaseio.com/"; /* Your Firebase URL Goes Here */
var ref = new Firebase(forge);
var cachedUser = null;

//var firebaseUtils = require('firebaseUtils');
var firebaseUtils = {
	getRef: function() {
		return(
			ref
		);
	},
	createUser: function(user,cb) {
		//use guide for Firebase.createUser() here.
		ref.createUser(user, function(error){
			if (error) {
				switch(error.code) {
					case "EMAIL_TAKEN":
					    console.log("The new user account cannot be created because the email is already in use.");
					    break;
					case "INVALID_EMAIL":
					    console.log("The specified email is not a valid email.");
					    break;
					default:
					    console.log("Error creating user:", error);
				}
			}
			else {
				console.log("Successfully created user account with uid:", userData.uid);
			}
		}.bind(this));
	}
};

var formatEmailForFirebase =  function(email){
  var key = email.replace('@', '^');
  if(key.indexOf('.') !== -1){
    return key.split('.').join('*');
  }
  return key;
};

var addNewUserToFB = function(newUser){
  var key = formatEmailForFirebase(newUser.email);
  ref.child('user').child(key).set(newUser);
};

module.exports = firebaseUtils;