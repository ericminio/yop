var state = {
    score: 0,
};

var nextChallenge = async () => {
    const challenge = await state.ports.challenge();
    setChallenge(challenge);
};

var setChallenge = ({ question, choices }) => {
    state.challenge = { question, choices };
    eventBus.notify('question set', state.challenge);
};

const play = (answer) => {
    if (state.gameOver) return;
    if (state.challenge.answered) return;
    state.challenge.answered = true;
    const { isCorrect } = state.challenge.choices.find(
        ({ choice }) => choice === answer
    );
    isCorrect ? increaseScore() : gameOver(answer);
    const { choice: correctAnser } = state.challenge.choices.find(
        ({ isCorrect }) => isCorrect
    );
    eventBus.notify('correct answer', correctAnser);
};

const increaseScore = () => {
    state.score++;
    eventBus.notify('score increased', state.score);
};

const gameOver = (answer) => {
    state.gameOver = true;
    eventBus.notify('game over', answer);
};
