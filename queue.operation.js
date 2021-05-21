class Queue {
    constructor() {
        this.queue = [];
        this.head = -1;
        this.tail = 0;
        console.log("QUEUE constructed!");
    }

    enqueue(obj) {
        this.head += 1;
        this.queue[this.head] = obj;
        console.log("ENQUEUED!");
        return true;
    }

    dequeue() {
        console.log("DEQUEUE");
        if (this.tail <= this.head) {
            let returnObj = this.queue[this.tail];
            this.tail += 1;
            if (this.tail > this.head) this.setState([], 0, -1);
            return returnObj;
        }
        return false;
    }

    getState() {
        console.log("STATE RETURNED!");
        if (this.tail <= this.head) {
            return this.queue;
        }
        return null;
    }

    setState(q, t, h) {
        console.log("QUEUE INIT!");
        this.head = h;
        this.queue = q == null ? [] : q;
        this.tail = t;
        return this;
    }
}

module.exports = Queue;