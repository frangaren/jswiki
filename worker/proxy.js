'use strict';

class WorkerArbiter {
    constructor(worker) {
        this.busy = false;
        this.tasks = [];
        this.worker = worker;
    }

    _runNext() {
        const next = this.tasks.pop();
        if (next) {
            this._run(next);
        } else {
            this.busy = false;
        }
    }

    _run(task) {
        this.busy = true;
        this.worker.send(task.message);
        this.worker.once('message', (message) => {
            if (message.success) {
                task.resolve(message.reply);
            } else {
                task.reject(new Error(message.error));
            }
            this._runNext();
        });
    }

    schedule(message) {
        const promise = new Promise((resolve, reject) => {
            const task = {
                message: message,
                resolve: resolve,
                reject: reject
            };
            if (this.busy == false) {
                this._run(task);
            } else {
                this.tasks.push(task);
            }
        });
        return promise;
    }
}

function WorkerProxy(worker) {
    let target = function() {};
    target.worker = new WorkerArbiter(worker);
    target.path = [];
    const handler = {
        apply: function (target, that, args) {
            const outcome = target.worker.schedule({
                path: target.path,
                args: args
            });
            return outcome;
        },
        get: function (target, property, receiver) {
            const newTarget = function(){};
            newTarget.worker = target.worker;
            newTarget.path = target.path.slice();
            newTarget.path.push(property);
            return new Proxy(newTarget, handler);
        }
    };
    return new Proxy(target, handler);
}

module.exports = WorkerProxy;