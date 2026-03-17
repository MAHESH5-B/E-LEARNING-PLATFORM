export const initialAuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export function authReducer(state, action) {
  switch (action.type) {
    case "SIGNUP":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };

    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };

    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null, error: null };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
