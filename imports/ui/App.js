import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from "react-dom";
 
import Task from './Task.js';
import { Tasks } from '../api/tasks.js';

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
    const now = new Date();

    Tasks.insert({
      text,
      createdAt: now,
    });

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
          <h1>Todo List</h1>

          <label className='hide-completed'>
          
          <input
            type='checkbox'
            readOnly
            checked={!!this.state.hideCompleted}
            onClick={this.toggleHideCompleted}
          />
            Hide completed tasks
          </label>

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
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find(
        {},
        { 
          sort: {createdAt: -1}
        }
      ).fetch(),
  };
})(App);