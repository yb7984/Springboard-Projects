const INITIAL_STATE = { meme: {} };

const rootReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case "APPEND":
            return {
                ...state,
                meme: {
                    ...state.meme,
                    [action.meme.id]: { ...action.meme }
                }
            };
        case "REMOVE":
            const { [action.memeId]: remove, ...newMeme } = state.meme;
            return {
                ...state,
                meme: newMeme
            };
        default:
            break;
    }

    return state;
};

export default rootReducer;