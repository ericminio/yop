var state = {
    score: 0,
};

var nextChallenge = async () => {
    const challenge = await state.ports.nextChallenge();
    setChallenge(challenge);
};

var setChallenge = (challenge) => {
    state.challenge = challenge;
    eventBus.notify('question set', state.challenge);
};

var play = (answer) => {
    if (state.gameOver) return;
    if (state.challenge.answered) return;
    state.challenge.answered = true;
    const { isCorrect } = state.challenge.choices.find(
        ({ choice }) => choice === answer
    );
    isCorrect ? pass() : gameOver(answer);
    const { choice: correctAnser } = state.challenge.choices.find(
        ({ isCorrect }) => isCorrect
    );
    eventBus.notify('correct answer', correctAnser);
};

const pass = () => {
    increaseScore();
    if (state.challenge.isLast) {
        eventBus.notify('you win!');
    }
};

const increaseScore = () => {
    state.score++;
    eventBus.notify('score increased', state.score);
};

const gameOver = (answer) => {
    state.gameOver = true;
    eventBus.notify('game over', answer);
};
