import {
  SAVE_TOKEN,
  LOGIN_ERROR,
  LOG_OUT,
  SIGN_UP,
} from "./UserActions"

// Initial State
const initialState = {
  error: "",
  token: JSON.parse(localStorage.getItem("user")) || "",
  name: "",
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return { token: action.token }

    case LOGIN_ERROR:
      return { error: action.error }

    case LOG_OUT:
      return { token: "" }

    case SIGN_UP:
      return { name: action.name }
      
    default:
      return state
  }
}

/* Selectors */
export const getToken = (state) => state.user

export default UserReducer
