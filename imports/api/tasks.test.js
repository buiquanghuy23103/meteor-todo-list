import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Tasks } from './tasks';
import { assert } from 'chai';

if (Meteor.isServer) {
    describe('Tasks', () => {
        describe('methods', () => {
            const userId = Random.id();
            let taskId;

            beforeEach(() => {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'test task',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'huybui',
                });
            });

            it('can delete owned task', () => {
                // Find the method to test
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];

                // Define a fake parameter for the method
                const invocation = { userId };

                // Run the method
                deleteTask.apply(invocation, [taskId]);

                // Test the result
                assert.equal(Tasks.find().count(), 0);
            });
        });
    });
}