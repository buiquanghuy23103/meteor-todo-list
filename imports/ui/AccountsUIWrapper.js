import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {

    componentDidMount() {
        this.renderLoginButtons();
    }

    componentWillUnmount() {
        this.cleanBlazeView();
    }

    renderLoginButtons = () => {
        this.view = Blaze.render(
            Template.loginButtons,
            ReactDOM.findDOMNode(this.refs.container)
        );
    }

    cleanBlazeView = () => {
        Blaze.remove(this.view);
    }

    render() {
        return (
            <span ref='container' />
        );
    }
}