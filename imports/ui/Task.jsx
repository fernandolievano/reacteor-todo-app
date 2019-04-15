import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import classnames from 'classnames'

export default class Task extends Component {
  toggleChecked() {
    Meteor.call(
      'tasks.setChecked',
      this.props.task._id,
      !this.props.task.checked
    )
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id)
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private)
  }

  render() {
    const taskClassName = ({
      checked: this.props.task.checked,
      private: this.props.task.private
    })
    const currentUserId = this.props.currentUser && this.props.currentUser._id
    const canEditTask = this.props.task.owner === currentUserId

    return (
      <li className={ taskClassName }>
        { 
          this.props.canEditTask ?
            <button className="delete" onClick={this.deleteThisTask.bind(this)}>
              &times;
            </button>
          : ''
        }
        {
          this.props.canEditTask ?
            <input 
              type="checkbox" 
              readOnly 
              checked={!!this.props.task.checked} 
              onClick={this.toggleChecked.bind(this)}
            />
          : '' 
        }
        { 
          this.props.canEditTask ? 
            <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
              { this.props.task.private ? 'Private' : 'Public' }
            </button>
          : '' 
        }

        <span className="text">
          <strong>{this.props.task.username}</strong>: { this.props.task.text }
        </span>
      </li>
    )
  }
}
