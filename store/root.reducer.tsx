import { combineReducers } from "redux";
import { formReducers } from "./form.reducer";

const rootReducer = combineReducers({
  form : formReducers
});

export default rootReducer;