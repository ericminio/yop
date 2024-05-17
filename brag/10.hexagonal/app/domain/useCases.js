var setChoices = (choices) => {
    state.choices = choices;
    eventBus.notify('choices set', choices);
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
