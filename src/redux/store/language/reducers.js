import { SET_LANGUAGE } from "./actions";

const initialState = {
    language: 'en',
  };
  
  export default function languageReducer(state = initialState, action) {
    switch (action.type) {
      case SET_LANGUAGE:
        return {...state, language: action.language };
      default:
        return state;
    }
}