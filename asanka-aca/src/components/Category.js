import React from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

export default class Category extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         userID:undefined,
    //     }
    // }

    render() {
        let catName = this.props.level;
        console.log(catName);
        return (
            <li>
                <div className="container">
                    <h1>{catName}</h1>
                </div>
            </li>
        );
    }
}

