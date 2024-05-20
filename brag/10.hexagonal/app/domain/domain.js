var state = {
    score: 0,
    gameLost: false,
};

var nextChallenge = async () => {
    const challenge = await state.ports.nextChallenge();
    setChallenge(challenge);
};

var setChallenge = (challenge) => {
    state.challenge = challenge;
    eventBus.notify('question set', state.challenge);
};

var play = async (answer) => {
    if (state.gameLost) return;
    if (state.challenge.answered) return;
    state.challenge.answered = true;
    const { isCorrect, correctAnswer } = await state.ports.validateAnswer({
        answer,
    });
    isCorrect ? pass() : gameLost(answer);
    eventBus.notify('correct answer', correctAnswer);
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

const gameLost = (answer) => {
    state.gameLost = true;
    eventBus.notify('game over', answer);
};
