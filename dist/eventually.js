const delay = 45;
const tries = 30;

export const eventually = async (...params) => {
    let [page, verify] = params;
    if (verify === undefined) {
        verify = page;
        page = undefined;
    }
    return new Promise(async (resolve, reject) => {
        let credit = tries;
        const tryNow = async () => {
            try {
                await verify();
                resolve();
            } catch (error) {
                credit--;
                if (credit === 0) {
                    if (!!page) {
                        console.log(page.document.body.innerHTML);
                    }
                    reject(error);
                } else {
                    setTimeout(tryNow, delay);
                }
            }
        };
        await tryNow();
    });
};
