import React from 'react';
// import Content from './Content'

export default class Category extends React.Component {

    render() {
        let catName = this.props.name;
        return (
            <li>
                <a href="#">
                    {catName}
                </a>
            </li>
        );
    }
}

