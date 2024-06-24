export const SET_USER_INFO = (user) => {
  return {
    type: 'SET_USER_INFO',
    payload: {
      email: user.email,
      role: user.role,
      nickname: user.nickname,
      id: user.id,
    },
  };
};

export const SET_ACCESS_TOKEN = (accessToken) => {
  return {
    type: 'SET_ACCESS_TOKEN',
    payload: {
      accessToken: accessToken,
    },
  };
};

const authAction = {
  SET_USER_INFO,
  SET_ACCESS_TOKEN,
};

export default authAction;
