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

export class TwoChallengesChallenger {
    constructor(challenges) {
        this.index = 0;
        this.challenges = challenges;
    }
    async nextChallenge() {
        const next = this.challenges[this.index];
        if (this.index < this.challenges.length - 1) {
            this.index += 1;
        }
        return next;
    }
}
