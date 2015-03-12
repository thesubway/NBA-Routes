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