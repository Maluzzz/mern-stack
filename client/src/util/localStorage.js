export function logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("user-mail");
  }

export default logOut