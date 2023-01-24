import { store } from "./store";
import { SET_IS_DESKTOP, SET_IS_MOBILE } from "./system.reducer";



export function setIsMobile() {
    store.dispatch({ type: SET_IS_MOBILE })
}

export function setIsDesktop() {
    store.dispatch({ type: SET_IS_DESKTOP })
}