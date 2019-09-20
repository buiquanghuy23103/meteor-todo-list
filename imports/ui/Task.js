import React, { Component } from 'react';

import { Tasks } from '../api/tasks.js';
 
// Task component - represents a single todo item
export default class Task extends Component {
  handleDeleteClick = () => {
    Tasks.remove(this.props.task._id);
  }

  handleCheckboxClick = () => {
    Tasks.update(
      this.props.task._id,
      {
        $set: { checked: !this.props.task.checked },
      }
    );
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

        <input
          type='checkbox'
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.handleCheckboxClick}
        />

        <span className='text'>{this.props.task.text}</span>
      </li>
    );
  }
}