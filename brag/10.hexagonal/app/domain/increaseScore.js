const increaseScore = () => {
    state.score++;
    eventBus.notify('score increased', state.score);
};
