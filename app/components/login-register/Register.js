var React = require('react');
var firebaseUtils = require('../../utils/firebaseUtils');
var Router = require('react-router');

var Register = React.createClass({
  mixins: [ Router.Navigation ],
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
    )
  },
  handleSubmit: function(e) {
    //prevents some default action.
    e.preventDefault();
    //grabs the email and password from the refs in the render method:
    var email = this.refs.email.getDomNode().value;
    var pw = this.refs.pw.getDomNode().value;
    //method's parameters are object, and callback:
    firebaseUtils.createUser({email: email, password: pw}, function(result){
      if(result) {
        //result is truthy, so take to home route.
        thisreplaceWith('home');
      }
    }.bind(this));
  }
});

module.exports = Register;

