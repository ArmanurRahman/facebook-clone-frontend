import { combineReducers } from "redux";
import userReducer from "./userReducer";
import introReducer from "./introReducer";

const rootReducer = combineReducers({
    user: userReducer,
    intros: introReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
