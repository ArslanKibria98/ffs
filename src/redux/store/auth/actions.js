export const SET_USER_INFO = (user) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER_INFO',
      payload: {
        email: user.email,
        role: user.role,
        nickname: user.nickname,
        id: user.id,
        tenant_id: user.tenant_id
      }
    })
  }
}

export const SET_TENANT_ID = (tenant_id) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_TENANT_ID',
      payload: {
        tenant_id: tenant_id
      }
    })
  }
}

const authAction = {
  SET_USER_INFO,
  SET_TENANT_ID
}

export default authAction
