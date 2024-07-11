const initialState = {
  type: 'info',
  message: 'Toast message.',
};

export const toastifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOASTIFY_MESSAGE':
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
      };
    default:
      return state;
  }
};
