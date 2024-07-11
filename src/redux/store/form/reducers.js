const initialState = {
  form_id: '',
  version_id: '',
  form_controls: []
}

// 리듀서 역할 2 : state를 변경시키는 함수를 정의한다.
// 타입스크립트 state하고 액션인데 나중에 해결
export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FORM_INFO':
      return {
        // ...state,
        form_id: action.payload.form_id,
        version_id: action.payload.version_id,
      }
    case 'SET_FORM_ID':
      console.warn(action.payload.form_id)
      return {
        ...state,
        form_id: action.payload.form_id
      }
    case 'SET_VERSION_ID':
      return {
        ...state,
        version_id: action.payload.version_id
      }
    case 'SET_FORM_CONTROLS':
      return {
        ...state,
        form_controls: action.payload.form_controls,
      }
    default:
      return state
  }
}
