document.YopTimer = class {
    constructor({ cycle, count }) {
        this.cycle = cycle;
        this.count = count;
    }

    start(listener) {
        this.listener = listener;
        this.id = this.ticEachCycle();
        // this.ticAfterCycle();
    }

    ticAfterCycle() {
        setTimeout(() => this.tic(), this.cycle);
    }
    ticEachCycle() {
        return setInterval(() => this.tic(), this.cycle);
    }

    tic() {
        this.count -= 1;
        this.listener(this.count);
        if (this.count === 0) {
            clearInterval(this.id);
        }
        // if (this.count !== 0) {
        //     this.ticAfterCycle();
        // }
    }
};