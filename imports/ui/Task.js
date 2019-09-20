import React, { Component } from 'react';

import { Tasks } from '../api/tasks.js';
 
// Task component - represents a single todo item
export default class Task extends Component {
  handleDeleteClick = () => {
    Tasks.remove(this.props.task._id);
  }

  render() {
    const taskClassName = this.props.task.checked ? 'Checked' : '';

    return (
      <li className={taskClassName}>
        <button 
          className='delete'
          onClick={this.handleDeleteClick}
        >
          &times;
        </button>
        <span className='text'>{this.props.task.text}</span>
      </li>
    );
  }
}