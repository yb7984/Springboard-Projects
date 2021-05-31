const INITIAL_STATE = { mood: "ʘ‿ʘ", color: "yellow" };

const moodReducer = (state = INITIAL_STATE, action) => {

    const moods = {
        happy: "ʘ‿ʘ",
        angry: "ಠ╭╮ಠ",
        bored: "(ノД`)",
        celebrating: "ヽ(〃∀〃)ﾉ",
        love: "♱♡‿♡♰"
    };


    const colors = {
        happy: "yellow",
        angry: "red",
        bored: "grey",
        celebrating: "green",
        love: "pink"
    }

    switch (action.type) {
        case "CHANGE":
            if (moods[action.payload]) {
                return { ...state, mood: moods[action.payload], color: colors[action.payload] };
            }
            break;
        case "RANDOM":
            const length = Object.keys(moods).length;
            const randomIndex = Math.floor(Math.random() * length);
            return {
                ...state,
                mood: Object.values(moods)[randomIndex],
                color: Object.values(colors)[randomIndex]
            };
        case "RESET":
            return { ...INITIAL_STATE };
    }

    return state;
}
const store = Redux.createStore(moodReducer);