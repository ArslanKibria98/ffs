export const SET_FORM_INFO = (form_id, version_id) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_FORM_INFO',
      payload: {
        form_id: form_id,
        version_id: version_id,
      }
    })
  }
}

export const SET_FORM_ID = (form_id) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_FORM_ID',
      payload: {
        form_id: form_id
      }
    })
  }
}

export const SET_VERSION_ID = (version_id) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_VERSION_ID',
      payload: {
        version_id: version_id
      }
    })
  }
}

export const SET_FORM_CONTROLS = (form) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_FORM_CONTROLS',
      payload: {
        form_controls: form.form_controls
      }
    })
  }
}

const formAction = {
  SET_FORM_INFO,
  SET_FORM_ID,
  SET_VERSION_ID,
  SET_FORM_CONTROLS
}

export default formAction
