var state = {
    score: 0,
};

var nextChallenge = async () => {
    const challenge = await state.ports.nextChallenge();
    setChallenge(challenge);
};

var setChallenge = (challenge) => {
    state.challenge = challenge;
    eventBus.notify('challenge set');
};

var play = async (answer) => {
    if (state.challenge.chosenAnswer) return;
    state.challenge.chosenAnswer = answer;
    const { isCorrect, correctAnswer } = await state.ports.validateAnswer({
        answer,
        question: state.challenge.question,
    });
    state.challenge.correctAnswer = correctAnswer;
    isCorrect ? passed() : failed();
};

const passed = () => {
    state.score++;
    eventBus.notify('challenge passed');
    if (state.challenge.isLast) {
        eventBus.notify('you win!');
    }
};

const failed = () => {
    eventBus.notify('challenge failed');
};
