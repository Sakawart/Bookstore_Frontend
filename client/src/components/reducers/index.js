// ที่รวม store
import { combineReducers } from "redux";
import { userReducer } from "./userReducers";
import { searchReduer } from "./searchReduer";
import { cartReducer } from "./cartReducer";

const rootReducer = combineReducers({
    user: userReducer,
    search: searchReduer,
    cart: cartReducer
})

export default rootReducer;