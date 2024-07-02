export const SET_FORM_INFO = (form) => {
  return (dispatch) => {
    dispatch({
    type: 'SET_FORM_INFO',
    payload: {
      form_id: form.form_id,
      form_version: form.form_version,
    },
  });
}
};

export const SET_FORM_ID = (form_id) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_FORM_ID',
      payload: {
        form_id: form_id,
      },
    });
  }
};

export const SET_FORM_VERSION = (form) => {
  return (dispatch) => {
    dispatch({
    type: 'SET_FORM_VERSION',
    payload: {
      form_version: form.form_version,
    },
  });
}
};

export const SET_FORM_CONTROLS = (form) => {
  return (dispatch) => {
    dispatch({
    type: 'SET_FORM_CONTROLS',
    payload: {
      form_controls: form.form_controls,
    },
  });
}
};

const formAction = {
  SET_FORM_INFO,
  SET_FORM_ID,
  SET_FORM_VERSION,
  SET_FORM_CONTROLS
};

export default formAction;
