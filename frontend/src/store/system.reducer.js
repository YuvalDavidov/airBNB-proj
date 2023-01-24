export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_IS_MOBILE = 'SET_IS_MOBILE'


const initialState = {
  isLoading: false,
  isMobile: false
};

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_IS_MOBILE:
      return { ...state, isMobile: true }
    default: return state
  }
}
