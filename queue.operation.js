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
            return this.queue;
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

const run = () => {
    let q = new Queue();

    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);

    console.log(q.dequeue());
    console.log(q.dequeue());
    
    console.log("init state: ", q.getState());
    let q2 = new Queue().setState(q.queue, q.tail, q.head);
    console.log(q2);
    console.log(q2.dequeue());
    console.log(q.dequeue());

    console.log(q);
    console.log(q2);
}

// run();

module.exports = Queue;