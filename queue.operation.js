class Queue {
    constructor() {
        this.queue = [];
        this.head = -1;
        this.tail = 0;
    }

    enqueue(obj) {
        this.head += 1;
        this.queue[this.head] = obj;
        return true;
    }

    dequeue() {
        if (this.tail <= this.head) {
            let returnObj = this.queue[this.tail];
            this.tail += 1;
            if (this.tail > this.head) this.setState([], 0, -1);
            return returnObj;
        }
        return false;
    }

    getState() {
        if (this.tail <= this.head) {
            let returnObj = [];
            for (let i = this.tail; i <= this.head; i++) 
                returnObj.push(this.queue[i])
            return returnObj;
        }
        return null;
    }

    setState(q, t, h) {
        this.head = h;
        this.queue = q == null ? [] : q;
        this.tail = t;
        return this;
    }
}

module.exports = Queue;