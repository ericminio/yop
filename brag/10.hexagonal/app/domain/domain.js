const state = {
    score: 0,
};

var setChallenge = ({ question, choices }) => {
    state.choices = choices;
    eventBus.notify('question set', { question, choices });
};

const play = (answer) => {
    if (state.gameOver) return;
    const { isCorrect } = state.choices.find(({ choice }) => choice === answer);
    isCorrect ? increaseScore() : gameOver();
};

const increaseScore = () => {
    state.score++;
    eventBus.notify('score increased', state.score);
};

const gameOver = () => {
    state.gameOver = true;
    eventBus.notify('game over');
};
