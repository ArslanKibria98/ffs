"use client"
export const SET_LANGUAGE = 'SET_LANGUAGE';

export function setLanguage(language) {
  return (dispatch) => {
    dispatch({
      type: SET_LANGUAGE,
      language,
    });
  };
}

const langAction = {
  setLanguage
}

export default langAction
