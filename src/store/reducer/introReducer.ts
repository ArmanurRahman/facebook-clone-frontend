import * as ActionType from "../action";

const initialState: any = {
    intros: null,
};
const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionType.INTRO_LOAD:
            return { ...state, intros: action.payload };
        case ActionType.INTRO_UPDATE:
            return {
                ...state,
                intros: { ...state.intros, [action.id]: action.text },
            };
        case ActionType.INTRO_CLEAN:
            return null;
        default:
            return state;
    }
};

export default profileReducer;
