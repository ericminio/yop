const delay = 45;
const tries = 30;

export const eventually = async (verify) => {
    return new Promise((resolve, reject) => {
        let credit = tries;
        const tryNow = () => {
            try {
                verify();
                resolve();
            } catch (error) {
                credit--;
                if (credit === 0) {
                    reject(error);
                } else {
                    setTimeout(tryNow, delay);
                }
            }
        };
        tryNow();
    });
};
