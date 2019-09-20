import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from "react-dom";
import { Meteor } from 'meteor/meteor';

import Task from './Task.js';
import { Tasks } from '../api/tasks.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {

  state = {
    hideCompleted: false,
  }

  toggleHideCompleted = () => {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const textInput = ReactDOM.findDOMNode(this.refs.textInput);

    const text = textInput.value.trim();
    Meteor.call('tasks.insert', text);

    textInput.value = '';
  }

  renderTasks() {
    let tasks = this.props.tasks;
    if (this.state.hideCompleted) {
      tasks = tasks.filter(task => !task.checked);
    }
    return tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className='hide-completed'>

            <input
              type='checkbox'
              readOnly
              checked={!!this.state.hideCompleted}
              onClick={this.toggleHideCompleted}
            />
            Hide completed tasks
          </label>

          <AccountsUIWrapper />

          {!!this.props.currentUser &&
            <form
              className='new-task'
              onSubmit={this.handleSubmit}
            >
              <input
                type='text'
                ref='textInput'
                placeholder='Type to add new tasks'
              />
            </form>
          }
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {

  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find(
      {},
      {
        sort: { createdAt: -1 }
      }
    ).fetch(),

    incompleteCount: Tasks.find({
      checked: { $ne: true }
    }).count(),

    currentUser: Meteor.user(),
  };
})(App);