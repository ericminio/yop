var setChallenge = ({ question, choices }) => {
    state.choices = choices;
    eventBus.notify('question set', { question, choices });
};

const play = (answer) => {
    const { isCorrect } = state.choices.find(({ choice }) => choice === answer);
    isCorrect ? increaseScore() : gameOver();
};

const increaseScore = () => {
    state.score++;
    eventBus.notify('score increased', state.score);
};

const gameOver = () => {
    eventBus.notify('game over');
};
