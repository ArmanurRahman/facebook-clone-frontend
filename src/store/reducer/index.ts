import { combineReducers } from "redux";
import userReducer from "./userReducer";
import { profileReducer } from "../../function/reducer";

const rootReducer = combineReducers({
    user: userReducer,
    // profile: profileReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
