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
            query: null,
            devRef: "Choose A Device",
            subRef: "Choose A Subject",
            locRef: "Choose A Location",
        },
        this.handleRefChange = this.handleRefChange.bind(this),
        this.handleSubChange = this.handleSubChange.bind(this),
        this.handleLocChange = this.handleLocChange.bind(this)
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
        this.setState({body: ""});
    }

    handleRefChange(device) {
        let devQ = device + "/Folders/";
        this.setState({query: devQ, devRef: device});
    }

    handleSubChange(subject) {
        let subjectQ = this.state.query + "/" + subject;
        this.setState({query: subjectQ, subRef: subject});
        
    }

    handleLocChange(location) {
        let locationQ = this.state.query + "/" + location;
        this.setState({query: locationQ, locRef: location});
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
                                {this.state.devRef}<span className="caret"></span></button>
                                <CategoryList refPath={null} handleChange={(e) => this.handleRefChange(e)}/>
                            </div>
                            <div className="dropdown">
                                <button id="subject" className="btn btn-danger dropdown-toggle my-3 mx-auto" type="button" data-toggle="dropdown">
                                {this.state.subRef}<span className="caret"></span></button>
                                <CategoryList refPath={this.state.query} handleChange={(e) => this.handleSubChange(e)}/>
                            </div>
                            <div className="dropdown">
                                <button id="device" className="btn btn-danger dropdown-toggle my-3 mx-auto" type="button" data-toggle="dropdown">
                                {this.state.locRef}<span className="caret"></span></button>
                                <CategoryList refPath={this.state.query} handleChange={(e) => this.handleLocChange(e)}/>
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
            refPathQ: this.props.refPath
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
              this.setState({ user: firebaseUser, loading: false });
              this.loadData(this.props.refPath);
              console.log("loading data");

            }
            else {
              this.setState({ user: null, loading: false });
            }
          });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({refPathQ: nextProps.refPath});
        this.loadData();
    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    loadData() {
        let ref;
        if(this.state.refPathQ) {
            ref = firebase.database().ref(this.props.refPath); //categories
        } else {
            ref = firebase.database().ref();
        }
        ref.on('value', (snapshot) => {
            let catValue = snapshot.val();
            let catArray = Object.keys(catValue).map((key) => {
                return {name: key};
            })
            this.setState({categories: catArray});
        });
    }

    handleClick(name) {
        this.props.handleChange(name);
    }

    render() {
        if(this.state.categories) {
            this.state.selections = [];
            this.state.categories.forEach(category => {
                this.state.selections.push(<li><a href="#" onClick={() => this.handleClick(category.name)}>{category.name}</a></li>);
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