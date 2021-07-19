import fetch from "isomorphic-fetch"

export const API_URL = "http://localhost:3000/api"

export default async (endpoint, method = "get", body, token) => {
  var headers = { "content-type": "application/json", "auth-token": token }

  if (endpoint === "user/login") {
    headers = { "content-type": "application/json" }
  }

  return fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
  })
    .then((response) => response.json().then((json) => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    })
    .then(
      (response) => response,
      (error) => error
    )
}
