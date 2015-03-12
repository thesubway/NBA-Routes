var React = require('react');
var Router = require('react-router');
var firebaseUtils = require('../../utils/firebaseUtils');

var Login = React.createClass({
  mixins: [Router.Navigation],
  statics: {
    attemptedTransition: null;
  },
  render: function(){
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> Email </label>
            <input className="form-control" ref="email" placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref="pw" type="password" className="form-control" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  },
  handleSubmit: function(e){
      //prevent default action of clicking this button.
      e.preventDefault();
      var email = this.refs.email.getDOMNode().value;
      var pw    = this.refs.pw.getDOMNode().value;
      firebaseUtils.loginWithPW({email: email, password: pw}, function(){
        //check if attemptedTransition is truthy.
        if Login.attemptedTransition{
          //if truthy, then set as transition.
          var transition = Login.attemptedTransition;
          Login.attemptedTransition = null;
          transition.retry();
        }
        else{
          //not truthy. take user to the home state
          this.replaceWith('home');
        }
      }.bind(this));
  }
});

module.exports = Login;