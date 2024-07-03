export const SET_TOASTIFY_MESSAGE = (payload) => {
  return {
    type: 'TOASTIFY_MESSAGE',
    payload: payload,
  };
};

const toastifyAction = {
  SET_TOASTIFY_MESSAGE,
};

export default toastifyAction;
