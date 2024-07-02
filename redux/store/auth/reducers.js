const initialState = {
  email: '',
  role: '',
  nickname: '',
  id: '3FA85F64-5717-4562-B3FC-2C963F66AFA6',
  tenant_id: '3FA85F64-5717-4562-B3FC-2C963F66AFA6',
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
        tenant_id: action.payload.tenant_id,
        suid: action.payload.suid,
      };
    case 'SET_TENANT_ID':
      return {
        ...state,
        tenant_id: action.payload.tenant_id,
      };
    default:
      return state;
  }
};
