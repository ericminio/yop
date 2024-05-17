var increaseScore = () => {
    state.score++;
    eventBus.notify('score increased', state.score);
};

var setAnswer = (answer) => {
    state.answer = answer;
    eventBus.notify('answer set', answer);
};
