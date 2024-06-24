const initialState = {
  email: '',
  role: '',
  nickname: '',
  id: '',
  accessToken: '',
  suid: '',
};

// 리듀서 역할 2 : state를 변경시키는 함수를 정의한다.
// 타입스크립트 state하고 액션인데 나중에 해결
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        email: action.payload.email,
        role: action.payload.role,
        nickname: action.payload.nickname,
        id: action.payload.id,
        suid: action.payload.suid,
      };
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    default:
      return state;
  }
};
