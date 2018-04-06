import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import constants from './constants';
import '../css/Content.css';


export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            title: "",
            date: "",
            description:"",
            school: "",
            device: "",
            refPath: null,
            devRef: "",
            locRef: "",
        }
    }

    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
              this.setState({ user: firebaseUser, loading: false });
            }
            else {
              this.setState({ user: null, loading: false });
            }
          });
    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    logOff() {
        firebase.auth().signOut()
            .then(this.props.history.push(constants.routes.welcome))
            .catch(err => window.alert(err));
    }

    submitFile(evt) {
        var user = firebase.auth().currentUser;
        evt.preventDefault();
        let time = firebase.database.ServerValue.TIMESTAMP;
        let date = new Date(+time);
        let message = {
            body: this.state.body,
            author: {
                name: user.displayName,
                photo: user.photoURL,
                id: user.uid
            },
            createdAt: date,
        };
        this.props.messageList.push(message);
        this.setState({body: ""});
    }

    handleRefChange() {
        console.log(this.props.handleDevRef);
        this.setState({devRef:this.props.handleDevRef})
    }

    handleSubRef() {
        //
    }

    handleLocRef() {
        //
    }


    render() {
        
        return (
            <div>
                <div className='container'>
                    <form className="">
                    <div className='form-group'>
                        <label htmlFor='FileTitle'>Title:</label>
                        <input id='FileTitle' type='text'
                        className='form-control' 
                        placeholder='Enter Document Title'
                        value={this.state.title}
                        onInput={evt => this.setState({title: evt.target.value})}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='Date'>Date:</label>
                        <input id="Date" type='date'
                        className='form-control' 
                        placeholder='File Description'
                        value={this.state.date}
                        onInput={evt => this.setState({date: evt.target.value})}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='Description'>Description:</label>
                        <input id="Description" type='text'
                        className='form-control' 
                        placeholder='File Description'
                        value={this.state.description}
                        onInput={evt => this.setState({description: evt.target.value})}/>
                    </div>
                    <div className="dropGroup">
                        <div>
                            <div className="dropdown">
                                <button id="device" className="btn btn-danger dropdown-toggle my-3 mx-auto" type="button" data-toggle="dropdown">
                                Choose A Device<span className="caret"></span></button>
                                <CategoryList refPath={null} handleDevRef={this.handleRefChange}/>
                            </div>
                            <div className="dropdown">
                                <button id="subject" className="btn btn-danger dropdown-toggle my-3 mx-auto" type="button" data-toggle="dropdown">
                                Choose A Subject<span className="caret"></span></button>
                                <CategoryList refPath={this.devRef} handleSubRef={this.handleSubRef}/>
                            </div>
                            <div className="dropdown">
                                <button id="device" className="btn btn-danger dropdown-toggle my-3 mx-auto" type="button" data-toggle="dropdown">
                                Choose A Location<span className="caret"></span></button>
                                <CategoryList refPath={this.locRef} handleLocRef={this.handleLocRef}/>
                            </div>
                        </div>
                        <div className='dropdown form-group'>
                            <input className="mr-auto" type="file"/>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID:undefined,
            categories: [],
            selections: [],
        }
    }

    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
              this.setState({ user: firebaseUser, loading: false });
              this.loadData(this.props.refPath);
            }
            else {
              this.setState({ user: null, loading: false });
            }
          });
    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    loadData() {
        let ref;
        if(this.props.refPath) {
            ref = firebase.database().ref(this.props.refPath);
        } else {
            ref = firebase.database().ref();
        }
        ref.on('value', (snapshot) => {
            let catValue = snapshot.val();
            let catArray = Object.keys(catValue).map((key) => {
                console.log(key);
                return {name: key};
            })
            console.log(catArray);
            this.setState({categories: catArray})
        });
    }

    handleClick(name) {
        //something
    }

    render() {
        if(this.state.categories) {        
            this.state.categories.forEach(category => {
                this.state.selections.push(<li><a href="#" onClick={this.handleClick(category.name)}>{category.name}</a></li>);
            });
        } else {
            return (
                <div>
                    loading...
                </div>
            )
        }

        return (
            <ul className="dropdown-menu">
                {this.state.selections}
            </ul>
        )
    }
}