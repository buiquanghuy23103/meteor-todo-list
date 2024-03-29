import { Mongo } from "meteor/mongo";
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
    Meteor.publish(
        'tasks',
        function tasksPublication() {
            return Tasks.find();
        }
    );
}

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },

    'tasks.remove'(taskId) {
        check(taskId, String);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.remove(taskId);
    },

    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(
            taskId,
            {
                $set: { checked: setChecked }
            }
        );
    },

    'tasks.togglePrivate'(taskId, setPrivate) {
        check(taskId, String);
        check(setPrivate, Boolean);
        
        const task = Tasks.findOne(taskId);
        const userId = this.userId || '';
        if (task.owner !== userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(
            taskId,
            {
                $set: { private: setPrivate }
            }
        );
    }
});