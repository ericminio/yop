var increaseScore = () => {
    state.score++;
    eventBus.notify('score increased', state.score);
};

var setChoices = (choices) => {
    state.choices = choices;
    eventBus.notify('choices set', choices);
};

var gameOver = () => {
    state.gameOver = true;
    eventBus.notify('game over');
};
