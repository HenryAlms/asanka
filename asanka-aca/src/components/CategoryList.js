import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import Category from "./Category"

export default class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID:undefined,
            categories: undefined,
        }
    }

    componentDidMount() {
        this.unlisten = this.props.category.on("value", snapshot => this.setState({categories: snapshot}));
    }

    componentWillUnmount() {
        this.props.category.off("value", this.unlisten);
    }

    componentWillReceiveProps(nextProps) {
        this.props.category.off("value", this.unlisten);
        this.props.category.on("value", snapshot => this.setState({categories: snapshot}));
    }

    render() {
        let selections = [];
        if(this.state.categories) {
            console.log(this.state.categories)            
            this.state.categories.forEach(category => {
                console.log(category.val() + " category value");
                selections.push(<Category key={category.key} level={category.val()}/>)
            });
        } else {
            return (
                <div>
                    loading...
                </div>
            )
        }

        return (
            <div>
                <ul>
                    {selections}
                </ul>
            </div>
        )
    }
}