export class SingleChallengeChallenger {
    async nextChallenge() {
        return {
            question: 'What now?',
            choices: [
                { choice: 'wrong', isCorrect: false },
                { choice: 'correct', isCorrect: true },
            ],
            isLast: true,
        };
    }
}

export class ChallengerStub {
    constructor(challenges) {
        this.index = 0;
        this.challenges = challenges;
    }
    async nextChallenge() {
        const next = this.challenges[this.index];
        if (this.index < this.challenges.length - 1) {
            this.index += 1;
            next.isLast = false;
        } else {
            next.isLast = true;
        }
        return next;
    }
}
