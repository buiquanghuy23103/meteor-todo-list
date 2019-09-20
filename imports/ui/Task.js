import React, { Component } from 'react';

import { Tasks } from '../api/tasks.js';
import { Meteor } from 'meteor/meteor';
 
// Task component - represents a single todo item
export default class Task extends Component {
  handleDeleteClick = () => {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  handleCheckboxClick = () => {
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
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

        <span className='text'>
          <strong>{this.props.task.username}</strong>:  {this.props.task.text}
        </span>
      </li>
    );
  }
}