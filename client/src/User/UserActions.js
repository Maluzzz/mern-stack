import callApi from "../util/apiCaller"

//
export const LOGIN_ERROR = "LOGIN_ERROR"
export const SAVE_TOKEN = "SAVE_TOKEN"
export const LOG_OUT = "LOG_OUT"
export const SIGN_UP = "SIGN_UP"

export function logOutUser() {
  localStorage.removeItem("user")
  localStorage.removeItem("user-mail")
  return {
    type: LOG_OUT,
  }
}

// TO.DO: Export to lib
export function loginUser(userData) {
  return (dispatch) => {
    return callApi("user/signin", "post", {
      user: {
        email: userData.email,
        password: userData.password,
      },
    }).then((res) => {
      if (res.error === null) {
        localStorage.setItem("user", JSON.stringify(res.data.token))
        localStorage.setItem("user-mail", JSON.stringify(userData.email))
        dispatch(saveToken(res.data.token))
      } else {
        dispatch(errorLogin(res.error))
      }
    })
  }
}

export function signUpUser(userData) {
  return (dispatch) => {
    return callApi("user/signup", "post", {
      user: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
    }).then((res) => {
      if (res.error === undefined) {

        dispatch(signUp(res.user.name))
      } else {
        dispatch(errorLogin(res.error))
      }
    })
  }
}

export function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token,
  }
}
export function errorLogin(error) {
  return {
    type: LOGIN_ERROR,
    error,
  }
}
export function signUp(name) {
  return {
    type: SIGN_UP,
    name,
  }
}
