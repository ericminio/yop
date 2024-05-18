export class SingleChallengeChallenger {
    async challenge() {
        return Promise.resolve({
            question: 'What now?',
            choices: [
                { choice: 'wrong', isCorrect: false },
                { choice: 'correct', isCorrect: true },
            ],
        });
    }
}
