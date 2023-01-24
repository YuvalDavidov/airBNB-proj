import { store } from "./store";
import { SET_IS_MOBILE } from "./system.reducer";



export function setIsMobile() {
    store.dispatch({ type: SET_IS_MOBILE })
}