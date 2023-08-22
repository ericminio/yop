document.YopTimer = class {
    constructor({ cycle, count }) {
        this.cycle = cycle;
        this.count = count;
    }

    start() {
        this.id = setInterval(() => {
            this.tic();
        }, this.cycle);
    }

    tic() {
        this.count -= 1;
        document.querySelector('#remaining').innerHTML = `${this.count}s`;
        if (this.count === 0) {
            clearInterval(this.id);
        }
    }
};
