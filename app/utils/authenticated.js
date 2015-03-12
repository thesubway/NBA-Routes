var Login = require("../components/login-register/Login");
var firebaseUtils = require('./firebaseUtils');

var Authenticated = {
	statics: {
		willTransitionTo: function(transition){
			//where we store where the user was trying to go.
			if (!firebaseUtils.isLoggedIn()) {
				Login.attemptedTransition = transition;
				transition.redirect('login');
			}
		}
	}
};

module.exports = Authenticated;