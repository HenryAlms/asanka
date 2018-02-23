import React from "react";
import firebase from "firebase/app";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        }
    }

    signIn(evt) {
        evt.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.history.push(constants.route.messages))
            .catch(err => window.alert(err));
    }

      render() {
          return (
            <form className="container justify-content-between" onSubmit={evt => this.signIn(evt)}> 
                <div className="form">
                    <div className="form-group">
                        <label>
                            Email: 
                        </label>
                        <input className="form-control" type="text" placeholder="Enter Email" value={this.state.email} onChange={evt => this.setState({email: evt.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>
                            Password: 
                        </label>
                        <input className="form-control" type="password" placeholder="Password" value={this.state.password} onChange={evt => this.setState({password: evt.target.value})}/>
                    </div>
                </div>
                <div className="container-fluid row justify-content-center">
                    <div className="col-3">
                        <input className="btn btn-primary" type="submit" value="Sign In"/>
                    </div>
                    <div className="col-3">
                        <input className="btn btn-primary" type="submit" value="Sign Up" onClick={() => this.props.history.push("/SignUp")}/>
                    </div>
                </div>
            </form>
          )
      }
}