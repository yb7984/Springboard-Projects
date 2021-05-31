const container = document.getElementById("mood");

const handleChange = () => {
    const state = store.getState();
    container.innerText = state.mood;
    container.style.backgroundColor = state.color;
}

const changeMood = (strMood) => {
    if (strMood !== "random") {
        store.dispatch({ type: "CHANGE", payload: strMood });
    }
    else {
        store.dispatch({ type: "RANDOM" });
    }
};

document.getElementById("btn-happy").addEventListener("click", () => {
    changeMood("happy");
});


document.getElementById("btn-angry").addEventListener("click", () => {
    changeMood("angry");
});


document.getElementById("btn-bored").addEventListener("click", () => {
    changeMood("bored");
});


document.getElementById("btn-celebrating").addEventListener("click", () => {
    changeMood("celebrating");
});


document.getElementById("btn-love").addEventListener("click", () => {
    changeMood("love");
});


document.getElementById("btn-random").addEventListener("click", () => {
    changeMood("random");
});

const unsubscribe = store.subscribe(handleChange);

container.innerText = store.getState().mood;