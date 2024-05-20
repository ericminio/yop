export class ChallengerFake {
    constructor(challenges) {
        this.index = 0;
        this.challenges = challenges.map(
            ({ question, choices, correctAnswer }) => ({
                question,
                choices: choices.map(({ choice }) => ({ choice })),
                correctAnswer,
                isLast: false,
            })
        );
        this.challenges[this.challenges.length - 1].isLast = true;
    }
    async nextChallenge() {
        const next = this.challenges[this.index];
        if (this.index < this.challenges.length - 1) {
            this.index += 1;
        }
        return next;
    }
    async validateAnswer({ answer, question }) {
        const challenge = this.challenges.find(
            (challenge) => challenge.question === question
        );
        return {
            isCorrect: answer === challenge.correctAnswer,
            correctAnswer: challenge.correctAnswer,
        };
    }
}
