var YopTimer = class {
    constructor({ delay, count }) {
        this.delay = delay;
        this.count = count;
    }

    start(listener) {
        this.listener = listener;
        this.id = this.ticEachDelay();
        // this.ticAfterDelay();
    }

    // ticAfterDelay() {
    //     setTimeout(() => this.tic(), this.delay);
    // }
    ticEachDelay() {
        return setInterval(() => this.tic(), this.delay);
    }

    tic() {
        this.count -= 1;
        this.listener(this.count);
        if (this.count === 0) {
            clearInterval(this.id);
        }
        // if (this.count !== 0) {
        //     this.ticAfterDelay();
        // }
    }
};
