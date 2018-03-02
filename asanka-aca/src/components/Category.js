import React from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

export default class Category extends React.Component {

    render() {
        let catName = this.props.name;
        console.log(catName);
        return (
            <li>
               {catName}
            </li>
        );
    }
}

