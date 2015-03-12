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
	},
	loginWithPW: function(userObj, cb, cbOnRegister) {
	    ref.authWithPassword(userObj, function(err, authData) {
	        if (err) {
	            console.log('Error on login:', err.message);
	            
	            cbOnRegister && cbOnRegister(false);
	        } else {
	        	//go ahead and make it so that user gets logged in:
	            authData.email = userObj.email;
	            cachedUser = authData;
	            cb(authData);
	            this.onChange(true);
	            cbOnRegister && cbOnRegister(true);
	        }
	    }.bind(this));
	},
	isLoggedIn: function() {
		//if both null, return false. if either not null, then true.
		if (cachedUser !== null) || (ref.getAuth() !== null) {
			return true;
		}
		else {
			return false;
		}
	},
	logout: function() {
		//logs user out, resets cachedUser to null,
		// and invokes this.onChange(false)
		ref.unauth();
		cachedUser = null;
		this.onChange(false);
	},
	toArray: function(inObj) {
		//takes in object, returns array with indices in that array
		//being the values that were in the object.
		var array = $.map(myObj, function(value, index) {
		    return [value];
		});
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