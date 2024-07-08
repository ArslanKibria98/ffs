const initialState = {
  email: '',
  role: '',
  nickname: '',
  id: 'A2DEC207-EDFA-4619-BCF1-6DF55A5DD56F',
  tenant_id: 'FF2B49B3-57ED-486C-8326-53DF5BA5B5B4',
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
